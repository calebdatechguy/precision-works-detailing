import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
const _CDN = 'https://res.cloudinary.com/dc7kinqks/image/upload/precision-works'
const aboutPhoto = `${_CDN}/aboutme-1775611446208-hznwv5.jpg`
const photo1 = `${_CDN}/DSC09921-3-1774028142844-e99jgz.jpg`
const photo2 = `${_CDN}/DSC09949-2-1774028142904-52o4kk.jpg`
const photo3 = `${_CDN}/DSC09966-3-1774028142928-yech3r.jpg`
const logoImg = `${_CDN}/LOGO_SMALL_cf43984a-e620-458f-975f-31cd5b6bc93b-1774030211175-k00tpe.webp`

const values = [
  {
    title: 'Passion for Cars',
    body: 'From a young age, cars weren\'t just machines to me — they were something to take care of and be proud of. That love is what drives every detail I do.',
  },
  {
    title: 'Genuine Care',
    body: 'I treat every vehicle like it\'s my own. You\'re trusting me with something valuable, and I take that seriously every single time.',
  },
  {
    title: 'Mobile & Self-Sufficient',
    body: 'I bring my own water and power to every job. You don\'t need to do a thing — just book, and I handle the rest at your door.',
  },
]

export function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
  }, [])

  return (
    <div className="bg-white text-[var(--color-text)]">

      {/* ─── Header (same style as home) ─── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.07)]' : 'bg-[#0a1628]'}`}>
        <div className="section-shell relative flex h-16 items-center justify-between">
          <Link to="/" aria-label="Precision Works Detailing home" className="absolute left-1/2 -translate-x-1/2 flex items-center md:static md:translate-x-0">
            <img src={logoImg} alt="Precision Works Detailing" className="h-6 w-auto md:h-7" />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-[13px] font-semibold text-white/65 transition-colors hover:text-white">Services</Link>
            <Link to="/" className="text-[13px] font-semibold text-white/65 transition-colors hover:text-white">Results</Link>
            <Link to="/about" className="text-[13px] font-semibold text-white transition-colors">About</Link>
          </nav>

          <Link to="/" className="btn hidden rounded-full bg-white px-6 py-2.5 text-[13px] font-bold tracking-wide text-[var(--color-navy)] md:inline-flex hover:bg-white/90">
            Book Now
          </Link>

          <button
            type="button"
            className="btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true">
              <rect width="15" height="2" rx="1" fill="currentColor" />
              <rect y="4.5" width="15" height="2" rx="1" fill="currentColor" />
              <rect y="9" width="15" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className={`fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-[#0a1628] md:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <nav aria-label="Mobile navigation" className="section-shell flex flex-col gap-4 py-5">
            <Link to="/" className="text-[15px] font-semibold text-white/85" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/" className="text-[15px] font-semibold text-white/85" onClick={() => setMobileMenuOpen(false)}>Results</Link>
            <Link to="/about" className="text-[15px] font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/" className="btn mt-2 inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--color-navy)]">Book Now</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-[#0a1628] pb-0 pt-32">
          <div className="section-shell pb-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">About Me</p>
                <h1 className="mt-4 font-display text-[52px] font-bold leading-[1.05] tracking-tight text-white md:text-[68px]">
                  Hey, what's up y'all!
                </h1>
                <p className="mt-6 max-w-sm text-[17px] leading-[1.75] text-white/65">
                  I'm Lucas — a 17-year-old entrepreneur and the founder of Precision Works Detailing.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/" className="btn inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[14px] font-bold tracking-wide text-[var(--color-navy)]">
                    Book a Detail
                  </Link>
                  <a href="tel:+16786776673" className="btn inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-[14px] font-semibold text-white">
                    Call Us
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <img
                    src={aboutPhoto}
                    alt="Lucas, CEO of Precision Works Detailing"
                    width={900}
                    height={700}
                    fetchPriority="high"
                    className="w-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-4 rounded-2xl bg-[var(--color-gold)] px-5 py-4 shadow-xl">
                  <p className="text-[28px] font-bold leading-none text-[#1a1a1a]">2+</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]/70">Years Detailing</p>
                </div>
                <div className="absolute -right-4 -top-4 rounded-2xl bg-[var(--color-navy)] border border-white/10 px-5 py-4 shadow-xl">
                  <p className="text-[28px] font-bold leading-none text-white">83+</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/50">5-Star Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <svg className="block w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white" aria-hidden="true">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </section>

        {/* ─── Story ─── */}
        <section className="py-24">
          <div className="section-shell">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="reveal eyebrow">My Story</p>
                <h2 className="reveal mt-3 font-display text-[40px] font-bold leading-tight text-[var(--color-navy)]">
                  Built from a love for cars and helping people.
                </h2>
                <p className="reveal mt-5 text-[16px] leading-[1.8] text-[var(--color-muted)]" style={{ transitionDelay: '60ms' }}>
                  I started Precision Works Detailing out of a genuine love for cars and a desire to help people feel proud of what they drive. What began as a passion project quickly grew into something real — customers calling back, telling their neighbors, leaving reviews that humbled me.
                </p>
                <p className="reveal mt-4 text-[16px] leading-[1.8] text-[var(--color-muted)]" style={{ transitionDelay: '100ms' }}>
                  I'm fully mobile, self-sufficient, and I show up to every job the same way: ready to work, bringing my own water and power, and focused on delivering a result that makes you want to book again.
                </p>
                <p className="reveal mt-4 text-[16px] leading-[1.8] text-[var(--color-muted)]" style={{ transitionDelay: '140ms' }}>
                  When you book with Precision Works, you're not just getting a car wash — you're trusting me with something valuable. I take that seriously. Every. Single. Time.
                </p>
                <blockquote className="reveal mt-8 border-l-4 border-[var(--color-gold)] pl-6" style={{ transitionDelay: '180ms' }}>
                  <p className="font-display text-[22px] italic leading-snug text-[var(--color-navy)]">
                    "Let's get this detail started!"
                  </p>
                  <footer className="mt-2 text-[14px] font-bold text-[var(--color-muted)]">— Lucas, Founder & CEO</footer>
                </blockquote>
              </div>

              <div className="space-y-5">
                {values.map((v, i) => (
                  <div
                    key={v.title}
                    className="reveal card-surface flex gap-5 p-6"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5L10 17L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-[var(--color-navy)]">{v.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-[1.7] text-[var(--color-muted)]">{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Photo strip ─── */}
        <div className="border-t border-b border-[rgba(0,0,0,0.08)]">
          <div className="grid h-[220px] grid-cols-3 overflow-hidden md:h-[320px]">
            {[photo1, photo2, photo3].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={src}
                  alt="Precision Works Detailing in action"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Quick stats ─── */}
        <section className="bg-[var(--color-navy)] py-20 text-white">
          <div className="section-shell">
            <div className="reveal grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { stat: '5.0', label: 'Google Rating' },
                { stat: '83+', label: 'Five-Star Reviews' },
                { stat: '2+', label: 'Years Detailing' },
                { stat: '100%', label: 'Satisfaction Guaranteed' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-display text-[48px] font-bold leading-none text-[var(--color-gold)]">{item.stat}</p>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/45">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24">
          <div className="section-shell text-center">
            <p className="reveal eyebrow">Ready to get started?</p>
            <h2 className="reveal mt-3 font-display text-[40px] font-bold leading-tight text-[var(--color-navy)]">
              Let's make your car look brand new.
            </h2>
            <p className="reveal mx-auto mt-4 max-w-lg text-[16px] leading-[1.7] text-[var(--color-muted)]" style={{ transitionDelay: '60ms' }}>
              Book online in seconds. I'll bring everything — you just need to show me where to park.
            </p>
            <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: '120ms' }}>
              <Link to="/" className="btn inline-flex items-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-[14px] font-bold tracking-wide text-white">
                Book Your Detail
              </Link>
              <Link to="/" className="btn inline-flex items-center rounded-full border border-[rgba(0,0,0,0.15)] px-8 py-4 text-[14px] font-semibold text-[var(--color-navy)]">
                See Our Packages
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer role="contentinfo" className="bg-[var(--color-charcoal)] py-14 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="Precision Works Detailing home">
              <img src={logoImg} alt="Precision Works Detailing" className="h-9 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 max-w-[220px] text-[14px] leading-[1.65] text-white/50">Professional mobile detailing — brought to your door.</p>
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">Navigate</h3>
            <nav aria-label="Footer navigation" className="mt-4 space-y-2 text-[14px] text-white/60">
              <Link to="/" className="block hover:text-white transition-colors">Services</Link>
              <Link to="/" className="block hover:text-white transition-colors">Results</Link>
              <Link to="/about" className="block hover:text-white transition-colors">About</Link>
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
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
