import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { type PackageTier, type AddOn, formatCurrency } from './data'

interface BookingModalProps {
  open: boolean
  onClose: () => void
  packageData: PackageTier | null
  extraItems: AddOn[]
  total: number
  vehicleType: string | null
  vehicleLabel: string | null
  packageId: string | null
  extras: string[]
}

export function BookingModal({
  open,
  onClose,
  packageData,
  extraItems,
  total,
  vehicleType,
  vehicleLabel,
  packageId,
  extras,
}: BookingModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [timePreference, setTimePreference] = useState('morning')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  // Minimum date = tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleClose = () => {
    if (loading) return
    setDone(false)
    setError(null)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!packageId || !date) return
    setLoading(true)
    setError(null)

    try {
      const apiBase = import.meta.env.VITE_API_URL ?? ''
      const res = await fetch(`${apiBase}/api/ghl/create-appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          timePreference,
          notes,
          packageId,
          extras,
          vehicleType,
          vehicleLabel,
        }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setDone(true)
    } catch {
      setError('Network error — please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose() }}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">

        {done ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5L10 17L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[var(--color-navy)]">You're booked!</h2>
              <p className="mt-2 text-[14px] leading-[1.7] text-[var(--color-muted)]">
                We received your request and will reach out shortly to confirm your appointment details.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="btn mt-2 rounded-full bg-[var(--color-navy)] px-8 py-3 text-[14px] font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <DialogHeader className="bg-[var(--color-navy)] px-6 py-5">
              <DialogTitle className="text-[18px] font-bold text-white">Book Your Detail</DialogTitle>
              <p className="mt-0.5 text-[13px] text-white/50">No payment required — we'll confirm by text</p>
            </DialogHeader>

            {/* ── Order summary ── */}
            {packageData && (
              <div className="border-b border-[rgba(0,0,0,0.08)] bg-[#f9f8f5] px-6 py-4 space-y-1.5 text-[13px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] mb-2">Your Selection</p>
                {vehicleLabel && (
                  <div className="flex justify-between text-[var(--color-muted)]">
                    <span>Vehicle</span>
                    <span className="font-semibold text-[var(--color-text)]">{vehicleLabel}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">{packageData.name}</span>
                  <span className="font-semibold text-[var(--color-navy)]">{packageData.displayPrice}</span>
                </div>
                {extraItems.map((a) => (
                  <div key={a.id} className="flex justify-between">
                    <span className="text-[var(--color-muted)]">{a.name}</span>
                    <span className="font-semibold text-[var(--color-gold)]">+{formatCurrency(a.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[rgba(0,0,0,0.08)] pt-2 mt-1">
                  <span className="font-bold text-[var(--color-navy)]">Estimated Total</span>
                  <span className="font-bold text-[var(--color-navy)]">{formatCurrency(total)}</span>
                </div>
              </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Contact info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="bm-name" className="form-label">Full Name <span className="text-red-500">*</span></label>
                  <input
                    id="bm-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="bm-phone" className="form-label">Phone <span className="text-red-500">*</span></label>
                  <input
                    id="bm-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="(678) 555-0100"
                  />
                </div>
                <div>
                  <label htmlFor="bm-email" className="form-label">Email</label>
                  <input
                    id="bm-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Date + time preference */}
              <div className="border-t border-[rgba(0,0,0,0.07)] pt-4 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">Preferred Date &amp; Time</p>
                <div>
                  <label htmlFor="bm-date" className="form-label">Preferred Date <span className="text-red-500">*</span></label>
                  <input
                    id="bm-date"
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Preferred Arrival Time</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { id: 'morning', label: '🌅 Morning', sub: '8–11 AM' },
                      { id: 'afternoon', label: '☀️ Afternoon', sub: '12–3 PM' },
                      { id: 'flexible', label: '📅 Flexible', sub: 'Any time' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimePreference(t.id)}
                        className={`btn flex flex-col items-center rounded-xl border px-4 py-2.5 text-center transition-all ${
                          timePreference === t.id
                            ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white'
                            : 'border-[rgba(0,0,0,0.12)] bg-white text-[var(--color-navy)] hover:border-[var(--color-navy)]'
                        }`}
                      >
                        <span className="text-[13px] font-semibold">{t.label}</span>
                        <span className={`text-[11px] ${timePreference === t.id ? 'text-white/60' : 'text-[var(--color-muted)]'}`}>{t.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional notes */}
              <div>
                <label htmlFor="bm-notes" className="form-label">Anything else we should know? <span className="text-[var(--color-muted)] font-normal">(optional)</span></label>
                <textarea
                  id="bm-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input resize-none"
                  placeholder="e.g. gate code, dog in yard, specific stains…"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !name || !phone || !date}
                className="btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] py-3.5 text-[14px] font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'Request Appointment'
                )}
              </button>
              <p className="text-center text-[11px] text-[var(--color-muted)]">
                No payment now · We'll confirm your date and time by text
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
