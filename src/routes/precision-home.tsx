import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
const _CDN = 'https://res.cloudinary.com/dc7kinqks/image/upload/precision-works'
const heroPhoto = `${_CDN}/DSC09921-3-1774028142844-e99jgz.jpg`
const aboutPhoto = `${_CDN}/aboutme-1775611446208-hznwv5.jpg`
const photo1 = `${_CDN}/DSC01342-2-1774028142629-ratb33.jpg`
const photo2 = `${_CDN}/DSC01359-1774028142651-i3rbqp.jpg`
const photo3 = `${_CDN}/DSC01336-1774028142610-hr6ipf.jpg`
const photo4 = `${_CDN}/DSC09999-7-1774028142977-8597e4.jpg`
const photo5 = `${_CDN}/DSC09966-3-1774028142928-yech3r.jpg`
const photo6 = `${_CDN}/DSC09949-2-1774028142904-52o4kk.jpg`
import {
  addOns,
  boatAddOns,
  boatPackages,
  detailPackages,
  formatCurrency,
  navLinks,
  reviews,
  scheduleSlots,
  vehicleTypes,
} from '../components/home/data'
import { BeforeAfterCard } from '../components/home/BeforeAfterCard'
import { beforeAfterExamples } from '../components/home/data'
import { BookingModal } from '../components/home/BookingModal'
import { Star, ThumbsUp, Layers, ShieldCheck } from 'lucide-react'
const logoImg = `${_CDN}/LOGO_SMALL_cf43984a-e620-458f-975f-31cd5b6bc93b-1774030211175-k00tpe.webp`

// Doubled reviews array for seamless infinite scroll
const reviewsLoop = [...reviews, ...reviews]

