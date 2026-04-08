import { Hono } from 'hono'
import 'dotenv/config'

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_KEY = process.env.GHL_API_KEY!
const GHL_LOC = process.env.GHL_LOCATION_ID!
const GHL_USER = 'dZuZL79j7FcIV4yi6KGh' // Lucas Holcombe — account owner

const ghlHeaders = (version = '2021-07-28') => ({
  Authorization: `Bearer ${GHL_KEY}`,
  Version: version,
  'Content-Type': 'application/json',
})

// Package → GHL calendar ID
const CALENDAR_MAP: Record<string, string> = {
  bronze:           '0hxe7RSeVu5fbqv3KwGS',
  silver:           '4Ccw9Pplw7J8KjPGLCbZ',
  gold:             '9lxMF4bpnXYi0XCeqD7C',
  'platinum-sedan': 'WtjhJahjiDGV80u3pGJr',
  'platinum-suv':   'XotdrvX2Wqr0iSPjKtzR',
}

// Package display names
const PACKAGE_NAMES: Record<string, string> = {
  bronze:           'Bronze Detail Package — $59.99',
  silver:           'Silver Full Detail — $179.99',
  gold:             'Gold Premium Detail — $239.99',
  'platinum-sedan': 'Platinum Ceramic (Sedan/Coupe) — $999.99',
  'platinum-suv':   'Platinum Ceramic (SUV/Truck) — $1,299.99',
}

// Add-on display labels
const ADDON_LABELS: Record<string, string> = {
  'engine-bay':    'Engine Bay Clean (+$49.99)',
  headlight:       'Headlight Restoration (+$74.99)',
  odor:            'Odor Elimination (+$39)',
  'pet-hair':      'Pet Hair Removal (+$35)',
  'paint-sealant': 'Paint Sealant (+$79)',
}

// Vehicle type → platinum calendar key
function platinumKey(vehicleType: string | null): 'platinum-sedan' | 'platinum-suv' {
  if (vehicleType === 'suv' || vehicleType === 'truck' || vehicleType === 'van') return 'platinum-suv'
  return 'platinum-sedan'
}

// Build a start time from date + time preference (all in ET)
function buildStartTime(date: string, timePreference: string): string {
  const hour = timePreference === 'afternoon' ? '12' : '08'
  return `${date}T${hour}:00:00-05:00`
}

// Build an end time (2 hours after start)
function buildEndTime(date: string, timePreference: string): string {
  const startHour = timePreference === 'afternoon' ? 12 : 8
  const endHour = startHour + 2
  const endHourStr = String(endHour).padStart(2, '0')
  return `${date}T${endHourStr}:00:00-05:00`
}

const app = new Hono()

app.post('/create-appointment', async (c) => {
  try {
    const body = await c.req.json<{
      name: string
      email: string
      phone: string
      date: string
      timePreference: string
      notes: string
      packageId: string
      extras: string[]
      vehicleType: string | null
      vehicleLabel: string | null
    }>()

    const { name, email, phone, date, timePreference, notes, packageId, extras, vehicleType, vehicleLabel } = body

    // ── 1. Resolve package key ────────────────────────────────────────────────
    const pkgKey = packageId === 'platinum' ? platinumKey(vehicleType) : packageId
    const calendarId = CALENDAR_MAP[pkgKey]
    if (!calendarId) {
      return c.json({ error: `Unknown package: ${packageId}` }, 400)
    }

    // ── 2. Upsert GHL contact ─────────────────────────────────────────────────
    const nameParts = name.trim().split(/\s+/)
    const firstName = nameParts[0] ?? name
    const lastName = nameParts.slice(1).join(' ') || undefined

    // Normalize phone to E.164
    const rawPhone = phone?.replace(/\D/g, '') ?? ''
    const e164Phone = rawPhone.length === 10
      ? `+1${rawPhone}`
      : rawPhone.startsWith('1') && rawPhone.length === 11
        ? `+${rawPhone}`
        : phone || undefined

    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: GHL_LOC,
        firstName,
        lastName,
        email: email || undefined,
        phone: e164Phone,
      }),
    })
    const contactData = await contactRes.json() as { contact?: { id: string }; id?: string }
    const contactId: string | undefined =
      (contactData as { contact?: { id: string } }).contact?.id ??
      (contactData as { id?: string }).id

    if (!contactId) {
      console.error('GHL contact upsert failed:', JSON.stringify(contactData))
      return c.json({ error: 'Could not create contact in GHL' }, 500)
    }

    // ── 3. Build appointment notes ────────────────────────────────────────────
    const addonLines = extras
      .map((id) => ADDON_LABELS[id])
      .filter(Boolean)
      .map((l) => `  • ${l}`)
      .join('\n')

    const appointmentNotes = [
      `Package: ${PACKAGE_NAMES[pkgKey] ?? pkgKey}`,
      vehicleLabel ? `Vehicle: ${vehicleLabel}` : null,
      addonLines ? `Add-ons:\n${addonLines}` : 'Add-ons: None',
      `Preferred Time: ${timePreference}`,
      notes ? `Customer Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    // ── 4. Create GHL appointment ─────────────────────────────────────────────
    const startTime = buildStartTime(date, timePreference)

    const endTime = buildEndTime(date, timePreference)

    const apptPayload = {
      calendarId,
      locationId: GHL_LOC,
      contactId,
      assignedUserId: GHL_USER,
      startTime,
      endTime,
      title: `${name} — ${PACKAGE_NAMES[pkgKey]?.split(' — ')[0] ?? pkgKey}`,
      notes: appointmentNotes,
      ignoreDateRange: true,
      ignoreFreeSlotValidation: true,
      toNotify: true,
    }
    const apptRes = await fetch(`${GHL_BASE}/calendars/events/appointments`, {
      method: 'POST',
      headers: ghlHeaders('2021-04-15'),
      body: JSON.stringify(apptPayload),
    })

    const apptData = await apptRes.json() as { id?: string; message?: string | string[] }

    if (!apptData.id) {
      console.error('GHL appointment creation failed:', JSON.stringify(apptData))
      return c.json({ error: 'Could not create appointment in GHL', details: apptData.message }, 500)
    }

    // ── 5. Create contact note with all booking details ───────────────────────
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        body: appointmentNotes,
        userId: GHL_USER,
      }),
    })

    return c.json({ success: true, appointmentId: apptData.id })
  } catch (err) {
    console.error('GHL create-appointment error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export default app
