import { Hono } from 'hono'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

const emailRoute = new Hono()

const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const TO = process.env.CONTACT_EMAIL || 'lucas@precisionworksdetailing.com'
const FROM_ADDR = process.env.EMAIL_FROM || process.env.SMTP_USER || 'lucas@precisionworksdetailing.com'
const FROM = `"Precision Works Website" <${FROM_ADDR}>`

async function sendEmail(opts: { to: string; replyTo: string; subject: string; html: string }) {
  if (resend) {
    const { error } = await resend.emails.send({
      from: FROM,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    })
    if (error) throw new Error(`${error.name}: ${error.message}`)
    return
  }
  await transporter.sendMail({
    from: FROM,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  })
}

const NAVY = '#0a1628'
const NAVY_SOFT = '#1a2a4c'
const GOLD = '#C4A86E'
const INK = '#111827'
const MUTED = '#6b7280'
const LINE = '#e6e2d9'
const CANVAS = '#f4f2ed'
const SURFACE = '#ffffff'

function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatTimestamp(): string {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' ET'
}

type Field = { label: string; value: string; multiline?: boolean }

function renderFields(fields: Field[]): string {
  return fields
    .filter((f) => f.value && f.value.trim())
    .map((f, i, arr) => {
      const isLast = i === arr.length - 1
      const border = isLast ? '' : `border-bottom:1px solid ${LINE};`
      const val = f.multiline
        ? `<div style="font-size:15px;color:${INK};line-height:1.6;white-space:pre-wrap;">${escapeHtml(f.value)}</div>`
        : `<div style="font-size:15px;color:${INK};line-height:1.5;font-weight:500;">${escapeHtml(f.value)}</div>`
      return `
      <tr>
        <td style="padding:14px 0;${border}">
          <div style="font-size:10px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.14em;margin-bottom:4px;">${f.label}</div>
          ${val}
        </td>
      </tr>`
    })
    .join('')
}

function actionButton(label: string, href: string, primary = false): string {
  const bg = primary ? NAVY : SURFACE
  const color = primary ? '#ffffff' : NAVY
  const border = primary ? NAVY : LINE
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};border-radius:999px;padding:11px 20px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.02em;margin:4px 4px 0 0;">${label}</a>`
}

type TemplateOptions = {
  eyebrow: string
  heading: string
  subhead: string
  fields: Field[]
  actions: string[]
  footerNote?: string
}

function renderEmail(opts: TemplateOptions): string {
  const fieldsHtml = renderFields(opts.fields)
  const actionsHtml = opts.actions.join('')
  const footerNote = opts.footerNote
    ? `<div style="margin-top:24px;padding:14px 18px;background:${CANVAS};border-radius:10px;border-left:3px solid ${GOLD};"><p style="margin:0;font-size:13px;color:${MUTED};line-height:1.55;">${opts.footerNote}</p></div>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Precision Works Detailing</title>
</head>
<body style="margin:0;padding:0;background:${CANVAS};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;font-size:1px;color:${CANVAS};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(opts.subhead)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CANVAS};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${SURFACE};border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,40,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,${NAVY} 0%,${NAVY_SOFT} 100%);padding:26px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="color:${GOLD};font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">PRECISION WORKS</div>
                    <div style="color:#ffffff;font-size:15px;font-weight:600;margin-top:3px;letter-spacing:0.02em;">Detailing &middot; Mobile Service</div>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="color:rgba(255,255,255,0.55);font-size:11px;font-weight:600;letter-spacing:0.06em;">${escapeHtml(formatTimestamp())}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 8px;">
              <div style="display:inline-block;background:${CANVAS};color:${NAVY};font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${escapeHtml(opts.eyebrow)}</div>
              <h1 style="margin:14px 0 6px;font-size:26px;font-weight:700;color:${INK};line-height:1.2;letter-spacing:-0.01em;">${escapeHtml(opts.heading)}</h1>
              <p style="margin:0;font-size:15px;color:${MUTED};line-height:1.55;">${escapeHtml(opts.subhead)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:12px;padding:4px 18px;background:#fdfcf9;">
                ${fieldsHtml}
              </table>
            </td>
          </tr>

          ${
            actionsHtml
              ? `<tr>
            <td style="padding:22px 32px 8px;">
              <div style="font-size:11px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px;">Quick actions</div>
              <div>${actionsHtml}</div>
            </td>
          </tr>`
              : ''
          }

          <tr>
            <td style="padding:8px 32px 28px;">
              ${footerNote}
            </td>
          </tr>

          <tr>
            <td style="background:${CANVAS};padding:18px 32px;border-top:1px solid ${LINE};text-align:center;">
              <p style="margin:0;font-size:12px;color:${MUTED};">Sent from the Precision Works Detailing website</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

emailRoute.post('/contact', async (c) => {
  const body = await c.req.json()
  const { name, email, phone, vehicle, message } = body as Record<string, string>

  if (!name || !email || !phone) {
    return c.json({ error: 'Name, email, and phone are required.' }, 400)
  }

  const phoneDigits = normalizePhone(phone)
  const actions = [
    actionButton('Reply by Email', `mailto:${email}?subject=${encodeURIComponent('Re: Your detail inquiry')}`, true),
    actionButton('Call', `tel:${phoneDigits}`),
    actionButton('Text', `sms:${phoneDigits}`),
  ]

  const html = renderEmail({
    eyebrow: 'New Inquiry',
    heading: `${name} wants a detail`,
    subhead: `A new lead came in through the website${vehicle ? ` about a ${vehicle}` : ''}.`,
    fields: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Vehicle', value: vehicle || '' },
      { label: 'Message', value: message || '', multiline: true },
    ],
    actions,
    footerNote: `Hit reply and it goes straight to ${escapeHtml(name)}.`,
  })

  try {
    await sendEmail({
      to: TO,
      replyTo: email,
      subject: `New inquiry — ${name}${vehicle ? ` (${vehicle})` : ''}`,
      html,
    })
    return c.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return c.json({ error: 'Failed to send email. Please try again.' }, 500)
  }
})

emailRoute.post('/fleet', async (c) => {
  const body = await c.req.json()
  const { businessName, contactName, email, phone, fleetSize, message } = body as Record<string, string>

  if (!email || !phone) {
    return c.json({ error: 'Email and phone are required.' }, 400)
  }

  const phoneDigits = normalizePhone(phone)
  const actions = [
    actionButton('Reply by Email', `mailto:${email}?subject=${encodeURIComponent('Re: Fleet pricing')}`, true),
    actionButton('Call', `tel:${phoneDigits}`),
  ]

  const heading = businessName ? `${businessName} is asking about fleet pricing` : 'New fleet pricing request'

  const html = renderEmail({
    eyebrow: 'Fleet Inquiry',
    heading,
    subhead: `A business${fleetSize ? ` with ${fleetSize}` : ''} requested pricing.`,
    fields: [
      { label: 'Business', value: businessName || '' },
      { label: 'Contact', value: contactName || '' },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Fleet Size', value: fleetSize || '' },
      { label: 'Message', value: message || '', multiline: true },
    ],
    actions,
    footerNote: `Hit reply and it goes straight to ${escapeHtml(contactName || businessName || 'them')}.`,
  })

  try {
    await sendEmail({
      to: TO,
      replyTo: email,
      subject: `Fleet inquiry${businessName ? ` — ${businessName}` : ''}${fleetSize ? ` (${fleetSize})` : ''}`,
      html,
    })
    return c.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return c.json({ error: 'Failed to send email. Please try again.' }, 500)
  }
})

export default emailRoute