export function PrecisionHomePage() {
  const [heroReady, setHeroReady] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Progressive build state: which step is unlocked
  const [buildStep, setBuildStep] = useState<0 | 1 | 2>(0)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState(scheduleSlots[0].id)
  const [summaryFlash, setSummaryFlash] = useState(false)
  const [displayedTotal, setDisplayedTotal] = useState(0)
  const [serviceTab, setServiceTab] = useState<'auto' | 'boat'>('auto')
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  const pkg = useMemo(
    () => detailPackages.find((p) => p.id === selectedPackage) ?? null,
    [selectedPackage],
  )
  const extraItems = useMemo(() => addOns.filter((a) => selectedExtras.includes(a.id)), [selectedExtras])
  const total = useMemo(() => (pkg ? pkg.price : 0) + extraItems.reduce((s, a) => s + a.price, 0), [pkg, extraItems])


  const buildProgress = useMemo(() => {
    if (!selectedVehicle) return 0
    if (!selectedPackage) return 33
    const extras = Math.min(selectedExtras.length * 8, 24)
    return Math.min(97, 60 + extras + (selectedSlot ? 10 : 0))
  }, [selectedExtras.length, selectedPackage, selectedSlot, selectedVehicle])

  const step2Ref = useRef<HTMLDivElement | null>(null)
  const step3Ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setHeroReady(true)
    const t = window.setTimeout(() => setHeroReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { nodes.forEach((n) => n.classList.add('visible')); return }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 },
    )
    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [buildStep, serviceTab]) // re-observe when new steps or tabs are revealed

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setDisplayedTotal(total); return }
    setSummaryFlash(true)
    const start = displayedTotal
    const end = total
    const dur = 450
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplayedTotal(start + (end - start) * e)
      if (p < 1) requestAnimationFrame(tick)
      else { setDisplayedTotal(end); setTimeout(() => setSummaryFlash(false), 200) }
    }
    requestAnimationFrame(tick)
  }, [total]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleVehicleSelect = (id: string) => {
    setSelectedVehicle(id)
    if (buildStep < 1) {
      setBuildStep(1)
      setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    }
  }

  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id)
    if (buildStep < 2) {
      setBuildStep(2)
      setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    }
  }

  const toggleExtra = (id: string) =>
    setSelectedExtras((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  return (
    <div id="top" className="bg-white text-[var(--color-text)]">

      {/* ─── Header ─── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.07)]' : 'bg-transparent'}`}>
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" aria-label="Precision Works Detailing home" className="flex items-center">
            <img src={logoImg} alt="Precision Works Detailing" className="h-7 w-auto" />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[13px] font-semibold text-white/65 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
            <Link to="/about" className="text-[13px] font-semibold text-white/65 transition-colors hover:text-white">
              About
            </Link>
          </nav>

          <a href="#contact" className="btn hidden rounded-full bg-white px-6 py-2.5 text-[13px] font-bold tracking-wide text-[var(--color-navy)] md:inline-flex hover:bg-white/90">
            Book Now
          </a>

        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative min-h-svh overflow-hidden bg-[#07101f]" aria-label="Mobile detailing hero">
          <img
            src={heroPhoto}
            alt="Precision Works Detailing team working on a Tesla in a residential driveway"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
          />
          {/* gradient — bottom-heavy so text on left is very readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07101f]/90 via-[#07101f]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/70 via-transparent to-transparent" />

          <div className={`section-shell relative z-10 flex min-h-svh flex-col justify-center pb-20 pt-28 ${heroReady ? 'hero-ready' : ''}`}>
            <div className="max-w-xl">
              <p className="hero-sequence text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]" style={{ transitionDelay: '0ms' }}>
                Mobile Detailing — We Come to You
              </p>

              <h1 className="hero-sequence mt-5 font-display text-[56px] font-bold leading-[1.0] tracking-tight text-white md:text-[72px]" style={{ transitionDelay: '120ms' }}>
                Precision in<br />every detail.
              </h1>

              <p className="hero-sequence mt-5 max-w-sm text-[16px] font-medium leading-[1.7] text-white/70" style={{ transitionDelay: '220ms' }}>
                Professional auto detailing delivered to your door. No drop-off, no hassle — just a flawless result.
              </p>

              <div className="hero-sequence mt-8 flex flex-wrap gap-3" style={{ transitionDelay: '320ms' }}>
                <a href="#contact" className="btn inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[14px] font-bold tracking-wide text-[var(--color-navy)]">
                  Book Your Detail
                </a>
                <a href="#services" className="btn inline-flex items-center rounded-full border border-sky-300/60 bg-sky-400/20 px-8 py-3.5 text-[14px] font-bold tracking-wide text-sky-100 backdrop-blur-sm">
                  See Packages
                </a>
              </div>

              <div className="hero-sequence mt-8 flex flex-wrap gap-x-6 gap-y-2" style={{ transitionDelay: '420ms' }}>
                {/* Google Rating */}
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white/70">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  5.0 Google Rating
                </span>
                {/* Reviews */}
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white/70">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F9C940" aria-hidden="true">
                    <path d="M12 2.75L14.82 8.47L21.14 9.39L16.57 13.85L17.65 20.14L12 17.17L6.35 20.14L7.43 13.85L2.86 9.39L9.18 8.47L12 2.75Z"/>
                  </svg>
                  83+ Verified Reviews
                </span>
                {/* Self-Sufficient */}
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white/70">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Fully Self-Sufficient
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust bar ─── */}
        <div className="border-b border-[rgba(0,0,0,0.08)] bg-[var(--color-navy)]">
          <div className="section-shell grid grid-cols-2 divide-x divide-white/10 py-5 text-center text-white md:grid-cols-4">
            {[
              { label: '5.0', sub: 'Google Rating', icon: <Star className="size-5 text-yellow-400 fill-yellow-400" /> },
              { label: '83+', sub: 'Five-Star Reviews', icon: <ThumbsUp className="size-5 text-blue-300" /> },
              { label: '5+ Years', sub: 'Of Experience', icon: <Layers className="size-5 text-emerald-300" /> },
              { label: '100%', sub: 'Satisfaction Guarantee', icon: <ShieldCheck className="size-5 text-indigo-300" /> },
            ].map((s) => (
              <div key={s.label} className="px-4 py-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  {s.icon}
                  <p className="text-[22px] font-bold text-white leading-tight">{s.label}</p>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Services ─── */}
        <section id="services" aria-label="Detailing packages" className="py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">Our Packages</p>
            <h2 className="reveal mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">
              Detailing done right,<br />at every level.
            </h2>
            <p className="reveal mt-4 max-w-xl text-[15px] leading-[1.7] text-[var(--color-muted)]" style={{ transitionDelay: '60ms' }}>
              Every package is performed at your location. We bring our own water and power — you don't need a thing.
            </p>

            {/* Tab toggle */}
            <div className="reveal mt-8 flex gap-2" style={{ transitionDelay: '80ms' }}>
              <button
                type="button"
                onClick={() => setServiceTab('auto')}
                aria-pressed={serviceTab === 'auto'}
                className={`btn rounded-full px-6 py-2.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  serviceTab === 'auto'
                    ? 'bg-[var(--color-navy)] text-white shadow-[0_4px_14px_rgba(26,42,76,0.25)]'
                    : 'border border-[rgba(0,0,0,0.15)] bg-white text-[var(--color-navy)] hover:border-[var(--color-navy)]'
                }`}
              >
                Auto Detailing
              </button>
              <button
                type="button"
                onClick={() => setServiceTab('boat')}
                aria-pressed={serviceTab === 'boat'}
                className={`btn rounded-full px-6 py-2.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  serviceTab === 'boat'
                    ? 'bg-[var(--color-navy)] text-white shadow-[0_4px_14px_rgba(26,42,76,0.25)]'
                    : 'border border-[rgba(0,0,0,0.15)] bg-white text-[var(--color-navy)] hover:border-[var(--color-navy)]'
                }`}
              >
                Boat · Marine
              </button>
            </div>

            {serviceTab === 'auto' ? (
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {detailPackages.map((p, i) => (
                  <article key={p.id} id={`package-${p.id}`}
                    className={`package-card reveal relative flex flex-col rounded-2xl border p-6 ${p.featured
                      ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_8px_40px_rgba(26,42,76,0.25)]'
                      : 'border-[rgba(0,0,0,0.1)] bg-white text-[var(--color-text)]'}`}
                    style={{ transitionDelay: `${i * 60}ms` }}>
                    {p.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-gold)] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${p.featured ? 'bg-white/15 text-white/80' : 'bg-[rgba(26,42,76,0.07)] text-[var(--color-navy)]'}`}>
                        {p.tier}
                      </span>
                    </div>
                    <h3 className={`mt-4 text-[19px] font-bold leading-tight ${p.featured ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.name}</h3>
                    <p className={`mt-1 font-display text-[34px] font-bold leading-none ${p.featured ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.displayPrice}</p>
                    <p className={`mt-3 text-[13px] leading-[1.6] ${p.featured ? 'text-white/70' : 'text-[var(--color-muted)]'}`}>{p.summary}</p>
                    <ul className="mt-5 flex-1 space-y-2 text-[13px]">
                      {p.includes.map((line) => (
                        <li key={line} className={`flex gap-2 ${p.featured ? 'text-white/85' : 'text-[var(--color-text)]'}`}>
                          <svg className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${p.featured ? 'text-[var(--color-gold)]' : 'text-[var(--color-navy)]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M5 12.5L10 17L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-4 border-t pt-3 text-[11px] ${p.featured ? 'border-white/15 text-white/45' : 'border-[rgba(0,0,0,0.07)] text-[var(--color-muted)]'}`}>
                      Best for: {p.bestFor}
                    </p>
                    <a
                      href={p.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn mt-5 inline-flex w-full justify-center rounded-full py-3 text-[13px] font-bold tracking-wide ${p.featured
                        ? 'bg-white !text-[var(--color-navy)]'
                        : 'border border-[rgba(0,0,0,0.15)] bg-transparent text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white hover:border-transparent'}`}>
                      Book {p.tier}
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {boatPackages.map((p, i) => (
                    <article key={p.id}
                      className={`package-card reveal relative flex flex-col rounded-2xl border p-6 ${p.featured
                        ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_8px_40px_rgba(26,42,76,0.25)]'
                        : 'border-[rgba(0,0,0,0.1)] bg-white text-[var(--color-text)]'}`}
                      style={{ transitionDelay: `${i * 60}ms` }}>
                      {p.featured && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-gold)] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${p.featured ? 'bg-white/15 text-white/80' : 'bg-[rgba(26,42,76,0.07)] text-[var(--color-navy)]'}`}>
                          {p.tier}
                        </span>
                      </div>
                      <h3 className={`mt-4 text-[19px] font-bold leading-tight ${p.featured ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.name}</h3>
                      <p className={`mt-1 font-display text-[34px] font-bold leading-none ${p.featured ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.displayPrice}</p>
                      <p className={`mt-1 text-[12px] font-semibold ${p.featured ? 'text-white/50' : 'text-[var(--color-muted)]'}`}>per linear foot &middot; {p.summary}</p>
                      <ul className="mt-5 flex-1 space-y-2 text-[13px]">
                        {p.includes.map((line) => (
                          <li key={line} className={`flex gap-2 ${p.featured ? 'text-white/85' : 'text-[var(--color-text)]'}`}>
                            <svg className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${p.featured ? 'text-[var(--color-gold)]' : 'text-[var(--color-navy)]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <path d="M5 12.5L10 17L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {line}
                          </li>
                        ))}
                      </ul>
                      <p className={`mt-4 border-t pt-3 text-[11px] ${p.featured ? 'border-white/15 text-white/45' : 'border-[rgba(0,0,0,0.07)] text-[var(--color-muted)]'}`}>
                        Best for: {p.bestFor}
                      </p>
                      <a href="#contact"
                        className={`btn mt-5 inline-flex w-full justify-center rounded-full py-3 text-[13px] font-bold tracking-wide ${p.featured
                          ? 'bg-white !text-[var(--color-navy)]'
                          : 'border border-[rgba(0,0,0,0.15)] bg-transparent text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white hover:border-transparent'}`}>
                        Request Quote
                      </a>
                    </article>
                  ))}
                </div>

                {/* Boat Add-ons */}
                <div className="reveal mt-10 overflow-hidden rounded-2xl bg-[var(--color-charcoal)]" style={{ transitionDelay: '100ms' }}>
                  <div className="border-b border-white/8 px-6 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Add-ons</p>
                  </div>
                  <div className="divide-y divide-white/8 px-6">
                    {boatAddOns.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between gap-6 py-5">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                              <rect x="1" y="1" width="16" height="16" rx="3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                            </svg>
                          </span>
                          <div>
                            <p className="text-[14px] font-bold text-white">{addon.name}</p>
                            <p className="text-[12px] text-white/50">{addon.description}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-[14px] font-bold text-white/80">{addon.priceLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ─── Photo strip ─── */}
        <div className="border-t border-[rgba(0,0,0,0.08)]">
          <div className="grid h-[260px] grid-cols-3 md:h-[360px] md:grid-cols-6 overflow-hidden">
            {[photo1, photo2, photo3, photo4, photo5, photo6].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={src} alt="Precision Works Detailing in action" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Build Your Detail ─── */}
        <section id="build" aria-label="Build your detail service" className="border-t border-[rgba(0,0,0,0.08)] bg-[#f4f2ed] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">Customize Your Service</p>
            <h2 className="reveal mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">Build your detail.</h2>
            <p className="reveal mt-4 max-w-xl text-[15px] leading-[1.7] text-[var(--color-muted)]" style={{ transitionDelay: '60ms' }}>
              Select your vehicle, then your package. Pricing updates live as you go.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">

                {/* Step 1 — Vehicle (always visible) */}
                <div role="group" aria-label="Step 1: Vehicle type" className="reveal card-surface overflow-hidden" style={{ transitionDelay: '100ms' }}>
                  <div className="flex items-center gap-3 border-b border-[rgba(0,0,0,0.07)] bg-[var(--color-navy)] px-6 py-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-[11px] font-bold text-[#1a1a1a]">1</span>
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">Select Vehicle Type</h3>
                    {selectedVehicle && (
                      <span className="ml-auto rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-bold text-green-400">Selected</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                    {vehicleTypes.map((v) => {
                      const sel = selectedVehicle === v.id
                      return (
                        <button key={v.id} type="button" aria-pressed={sel}
                          onClick={() => handleVehicleSelect(v.id)}
                          className={`vehicle-tile btn flex flex-col items-center gap-2 rounded-xl border px-3 py-5 text-center transition-all ${sel
                            ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_4px_16px_rgba(26,42,76,0.2)]'
                            : 'border-[rgba(0,0,0,0.1)] bg-white text-[var(--color-text)] hover:border-[rgba(26,42,76,0.3)]'}`}>
                          <span className="text-[26px]" aria-hidden="true">{v.icon}</span>
                          <span className="text-[12px] font-bold leading-tight">{v.label}</span>
                          <span className={`tile-check inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${sel ? 'bg-[var(--color-gold)] text-[#1a1a1a]' : 'bg-transparent'}`}>
                            {sel ? '✓' : ''}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2 — Package (revealed after vehicle) */}
                {buildStep >= 1 && (
                  <div ref={step2Ref} role="group" aria-label="Step 2: Package level" className="card-surface step-reveal overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-[rgba(0,0,0,0.07)] bg-[var(--color-navy)] px-6 py-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-[11px] font-bold text-[#1a1a1a]">2</span>
                      <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">Choose Package Level</h3>
                      {selectedPackage && (
                        <span className="ml-auto rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-bold text-green-400">Selected</span>
                      )}
                    </div>
                    <div className="grid gap-3 p-5 sm:grid-cols-2">
                      {detailPackages.map((p) => {
                        const sel = selectedPackage === p.id
                        return (
                          <button key={p.id} type="button" aria-pressed={sel}
                            onClick={() => handlePackageSelect(p.id)}
                            className={`package-tile btn rounded-xl border p-4 text-left transition-all ${sel
                              ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_4px_16px_rgba(26,42,76,0.2)]'
                              : 'border-[rgba(0,0,0,0.1)] bg-white text-[var(--color-text)] hover:border-[rgba(26,42,76,0.3)]'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${sel ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}`}>{p.tier}</span>
                              <span className={`font-display text-[20px] font-bold ${sel ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.displayPrice}</span>
                            </div>
                            <p className={`mt-1.5 text-[15px] font-bold ${sel ? 'text-white' : 'text-[var(--color-navy)]'}`}>{p.name}</p>
                            <p className={`mt-1 text-[12px] leading-[1.5] ${sel ? 'text-white/65' : 'text-[var(--color-muted)]'}`}>{p.summary}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3 — Add-ons + Arrival (revealed after package) */}
                {buildStep >= 2 && (
                  <div ref={step3Ref} role="group" aria-label="Step 3: Add-ons and arrival" className="card-surface step-reveal overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-[rgba(0,0,0,0.07)] bg-[var(--color-navy)] px-6 py-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-[11px] font-bold text-[#1a1a1a]">3</span>
                      <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">Add-Ons &amp; Arrival</h3>
                    </div>
                    <div className="p-5 space-y-2.5">
                      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)] mb-3">Optional Add-Ons</p>
                      {addOns.map((a) => {
                        const checked = selectedExtras.includes(a.id)
                        return (
                          <button key={a.id} type="button" role="checkbox" aria-checked={checked}
                            onClick={() => toggleExtra(a.id)}
                            className={`btn flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${checked
                              ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_2px_12px_rgba(26,42,76,0.15)]'
                              : 'border-[rgba(0,0,0,0.1)] bg-white hover:border-[rgba(26,42,76,0.25)]'}`}>
                            <span className="flex items-center gap-3">
                              <span className={`addon-check inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${checked ? 'border-[var(--color-gold)] bg-[var(--color-gold)]' : 'border-[rgba(0,0,0,0.25)]'}`}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path d="M5 12.5L10 17L19 7" stroke={checked ? '#1a1a1a' : 'transparent'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <span className={`text-[14px] font-semibold ${checked ? 'text-white' : 'text-[var(--color-navy)]'}`}>{a.name}</span>
                            </span>
                            <span className={`text-[14px] font-bold ${checked ? 'text-[var(--color-gold)]' : 'text-[var(--color-navy)]'}`}>+{formatCurrency(a.price)}</span>
                          </button>
                        )
                      })}

                      <div className="mt-5 border-t border-[rgba(0,0,0,0.07)] pt-4">
                        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">Preferred Arrival Time</p>
                        <div className="flex flex-wrap gap-2">
                          {scheduleSlots.map((slot) => {
                            const active = selectedSlot === slot.id
                            return (
                              <button key={slot.id} type="button"
                                onClick={() => setSelectedSlot(slot.id)}
                                className={`btn flex items-center gap-1.5 rounded-full border px-5 py-2 text-[13px] font-semibold transition-all ${active
                                  ? 'border-[var(--color-navy)] bg-[var(--color-navy)] text-white'
                                  : 'border-[rgba(0,0,0,0.15)] bg-white text-[var(--color-navy)] hover:border-[rgba(26,42,76,0.4)]'}`}>
                                {slot.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Summary */}
              <aside className="reveal h-fit lg:sticky lg:top-24" style={{ transitionDelay: '150ms' }} aria-live="polite">
                <div className="overflow-hidden rounded-2xl bg-[var(--color-navy)] text-white shadow-[0_20px_60px_rgba(26,42,76,0.25)]">
                  <div className="border-b border-white/8 px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Live Estimate</p>
                    <p className="mt-1 text-[17px] font-bold text-white">Your Detail Summary</p>
                  </div>

                  {/* Progress bar */}
                  <div className="px-6 py-4 border-b border-white/8">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/40">Build Progress</p>
                      <p className="text-[13px] font-bold text-white">{buildProgress}%</p>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[var(--color-gold)] transition-all duration-700 ease-out"
                        style={{ width: `${buildProgress}%` }} />
                    </div>
                    <p className="mt-2 text-[12px] text-white/40">
                      {buildProgress === 0 && 'Start by selecting a vehicle above'}
                      {buildProgress === 33 && 'Now choose a package'}
                      {buildProgress > 33 && buildProgress < 97 && 'Looking great — add extras or book now'}
                      {buildProgress >= 97 && 'Ready to book!'}
                    </p>
                  </div>

                  <div className="px-6 py-4 space-y-0 text-[13px]">
                    <div className="flex items-center justify-between border-b border-white/8 py-3">
                      <span className="text-white/50">Vehicle</span>
                      <span className="font-semibold text-white">
                        {selectedVehicle ? (vehicleTypes.find(v => v.id === selectedVehicle)?.label ?? '—') : <span className="text-white/30">Not selected</span>}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/8 py-3">
                      <span className="text-white/50">Package</span>
                      <span className="font-semibold text-white">
                        {pkg ? `${pkg.name}` : <span className="text-white/30">Not selected</span>}
                      </span>
                    </div>
                    {pkg && (
                      <div className="flex items-center justify-between border-b border-white/8 py-3">
                        <span className="text-white/50">Base price</span>
                        <span className="font-semibold text-white">{formatCurrency(pkg.price)}</span>
                      </div>
                    )}
                    {addOns.map((a) => {
                      const checked = selectedExtras.includes(a.id)
                      return (
                        <div key={a.id} className={`summary-line flex items-center justify-between py-2.5 ${checked ? 'is-visible' : 'is-hidden'}`}>
                          <span className="text-white/50">{a.name}</span>
                          <span className="font-semibold text-[var(--color-gold)]">+{formatCurrency(a.price)}</span>
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between border-t border-white/12 pt-5 mt-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">Total</span>
                      <span className={`font-display text-[40px] font-bold text-white ${summaryFlash ? 'total-pulse' : ''}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {displayedTotal > 0 ? formatCurrency(displayedTotal) : <span className="text-white/25 text-[28px]">—</span>}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    {pkg ? (
                      <button
                        type="button"
                        onClick={() => setBookingModalOpen(true)}
                        className="btn inline-flex w-full items-center justify-center rounded-full bg-white py-4 text-[15px] font-bold hover:bg-white/90"
                        style={{ color: 'var(--color-navy)' }}
                      >
                        Book This Detail →
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="btn inline-flex w-full items-center justify-center rounded-full bg-white/20 py-4 text-[15px] font-bold text-white/40 cursor-not-allowed"
                      >
                        Select a Package First
                      </button>
                    )}
                    <p className="mt-3 text-center text-[11px] text-white/30">Book &amp; pay securely · Confirmed by text</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── Before / After ─── */}
        <section id="results" aria-label="Before and after detailing results" className="border-t border-[rgba(0,0,0,0.08)] py-24 bg-white">
          <div className="section-shell">
            <p className="reveal eyebrow">The Results</p>
            <h2 className="reveal mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">See the difference.</h2>
            <p className="reveal mt-4 max-w-xl text-[15px] leading-[1.7] text-[var(--color-muted)]" style={{ transitionDelay: '60ms' }}>
              Drag the handle left or right to compare. Every result is from a real Precision Works detail.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {beforeAfterExamples.map((ex) => <BeforeAfterCard key={ex.title} {...ex} />)}
            </div>
          </div>
        </section>

        {/* ─── Reviews ─── */}
        <section id="reviews" aria-label="Customer reviews" className="border-t border-[rgba(0,0,0,0.08)] bg-[#f4f2ed] py-24">
          <div className="section-shell">
            <div className="reveal flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">What Customers Say</p>
                <h2 className="mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">83+ five-star reviews.</h2>
              </div>
              <div className="flex items-center gap-2">
                {/* Google Stars */}
                <div className="flex gap-0.5 text-[var(--color-gold)]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.75L14.82 8.47L21.14 9.39L16.57 13.85L17.65 20.14L12 17.17L6.35 20.14L7.43 13.85L2.86 9.39L9.18 8.47L12 2.75Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[14px] font-bold text-[var(--color-navy)]">5.0 on Google</span>
              </div>
            </div>
          </div>

          {/* Auto-scrolling track — full width, outside section-shell */}
          <div className="reviews-scroller mt-10 select-none" aria-hidden="true">
            <div className="reviews-track py-2">
              {reviewsLoop.map((r, i) => (
                <article key={`${r.id}-${i}`}
                  className="w-[340px] shrink-0 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex gap-0.5 text-[var(--color-gold)]">
                    {Array.from({ length: 5 }, (_, si) => (
                      <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.75L14.82 8.47L21.14 9.39L16.57 13.85L17.65 20.14L12 17.17L6.35 20.14L7.43 13.85L2.86 9.39L9.18 8.47L12 2.75Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text)]">
                    "{r.quote}"
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3 border-t border-[rgba(0,0,0,0.06)] pt-4">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white">
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[var(--color-navy)]">{r.author}</p>
                      <p className="text-[11px] text-[var(--color-muted)]">{r.date} · Google</p>
                    </div>
                    <svg className="ml-auto h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* Accessible version — screen readers only */}
          <div className="sr-only">
            {reviews.map((r) => (
              <blockquote key={r.id}>
                <p>"{r.quote}"</p>
                <cite>— {r.author}, {r.date}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ─── Fleet ─── */}
        <section id="fleet" aria-label="Fleet and dealership detailing" className="border-t border-[rgba(0,0,0,0.08)] bg-[var(--color-charcoal)] py-24 text-white">
          <div className="section-shell grid gap-12 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow text-[var(--color-gold)]">Fleet & Dealership</p>
              <h2 className="mt-3 font-display text-[42px] font-bold leading-tight text-white">We scale with your fleet.</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-white/60">
                From franchise dealerships to corporate fleets — high-volume mobile detailing with the same
                attention to detail on every vehicle.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { title: 'Volume Pricing', body: 'Custom rates for 5+ vehicles per visit.' },
                  { title: 'Dealer-Ready Finish', body: 'Showroom standard — every detail, every time.' },
                  { title: 'Flex Scheduling', body: 'Early mornings, weekends, or on-call.' },
                ].map((tile) => (
                  <article key={tile.title} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                    <h3 className="text-[15px] font-bold text-white">{tile.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.6] text-white/55">{tile.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <form className="reveal card-surface bg-white p-6 text-[var(--color-text)] rounded-2xl" style={{ transitionDelay: '80ms' }}>
              <h3 className="text-[20px] font-bold text-[var(--color-navy)]">Request Fleet Pricing</h3>
              <div className="mt-5 space-y-4">
                {[
                  { id: 'fleet-business', name: 'businessName', label: 'Business Name', type: 'text' },
                  { id: 'fleet-contact', name: 'contactName', label: 'Contact Name', type: 'text' },
                  { id: 'fleet-email', name: 'email', label: 'Email', type: 'email' },
                  { id: 'fleet-phone', name: 'phone', label: 'Phone', type: 'tel' },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="form-label">{f.label}</label>
                    <input id={f.id} name={f.name} type={f.type} className="form-input" />
                  </div>
                ))}
                <div>
                  <label htmlFor="fleet-size" className="form-label">Number of Vehicles</label>
                  <select id="fleet-size" name="fleetSize" className="form-input">
                    <option>1–4 vehicles</option>
                    <option>5–14 vehicles</option>
                    <option>15–29 vehicles</option>
                    <option>30+ vehicles</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn mt-5 inline-flex w-full justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-[14px] font-bold text-[#1a1a1a]">
                Send Fleet Request
              </button>
            </form>
          </div>
        </section>

        {/* ─── About ─── */}
        <section id="about" aria-label="About Lucas — Precision Works Detailing" className="border-t border-[rgba(0,0,0,0.08)] py-24 bg-white">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Photo */}
              <div className="reveal order-last lg:order-first" style={{ transitionDelay: '120ms' }}>
                <div className="relative">
                  <div className="overflow-hidden rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.14)]">
                    <img
                      src={aboutPhoto}
                      alt="Lucas, CEO of Precision Works Detailing"
                      width={900}
                      height={700}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-4 rounded-2xl bg-[var(--color-gold)] px-5 py-4 shadow-xl">
                    <p className="text-[28px] font-bold leading-none text-[#1a1a1a]">5.0 ★</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]/70">Google Rating</p>
                  </div>
                  <div className="absolute -left-4 -top-4 rounded-2xl border border-white/10 bg-[var(--color-navy)] px-5 py-4 shadow-xl">
                    <p className="text-[28px] font-bold leading-none text-white">2+</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/50">Years Detailing</p>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="reveal">
                <p className="eyebrow">About Me</p>
                <h2 className="mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">
                  Hey, What's up Y'all!
                </h2>
                <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                  I'm Lucas — a 17-year-old entrepreneur and the founder of Precision Works Detailing. I started this company out of a genuine love for cars and a desire to help people feel proud of what they drive.
                </p>
                <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                  I'm fully mobile and self-sufficient — I bring my own water and power to every job. When you book with me, I promise to take the utmost care of your vehicle. Every. Single. Time.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    { icon: '⚡', label: 'Self-sufficient — own water & generator' },
                    { icon: '🛡️', label: 'Fully insured & 100% satisfaction guaranteed' },
                    { icon: '⭐', label: '32+ five-star Google reviews' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-[15px] text-[var(--color-text)]">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(26,42,76,0.07)] text-base">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-display text-[22px] font-bold italic text-[var(--color-navy)]">
                  "Let's get this detail started!"
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn inline-flex items-center rounded-full bg-[var(--color-navy)] px-8 py-3.5 text-[14px] font-bold tracking-wide text-white">
                    Book Your Detail
                  </a>
                  <Link
                    to="/about"
                    className="btn inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.18)] px-8 py-3.5 text-[14px] font-bold tracking-wide text-[var(--color-navy)] hover:border-[var(--color-navy)] transition-colors"
                  >
                    My Full Story
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" aria-label="Contact Precision Works Detailing" className="border-t border-[rgba(0,0,0,0.08)] py-24 bg-white">
          <div className="section-shell grid gap-12 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow">Get in Touch</p>
              <h2 className="mt-3 font-display text-[42px] font-bold leading-tight text-[var(--color-navy)]">Ready to book?</h2>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-[var(--color-muted)]">
                Questions, quotes, or ready to schedule — we usually respond within a few hours.
              </p>
              <ul className="mt-8 space-y-3 text-[14px] text-[var(--color-muted)]">
                {['We bring our own water & power', 'Fully insured', '100% satisfaction guarantee', 'No payment required to book'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12.5L10 17L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form className="reveal card-surface p-7 rounded-2xl" style={{ transitionDelay: '80ms' }}>
              <div className="space-y-4">
                {[
                  { id: 'contact-name', name: 'name', label: 'Name', type: 'text', auto: 'name' },
                  { id: 'contact-email', name: 'email', label: 'Email', type: 'email', auto: 'email' },
                  { id: 'contact-phone', name: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
                  { id: 'contact-vehicle', name: 'vehicle', label: 'Vehicle (optional)', type: 'text', auto: 'off', placeholder: 'e.g. 2021 Toyota Camry' },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="form-label">{f.label}</label>
                    <input id={f.id} name={f.name} type={f.type} autoComplete={f.auto} placeholder={'placeholder' in f ? f.placeholder : undefined} className="form-input" />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea id="contact-message" name="message" rows={4} className="form-input" />
                </div>
              </div>
              <button type="submit" className="btn mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-navy)] py-4 text-[15px] font-bold text-white">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer role="contentinfo" className="bg-[var(--color-charcoal)] py-14 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-3">
          <div>
            <a href="#top" className="inline-flex items-center" aria-label="Precision Works Detailing home">
              <img src={logoImg} alt="Precision Works Detailing" className="h-9 w-auto brightness-0 invert" />
            </a>
            <p className="mt-4 max-w-[220px] text-[14px] leading-[1.65] text-white/50">Professional mobile detailing — brought to your door.</p>
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">Services</h3>
            <nav aria-label="Footer services" className="mt-4 space-y-2 text-[14px] text-white/60">
              {detailPackages.map((p) => (
                <a key={p.id} href={`#package-${p.id}`} className="block hover:text-white transition-colors">{p.name}</a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">Contact</h3>
            <div className="mt-4 space-y-2 text-[14px] text-white/60">
              <p>+1 (678) 677-6673</p>
              <p>info@precisionworksdetailing.com</p>
              <p>Serving Northeast Georgia</p>
              <p>Mon–Sat 8 AM – 6 PM</p>
            </div>
          </div>
        </div>
        <div className="section-shell mt-10 flex flex-col gap-3 border-t border-white/8 pt-5 text-[12px] text-white/30 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Precision Works Detailing. All rights reserved.</p>

          {/* Booking modal — rendered here so it overlays the full page */}
          <BookingModal
            open={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            packageData={pkg}
            extraItems={extraItems}
            total={total}
            vehicleType={selectedVehicle}
            vehicleLabel={selectedVehicle ? (vehicleTypes.find((v) => v.id === selectedVehicle)?.label ?? null) : null}
            packageId={selectedPackage}
            extras={selectedExtras}
          />

          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
