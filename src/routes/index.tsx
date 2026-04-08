import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
const aboutPhoto = 'https://res.cloudinary.com/dc7kinqks/image/upload/precision-works/aboutme-1775611446208-hznwv5.jpg'
import logoImg from '../assets/logo.png'

type PackageTier = {
  id: string
  name: string
  tier: string
  price: number
  displayPrice: string
  description: string
  summary: string
  bestFor: string
  includes: string[]
  featured?: boolean
}

type AddOn = {
  id: string
  name: string
  price: number
}

type BoatAddOn = {
  id: string
  name: string
  description: string
  priceLabel: string
}

type BeforeAfterExample = {
  title: string
  beforeAlt: string
  afterAlt: string
}

type Review = {
  id: string
  quote: string
  author: string
  date: string
}

const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'build', label: 'Build Your Detail' },
  { id: 'results', label: 'Results' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const trustPills = ['5.0 ★ Google Rating', '32+ Five-Star Reviews', 'Fully Mobile — No Drop-Off']

const vehicleTypes = [
  { id: 'sedan', label: 'Sedan / Coupe' },
  { id: 'suv', label: 'SUV / Crossover' },
  { id: 'truck', label: 'Truck' },
  { id: 'van', label: 'Van / Large SUV' },
]

const detailPackages: PackageTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Detail',
    tier: 'BRONZE',
    price: 59.99,
    displayPrice: '$59.99',
    description: 'The perfect upkeep wash. Fast, thorough, and gentle on your paint.',
    summary: 'Exterior upkeep with paint-safe methods and wheel detail.',
    bestFor: 'Weekly/bi-weekly maintenance, quick refresh',
    includes: [
      'Hand wash using 2-part safe wash method',
      'Wheel + rim detail (faces + barrels)',
      'Full microfiber towel blow + wipe-down (prevents water spots)',
      'Clean exterior glass',
    ],
  },
  {
    id: 'silver',
    name: 'Silver Full Detail',
    tier: 'SILVER',
    price: 169.99,
    displayPrice: '$169.99',
    description: 'A full reset, inside and out. Best value for first-time customers.',
    summary: 'Inside-and-out mobile detailing reset for daily drivers.',
    bestFor: 'Parents, rideshare drivers, daily commuters',
    includes: [
      'Everything in Bronze',
      'Full interior vacuum (cabin, trunk, seats, all compartments)',
      'Surface wipe-down (dash, vents, door panels, cup holders)',
      'Interior windows cleaned',
      'Drill-brush agitation on carpets & seats',
      'Trim + steering wheel detail',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Premium Detail',
    tier: 'GOLD',
    price: 239.99,
    displayPrice: '$239.99',
    description: 'The complete transformation — restoration-level clean.',
    summary: 'Deep interior restoration plus exterior protection.',
    bestFor: 'Deep cleans, special occasions, vehicle revival',
    featured: true,
    includes: [
      'Everything in Silver',
      'Full stain extraction (steam + shampoo + hot water extraction)',
      'Leather seat cleaning + conditioning',
      'Deep trim conditioning + protectant applied',
      'Tire shine + exterior plastics dressed',
      'Optional paint sealant (3–6 month protection)',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Ceramic',
    tier: 'PLATINUM',
    price: 999.99,
    displayPrice: 'from $999.99',
    description: 'Show-quality finish. Better than the day it left the lot.',
    summary: 'Paint correction and 9H ceramic for long-term defense.',
    bestFor: 'Paint correction, long-term protection, enthusiasts',
    includes: [
      'Everything in Gold',
      'Clay bar paint decontamination',
      '2-step paint correction (compound + polish)',
      '9H 5-year ceramic coating (deep gloss + water beading)',
      'Sedan/Coupe from $999.99 · Truck/Large SUV from $1,299.00',
    ],
  },
]

const addOns: AddOn[] = [
  { id: 'engine-bay', name: 'Engine Bay Clean', price: 49 },
  { id: 'headlight', name: 'Headlight Restoration', price: 59 },
  { id: 'odor', name: 'Odor Elimination', price: 39 },
  { id: 'pet-hair', name: 'Pet Hair Removal', price: 35 },
  { id: 'paint-sealant', name: 'Paint Sealant', price: 79 },
]

const boatPackages: PackageTier[] = [
  {
    id: 'boat-basic',
    name: 'Basic Wash',
    tier: 'BASIC',
    price: 10,
    displayPrice: '$10/ft',
    description: 'Exterior-only wash. Fast, thorough, and built for the water.',
    summary: '~$230 for a 23ft pontoon',
    bestFor: 'Routine maintenance, season opener/closer',
    includes: [
      'Hull pressure wash',
      'Topside rinse + hand wash',
      'Scum line removal',
      'Window wipe down',
      'Trailer wash + rinse',
    ],
  },
  {
    id: 'boat-detail',
    name: 'Detail Wash',
    tier: 'DETAIL',
    price: 20,
    displayPrice: '$20/ft',
    description: 'Full interior + exterior clean. Best value for seasonal detailing.',
    summary: '~$460 for a 23ft pontoon',
    bestFor: 'Seasonal deep clean, post-storage refresh',
    includes: [
      'Everything in Basic Wash',
      'Deck scrub',
      'Mildew removal (seats)',
      'Compartment cleaning',
      'Gutter track cleaning',
    ],
  },
  {
    id: 'boat-wax',
    name: 'Wash + Wax',
    tier: 'WAX',
    price: 38,
    displayPrice: '$38/ft',
    description: 'The complete boat detail — wash, wax, and UV protection.',
    summary: '~$760 for a 20ft boat',
    bestFor: 'Full-season protection, show-ready finish',
    featured: true,
    includes: [
      'Everything in Detail Wash',
      'Machine-applied wax (6 mo.)',
      'Vinyl protectant applied',
      'Trailer tire shine',
      'UV protection coat',
    ],
  },
]

const boatAddOns: BoatAddOn[] = [
  {
    id: 'boat-compound',
    name: 'Compound + polish',
    description: '1-2 step cut, oxidation removal, gelcoat restored',
    priceLabel: '+$45/ft',
  },
  {
    id: 'boat-ceramic',
    name: 'Ceramic coating',
    description: 'Marine ceramic applied, hydrophobic, 2-3 year protection',
    priceLabel: '+$65/ft',
  },
  {
    id: 'boat-engine',
    name: 'Engine bay detail',
    description: 'Degrease, clean, dress — full engine compartment',
    priceLabel: '+$250 flat',
  },
]

const beforeAfterExamples: BeforeAfterExample[] = [
  {
    title: '2022 Ford Expedition — Gold Package',
    beforeAlt: 'Before mobile car detail — 2022 Ford Expedition — Precision Works Detailing',
    afterAlt: 'After mobile car detail — 2022 Ford Expedition — Precision Works Detailing',
  },
  {
    title: '2019 BMW 3 Series — Platinum Ceramic',
    beforeAlt: 'Before mobile car detail — 2019 BMW 3 Series — Precision Works Detailing',
    afterAlt: 'After mobile car detail — 2019 BMW 3 Series — Precision Works Detailing',
  },
  {
    title: 'Harley-Davidson Road Glide — Ceramic Coating',
    beforeAlt: 'Before mobile car detail — Harley-Davidson Road Glide — Precision Works Detailing',
    afterAlt: 'After mobile car detail — Harley-Davidson Road Glide — Precision Works Detailing',
  },
  {
    title: 'Chevy Equinox — Silver Package',
    beforeAlt: 'Before mobile car detail — Chevy Equinox — Precision Works Detailing',
    afterAlt: 'After mobile car detail — Chevy Equinox — Precision Works Detailing',
  },
]

const reviews: Review[] = [
  {
    id: 'jin-han',
    quote:
      "Lucas brought his company to my house, and he brought his own water and generator. He didn't need anything from me... His work was phenomenal. The car is the cleanest it has ever been.",
    author: 'Jin Han',
    date: 'January 2025',
  },
  {
    id: 'ryan-mast',
    quote:
      'Lucas came to our home and restored it to a better-than-new feeling! He was extremely professional and knowledgeable and left my car looking better than it did the day we drove it off the lot.',
    author: 'Ryan Mast',
    date: 'December 2024',
  },
  {
    id: 'lillie-jenkins',
    quote:
      "My huge Nissan Armada was absolutely filthy and had not been cleaned in months. When he got done my car looked and smelled practically brand new. I'm so impressed with the attention to detail.",
    author: 'Lillie Jenkins',
    date: 'November 2024',
  },
  {
    id: 'jordyn-jarrell',
    quote:
      "I had terrible stains and dirt all in it from my child. He was able to remove it all and make it smell amazing! He came to me with his own water and electricity — didn't need me for anything!",
    author: 'Jordyn Jarrell',
    date: 'October 2024',
  },
  {
    id: 'angela-johnson',
    quote:
      'He made her car look brand new. I will recommend everyone looking for a complete inside and out detail of their car to give him a call.',
    author: 'Angela Johnson',
    date: 'September 2024',
  },
  {
    id: 'rebekah-wolgamott',
    quote:
      "It feels like I'm driving a brand new car again. Every nook and cranny was meticulously cleaned — after having 2 kids and a dog it needed some work.",
    author: 'Rebekah Wolgamott',
    date: 'August 2024',
  },
  {
    id: 'sammy-m',
    quote:
      'My Roadglide Harley Davidson was 12 years old, black. Flawless now — never thought it would look like a mirror finish.',
    author: 'Sammy M',
    date: 'July 2024',
  },
  {
    id: 'edward-mcgee',
    quote:
      'Lucas was professional, considerate, and accommodating. Very knowledgeable and passionate about his work with a wicked attention to detail.',
    author: 'Edward McGee',
    date: 'June 2024',
  },
  {
    id: 'caleb-elliott',
    quote:
      'Young group of classy businessmen who do an exceptional job for the price. My car was completely dirty and they went above and beyond.',
    author: 'Caleb Elliott',
    date: 'May 2024',
  },
]

const photoPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">
  <rect width="1600" height="1000" fill="#1C1C1E" />
  <text x="800" y="520" fill="rgba(255,255,255,0.45)" text-anchor="middle" font-family="Questrial, sans-serif" font-size="42" letter-spacing="4">PHOTO</text>
</svg>
`)}`

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function BeforeAfterCard({ title, beforeAlt, afterAlt }: BeforeAfterExample) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !sliderRef.current) {
      return
    }

    const element = sliderRef.current
    let resetTimer: number | undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setPosition(62)
            resetTimer = window.setTimeout(() => setPosition(50), 700)
          }
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (resetTimer) {
        window.clearTimeout(resetTimer)
      }
    }
  }, [hasAnimated])

  const updatePosition = (clientX: number) => {
    if (!sliderRef.current) {
      return
    }

    const bounds = sliderRef.current.getBoundingClientRect()
    const relative = ((clientX - bounds.left) / bounds.width) * 100
    const next = Math.min(92, Math.max(8, relative))
    setPosition(next)
  }

  return (
    <figure className="reveal card-surface p-6" style={{ transitionDelay: '80ms' }}>
      <div
        ref={sliderRef}
        className="relative overflow-hidden rounded-[12px] border border-[rgba(0,0,0,0.12)]"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(true)
          updatePosition(event.clientX)
        }}
        onPointerMove={(event) => {
          if (dragging) {
            updatePosition(event.clientX)
          }
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <img
          src={photoPlaceholder}
          alt={beforeAlt}
          width={1200}
          height={760}
          loading="lazy"
          className="aspect-[12/7] w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={photoPlaceholder}
            alt={afterAlt}
            width={1200}
            height={760}
            loading="lazy"
            className="aspect-[12/7] w-full object-cover"
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-[rgba(28,28,30,0.78)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-[rgba(28,79,138,0.78)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white">
          After
        </span>

        <div
          className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-white/90 transition-[left] duration-[100ms] [transition-timing-function:var(--ease-out)]"
          style={{ left: `${position}%` }}
        >
          <div
            className="slider-handle pointer-events-auto absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[15px] text-white"
            aria-hidden="true"
          >
            ‹›
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-[var(--color-text)]">{title}</figcaption>
    </figure>
  )
}

export function HomePage() {
  const [heroReady, setHeroReady] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0].id)
  const [selectedPackage, setSelectedPackage] = useState(detailPackages[2].id)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])
  const [summaryFlash, setSummaryFlash] = useState(false)
  const [serviceTab, setServiceTab] = useState<'auto' | 'boat'>('auto')

  const packageSelection = useMemo(
    () => detailPackages.find((detailPackage) => detailPackage.id === selectedPackage) ?? detailPackages[0],
    [selectedPackage],
  )

  const selectedVehicleLabel =
    vehicleTypes.find((vehicle) => vehicle.id === selectedVehicle)?.label ?? vehicleTypes[0].label

  const selectedExtraItems = useMemo(
    () => addOns.filter((addOn) => selectedExtras.includes(addOn.id)),
    [selectedExtras],
  )

  const total = useMemo(
    () => packageSelection.price + selectedExtraItems.reduce((sum, addOn) => sum + addOn.price, 0),
    [packageSelection.price, selectedExtraItems],
  )

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setHeroReady(true)
      return
    }

    const heroTimer = window.setTimeout(() => setHeroReady(true), 60)
    return () => window.clearTimeout(heroTimer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const trigger = Math.max(window.innerHeight * 0.45, 120)
      setIsScrolled(window.scrollY > trigger)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return
    }

    setSummaryFlash(true)
    const flashTimer = window.setTimeout(() => setSummaryFlash(false), 520)
    return () => window.clearTimeout(flashTimer)
  }, [total])

  const toggleExtra = (id: string) => {
    setSelectedExtras((current) =>
      current.includes(id) ? current.filter((existing) => existing !== id) : [...current, id],
    )
  }

  const toggleReview = (id: string) => {
    setExpandedReviews((current) =>
      current.includes(id) ? current.filter((existing) => existing !== id) : [...current, id],
    )
  }

  return (
    <div id="top" className="bg-[var(--color-ivory)] text-[var(--color-text)]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-[300ms] [transition-timing-function:var(--ease-in-out)] ${
          isScrolled
            ? 'bg-[var(--color-charcoal)] shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="section-shell flex h-14 items-center justify-between md:h-16">
          <a href="#top" aria-label="Precision Works Detailing home" className="inline-flex items-center">
            <img
              src={logoImg}
              alt="Precision Works Detailing"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-[13px] text-white/75 transition-opacity duration-[200ms] [transition-timing-function:var(--ease-out)] hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn hidden rounded-full bg-[var(--color-blue)] px-6 py-2 text-[14px] text-white md:inline-flex">
            Book Now
          </a>

          <button
            type="button"
            className="btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="text-lg leading-none">☰</span>
          </button>
        </div>

        <div
          className={`fixed inset-x-0 top-14 z-40 border-b border-white/10 bg-[var(--color-charcoal)] md:hidden transition-transform duration-[400ms] [transition-timing-function:var(--ease-out)] ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav aria-label="Mobile navigation" className="section-shell flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-white/85"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn mt-2 inline-flex justify-center rounded-full bg-[var(--color-blue)] px-6 py-2 text-sm text-white">
              Book Now
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative min-h-svh overflow-hidden" aria-label="Mobile detailing hero">
          <img
            src={photoPlaceholder}
            alt="Freshly detailed car exterior — Precision Works Mobile Detailing"
            width={1800}
            height={1200}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(28,28,30,0.55)]" />

          <div className={`section-shell relative z-10 flex min-h-svh flex-col items-center justify-center pt-20 text-center text-white ${heroReady ? 'hero-ready' : ''}`}>
            <p className="hero-sequence eyebrow text-white/75" style={{ transitionDelay: '0ms' }}>
              MOBILE DETAILING · WE COME TO YOU
            </p>
            <h1 className="hero-sequence mt-4 max-w-4xl font-display text-[44px] italic leading-[1.1] md:text-[68px]" style={{ transitionDelay: '120ms' }}>
              Mobile detailing with precision in every detail.
            </h1>
            <p className="hero-sequence mt-5 max-w-2xl text-[16px] leading-[1.65] text-white/85 md:text-[18px]" style={{ transitionDelay: '220ms' }}>
              Professional mobile car detailing brought right to your door. Book in minutes — we handle the rest.
            </p>
            <div className="hero-sequence mt-8 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: '340ms' }}>
              <a href="#contact" className="btn rounded-full bg-[var(--color-charcoal)] px-8 py-4 text-[14px] tracking-[0.04em] text-white">
                Book Your Detail
              </a>
              <a href="#services" className="btn rounded-full border border-[var(--color-navy)] px-8 py-4 text-[14px] tracking-[0.04em] text-white">
                See Our Packages
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {trustPills.map((pill, index) => (
                <li
                  key={pill}
                  className="hero-sequence rounded-full border border-white/15 bg-[rgba(28,28,30,0.5)] px-4 py-2 text-[12px] tracking-[0.03em] text-white/85"
                  style={{ transitionDelay: `${460 + index * 60}ms` }}
                >
                  {pill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" aria-label="Detailing packages" className="border-t border-[rgba(0,0,0,0.08)] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">OUR PACKAGES</p>
            <h2 className="reveal mt-3 max-w-3xl font-display text-[34px] italic leading-tight text-[var(--color-navy)]">
              Detailing done right, at every level.
            </h2>
            <p className="reveal mt-4 max-w-3xl text-[16px] leading-[1.65] text-[var(--color-text)]" style={{ transitionDelay: '80ms' }}>
              Every mobile detailing package is performed at your home, office, or wherever is most convenient. We bring our own water and power — you do not need a thing.
            </p>

            {/* Service tab toggle */}
            <div className="reveal mt-8 flex gap-2" style={{ transitionDelay: '100ms' }}>
              <button
                type="button"
                onClick={() => setServiceTab('auto')}
                className={`btn rounded-full px-6 py-2.5 text-[13px] tracking-[0.04em] transition-colors duration-[200ms] ${
                  serviceTab === 'auto'
                    ? 'bg-[var(--color-navy)] text-white'
                    : 'border border-[rgba(0,0,0,0.15)] bg-white text-[var(--color-text)] hover:border-[var(--color-navy)]'
                }`}
                aria-pressed={serviceTab === 'auto'}
              >
                Auto Detailing
              </button>
              <button
                type="button"
                onClick={() => setServiceTab('boat')}
                className={`btn rounded-full px-6 py-2.5 text-[13px] tracking-[0.04em] transition-colors duration-[200ms] ${
                  serviceTab === 'boat'
                    ? 'bg-[var(--color-navy)] text-white'
                    : 'border border-[rgba(0,0,0,0.15)] bg-white text-[var(--color-text)] hover:border-[var(--color-navy)]'
                }`}
                aria-pressed={serviceTab === 'boat'}
              >
                Boat · Marine
              </button>
            </div>

            {serviceTab === 'auto' ? (
              <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
                {detailPackages.map((detailPackage, index) => (
                  <article
                    key={detailPackage.id}
                    id={`package-${detailPackage.id}`}
                    className={`reveal package-card card-surface min-w-[280px] snap-start p-6 ${detailPackage.featured ? 'package-featured border-[1.5px] border-[var(--color-gold)]' : ''}`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      '--card-delay': `${index * 100}ms`,
                    } as React.CSSProperties}
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[rgba(26,42,76,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                        {detailPackage.tier}
                      </span>
                      {detailPackage.featured ? (
                        <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--color-charcoal)]">
                          Most Popular
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-[20px] text-[var(--color-navy)]">{detailPackage.name}</h3>
                    <p className="mt-1 font-display text-[30px] italic text-[var(--color-navy)]">
                      <span data-price={detailPackage.price.toFixed(2)}>{detailPackage.displayPrice}</span>
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-text)]">{detailPackage.description}</p>

                    <ul className="mt-4 space-y-2 text-[14px] leading-[1.55] text-[var(--color-text)]">
                      {detailPackage.includes.map((line) => (
                        <li key={line} className="pkg-feature flex gap-2">
                          <span className="mt-[2px] text-[var(--color-forest)]" aria-hidden="true">
                            ✓
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-[13px] text-[var(--color-muted)]">Best for: {detailPackage.bestFor}</p>

                    <a href="#contact" className="pkg-btn btn mt-5 inline-flex rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-[14px] tracking-[0.04em] text-white">
                      Book {detailPackage.tier}
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
                {boatPackages.map((pkg, index) => (
                  <article
                    key={pkg.id}
                    className={`reveal package-card card-surface min-w-[280px] snap-start p-6 ${pkg.featured ? 'package-featured border-[1.5px] border-[var(--color-gold)]' : ''}`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      '--card-delay': `${index * 100}ms`,
                    } as React.CSSProperties}
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[rgba(26,42,76,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                        {pkg.tier}
                      </span>
                      {pkg.featured ? (
                        <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--color-charcoal)]">
                          Most Popular
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-[20px] text-[var(--color-navy)]">{pkg.name}</h3>
                    <p className="mt-1 font-display text-[30px] italic text-[var(--color-navy)]">
                      {pkg.displayPrice}
                    </p>
                    <p className="text-[12px] text-[var(--color-muted)]">per linear foot · {pkg.summary}</p>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-text)]">{pkg.description}</p>

                    <ul className="mt-4 space-y-2 text-[14px] leading-[1.55] text-[var(--color-text)]">
                      {pkg.includes.map((line) => (
                        <li key={line} className="pkg-feature flex gap-2">
                          <span className="mt-[2px] text-[var(--color-forest)]" aria-hidden="true">
                            ✓
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-[13px] text-[var(--color-muted)]">Best for: {pkg.bestFor}</p>

                    <a href="#contact" className="pkg-btn btn mt-5 inline-flex rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-[14px] tracking-[0.04em] text-white">
                      Book {pkg.tier}
                    </a>
                  </article>
                ))}
              </div>
            )}

            {serviceTab === 'auto' ? (
              <div className="reveal mt-10 rounded-[12px] border border-[rgba(0,0,0,0.1)] bg-white p-6" style={{ transitionDelay: '160ms' }}>
                <p className="eyebrow">ADD-ONS & EXTRAS</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {addOns.map((addOn) => (
                    <span
                      key={addOn.id}
                      className="rounded-full border border-[rgba(0,0,0,0.12)] px-4 py-2 text-[13px] text-[var(--color-text)]"
                    >
                      {addOn.name} — +{formatCurrency(addOn.price)}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="reveal mt-10 overflow-hidden rounded-[12px] bg-[var(--color-charcoal)] p-6" style={{ transitionDelay: '160ms' }}>
                <p className="eyebrow text-white/50">ADD-ONS</p>
                <div className="mt-3 divide-y divide-white/10">
                  {boatAddOns.map((addOn) => (
                    <div key={addOn.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-white/15 bg-white/8">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-[14px] font-semibold text-white">{addOn.name}</p>
                          <p className="text-[13px] text-white/55">{addOn.description}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-[14px] font-medium text-white/85">{addOn.priceLabel}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="build" aria-label="Build your detail service" className="border-t border-[rgba(0,0,0,0.08)] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">CUSTOMIZE YOUR SERVICE</p>
            <h2 className="reveal mt-3 font-display text-[34px] italic text-[var(--color-navy)]">Build your detail.</h2>
            <p className="reveal mt-4 max-w-3xl text-[16px] leading-[1.65]" style={{ transitionDelay: '80ms' }}>
              Select your vehicle, pick a package, and add any extras. This mobile detailing configurator updates your total in real time.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-8">
                <div role="group" aria-label="Step 1 vehicle type" className="reveal card-surface p-6" style={{ transitionDelay: '120ms' }}>
                  <h3 className="text-[20px] text-[var(--color-navy)]">Step 1 — Vehicle Type</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {vehicleTypes.map((vehicle) => {
                      const isSelected = selectedVehicle === vehicle.id

                      return (
                        <button
                          key={vehicle.id}
                          type="button"
                          className={`vehicle-tile btn flex items-center justify-between rounded-[12px] border p-4 text-left ${
                            isSelected
                              ? 'border-[2px] border-[var(--color-navy)] bg-[rgba(26,42,76,0.05)]'
                              : 'border-[rgba(0,0,0,0.12)] bg-white'
                          }`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedVehicle(vehicle.id)}
                        >
                          <span>{vehicle.label}</span>
                          <span className="tile-check inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-xs text-white">
                            ✓
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div role="group" aria-label="Step 2 package" className="reveal card-surface p-6" style={{ transitionDelay: '200ms' }}>
                  <h3 className="text-[20px] text-[var(--color-navy)]">Step 2 — Package</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {detailPackages.map((detailPackage) => {
                      const isSelected = selectedPackage === detailPackage.id

                      return (
                        <button
                          key={detailPackage.id}
                          type="button"
                          className={`package-tile btn rounded-[12px] border p-4 text-left ${
                            isSelected
                              ? 'border-[2px] border-[var(--color-navy)] bg-[rgba(26,42,76,0.05)]'
                              : 'border-[rgba(0,0,0,0.12)] bg-white'
                          }`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedPackage(detailPackage.id)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[13px] uppercase tracking-[0.08em] text-[var(--color-muted)]">{detailPackage.tier}</span>
                            <span className="text-[14px] text-[var(--color-navy)]">{detailPackage.displayPrice}</span>
                          </div>
                          <p className="mt-2 text-[16px] text-[var(--color-navy)]">{detailPackage.name}</p>
                          <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text)]">{detailPackage.summary}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div role="group" aria-label="Step 3 add extras" className="reveal card-surface p-6" style={{ transitionDelay: '280ms' }}>
                  <h3 className="text-[20px] text-[var(--color-navy)]">Step 3 — Add Extras</h3>
                  <div className="mt-4 space-y-3">
                    {addOns.map((addOn) => {
                      const checked = selectedExtras.includes(addOn.id)

                      return (
                        <button
                          key={addOn.id}
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          className={`btn flex w-full items-center justify-between rounded-[12px] border p-4 text-left ${
                            checked
                              ? 'border-[var(--color-navy)] bg-[rgba(26,42,76,0.05)]'
                              : 'border-[rgba(0,0,0,0.12)] bg-white'
                          }`}
                          onClick={() => toggleExtra(addOn.id)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="addon-check inline-flex h-6 w-6 items-center justify-center rounded-[6px] border border-[var(--color-navy)]">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12.5L10 17L19 7" stroke="#1A2A4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span>{addOn.name}</span>
                          </span>
                          <span>+{formatCurrency(addOn.price)}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <aside
                className="reveal card-surface h-fit p-6 lg:sticky lg:top-24"
                style={{ transitionDelay: '220ms' }}
                aria-live="polite"
              >
                <h3 className="eyebrow">YOUR DETAIL</h3>
                <div className="mt-4 space-y-3 text-[13px]">
                  <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-3">
                    <span className="text-[var(--color-muted)]">Vehicle:</span>
                    <span>{selectedVehicleLabel}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-3">
                    <span className="text-[var(--color-muted)]">Package:</span>
                    <span>
                      {packageSelection.tier} Detail {formatCurrency(packageSelection.price)}
                    </span>
                  </div>

                  <ul className="space-y-2 border-b border-[rgba(0,0,0,0.08)] pb-3">
                    {addOns.map((addOn) => {
                      const checked = selectedExtras.includes(addOn.id)

                      return (
                        <li
                          key={addOn.id}
                          className={`summary-line flex items-center justify-between text-[13px] ${checked ? 'is-visible' : 'is-hidden'}`}
                        >
                          <span className="text-[var(--color-muted)]">+ {addOn.name}</span>
                          <span>{formatCurrency(addOn.price)}</span>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="flex items-end justify-between pt-1">
                    <span className="text-[13px] tracking-[0.08em] text-[var(--color-muted)]">TOTAL</span>
                    <span className={`font-display text-[28px] italic text-[var(--color-navy)] ${summaryFlash ? 'total-pulse total-tint' : ''}`}>
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`btn mt-6 inline-flex w-full justify-center rounded-full bg-[var(--color-blue)] px-6 py-3 text-[14px] tracking-[0.04em] text-white ${summaryFlash ? 'book-glow' : ''}`}
                >
                  Book This Detail
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section id="results" aria-label="Before and after detailing results" className="border-t border-[rgba(0,0,0,0.08)] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">THE RESULTS</p>
            <h2 className="reveal mt-3 font-display text-[34px] italic text-[var(--color-navy)]">See the difference.</h2>
            <p className="reveal mt-4 max-w-3xl text-[16px] leading-[1.65]" style={{ transitionDelay: '80ms' }}>
              Every mobile detailing vehicle we touch leaves looking better than it arrived. No exceptions.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {beforeAfterExamples.map((example) => (
                <BeforeAfterCard key={example.title} {...example} />
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" aria-label="Fleet and dealership detailing services" className="bg-[var(--color-charcoal)] py-24 text-white">
          <div className="section-shell grid gap-10 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow text-[var(--color-gold)]">FLEET & DEALERSHIP SERVICES</p>
              <h2 className="mt-3 font-display text-[34px] italic text-white">We scale with your fleet.</h2>
              <p className="mt-4 text-[16px] leading-[1.65] text-white/80">
                From franchise dealerships to corporate fleets, Precision Works handles high-volume mobile fleet detailing with the same attention to detail we give every single vehicle. Flexible scheduling, volume pricing, and consistent results — every time.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <article className="rounded-[12px] border border-white/8 bg-[#2A2A2C] p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(196,168,110,0.2)] text-[var(--color-gold)]">
                    ◆
                  </span>
                  <h3 className="mt-4 text-[18px] text-white">Volume Pricing</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-white/70">
                    Custom rates for 5+ vehicles per visit. The more you book, the more you save.
                  </p>
                </article>
                <article className="rounded-[12px] border border-white/8 bg-[#2A2A2C] p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(196,168,110,0.2)] text-[var(--color-gold)]">
                    ◆
                  </span>
                  <h3 className="mt-4 text-[18px] text-white">Dealer-Ready Finish</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-white/70">
                    We prep vehicles to showroom standard. Every detail, every time.
                  </p>
                </article>
                <article className="rounded-[12px] border border-white/8 bg-[#2A2A2C] p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(196,168,110,0.2)] text-[var(--color-gold)]">
                    ◆
                  </span>
                  <h3 className="mt-4 text-[18px] text-white">Flexible Scheduling</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-white/70">
                    We work around your lot hours — early mornings, weekends, or on-call.
                  </p>
                </article>
              </div>
            </div>

            <form className="reveal card-surface bg-white p-6 text-[var(--color-text)]" style={{ transitionDelay: '100ms' }}>
              <h3 className="text-[20px] text-[var(--color-navy)]">Request Fleet Pricing</h3>
              <p className="mt-2 text-[14px] text-[var(--color-text)]">
                Tell us about your mobile auto detailing needs and we will send a tailored plan.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="fleet-business" className="form-label">
                    Business Name
                  </label>
                  <input id="fleet-business" name="businessName" type="text" className="form-input" />
                </div>
                <div>
                  <label htmlFor="fleet-contact" className="form-label">
                    Contact Name
                  </label>
                  <input id="fleet-contact" name="contactName" type="text" className="form-input" />
                </div>
                <div>
                  <label htmlFor="fleet-email" className="form-label">
                    Email
                  </label>
                  <input id="fleet-email" name="email" type="email" className="form-input" />
                </div>
                <div>
                  <label htmlFor="fleet-phone" className="form-label">
                    Phone
                  </label>
                  <input id="fleet-phone" name="phone" type="tel" className="form-input" />
                </div>
                <div>
                  <label htmlFor="fleet-size" className="form-label">
                    Number of Vehicles
                  </label>
                  <select id="fleet-size" name="fleetSize" className="form-input">
                    <option>1-4 vehicles</option>
                    <option>5-14 vehicles</option>
                    <option>15-29 vehicles</option>
                    <option>30+ vehicles</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fleet-message" className="form-label">
                    Message
                  </label>
                  <textarea id="fleet-message" name="message" rows={4} className="form-input" />
                </div>
              </div>
              <button type="submit" className="btn mt-5 inline-flex w-full justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-[14px] tracking-[0.04em] text-[var(--color-charcoal)]">
                Send Fleet Request
              </button>
            </form>
          </div>
        </section>

        <section id="reviews" aria-label="Customer reviews" className="border-t border-[rgba(0,0,0,0.08)] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow">WHAT OUR CUSTOMERS SAY</p>
            <h2 className="reveal mt-3 font-display text-[34px] italic text-[var(--color-navy)]">32 five-star reviews and counting.</h2>

            <div className="reveal mt-10 flex flex-wrap justify-center gap-10 text-center" style={{ transitionDelay: '80ms' }}>
              <div>
                <p className="font-display text-[48px] italic text-[var(--color-navy)]">5.0</p>
                <p className="text-[13px] text-[var(--color-muted)]">Google Rating</p>
              </div>
              <div>
                <p className="font-display text-[48px] italic text-[var(--color-navy)]">32+</p>
                <p className="text-[13px] text-[var(--color-muted)]">Verified Reviews</p>
              </div>
              <div>
                <p className="font-display text-[48px] italic text-[var(--color-navy)]">2+</p>
                <p className="text-[13px] text-[var(--color-muted)]">Years in Business</p>
              </div>
            </div>

            <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {reviews.map((review, index) => {
                const expanded = expandedReviews.includes(review.id)
                const needsTrim = review.quote.length > 150
                const text = expanded || !needsTrim ? review.quote : `${review.quote.slice(0, 147)}...`

                return (
                  <article
                    key={review.id}
                    className="reveal card-surface min-w-[280px] snap-start p-6"
                    style={{ transitionDelay: `${Math.min(index * 80, 320)}ms` }}
                  >
                    <div className="mb-3 flex gap-1 text-[var(--color-gold)]" aria-label="Five star review">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <svg
                          key={`${review.id}-${starIndex}`}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 2.75L14.82 8.47L21.14 9.39L16.57 13.85L17.65 20.14L12 17.17L6.35 20.14L7.43 13.85L2.86 9.39L9.18 8.47L12 2.75Z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote cite="https://www.google.com/maps" className="text-[14px] leading-[1.65] text-[var(--color-text)]">
                      {text}
                    </blockquote>
                    {needsTrim ? (
                      <button
                        type="button"
                        className="btn mt-2 text-[13px] text-[var(--color-blue)]"
                        onClick={() => toggleReview(review.id)}
                      >
                        {expanded ? 'Show less' : 'Read more'}
                      </button>
                    ) : null}
                    <p className="mt-4 text-[14px] text-[var(--color-navy)]">{review.author}</p>
                    <div className="mt-1 flex items-center justify-between text-[12px] text-[var(--color-muted)]">
                      <span>{review.date}</span>
                      <span>Google Review</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" aria-label="About Lucas — Precision Works Detailing" className="border-t border-[rgba(0,0,0,0.08)] py-24">
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
                  {/* Floating stat badges */}
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
                <p className="eyebrow">ABOUT ME</p>
                <h2 className="mt-3 font-display text-[38px] italic leading-tight text-[var(--color-navy)]">
                  Hey, What's up Y'all!
                </h2>
                <p className="mt-5 text-[16px] leading-[1.8] text-[var(--color-text)]">
                  I'm Lucas — a 17-year-old entrepreneur and the founder of Precision Works Detailing. I started this company out of a genuine love for cars and a desire to help people feel proud of what they drive.
                </p>
                <p className="mt-4 text-[16px] leading-[1.8] text-[var(--color-text)]">
                  I'm fully mobile and self-sufficient — I bring my own water and power to every job. When you book with me, I promise to take the utmost care of your vehicle. Every. Single. Time.
                </p>

                {/* Values pills */}
                <ul className="mt-6 space-y-3">
                  {[
                    { icon: '⚡', label: 'Self-sufficient — own water & generator' },
                    { icon: '🛡️', label: 'Fully insured & 100% satisfaction guaranteed' },
                    { icon: '⭐', label: '32+ five-star Google reviews' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-[15px] text-[var(--color-text)]">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(26,42,76,0.08)] text-base">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-display text-[22px] italic text-[var(--color-navy)]">
                  "Let's get this detail started!"
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn inline-flex rounded-full bg-[var(--color-charcoal)] px-8 py-4 text-[14px] tracking-[0.04em] text-white">
                    Book Your Detail
                  </a>
                  <Link
                    to="/about"
                    className="btn inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.18)] px-8 py-4 text-[14px] tracking-[0.04em] text-[var(--color-navy)] hover:border-[var(--color-navy)] transition-colors"
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

        <section id="contact" aria-label="Contact Precision Works Detailing" className="border-t border-[rgba(0,0,0,0.08)] py-24">
          <div className="section-shell">
            <p className="reveal eyebrow text-center">GET IN TOUCH</p>
            <h2 className="reveal mt-3 text-center font-display text-[34px] italic text-[var(--color-navy)]">How can we help?</h2>
            <p className="reveal mx-auto mt-4 max-w-2xl text-center text-[16px] leading-[1.65]" style={{ transitionDelay: '80ms' }}>
              Questions about a package, need a quote, or ready to book mobile detailing service? We typically respond within a few hours.
            </p>

            <form className="reveal mx-auto mt-10 max-w-[560px] card-surface p-6" style={{ transitionDelay: '140ms' }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" className="form-input" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" className="form-input" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="form-label">
                    Phone
                  </label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className="form-input" />
                </div>
                <div>
                  <label htmlFor="contact-vehicle" className="form-label">
                    Vehicle
                  </label>
                  <input
                    id="contact-vehicle"
                    name="vehicle"
                    type="text"
                    placeholder="What are we detailing? — optional"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea id="contact-message" name="message" rows={4} className="form-input" />
                </div>
              </div>
              <button type="submit" className="btn mt-5 inline-flex w-full justify-center rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-[14px] tracking-[0.04em] text-white">
                Send Message
              </button>
            </form>

            <ul className="reveal mt-6 flex flex-wrap items-center justify-center gap-3 text-center" style={{ transitionDelay: '220ms' }}>
              <li className="rounded-full border border-[rgba(0,0,0,0.12)] px-4 py-2 text-[13px]">We bring our own water & power</li>
              <li className="rounded-full border border-[rgba(0,0,0,0.12)] px-4 py-2 text-[13px]">Fully insured</li>
              <li className="rounded-full border border-[rgba(0,0,0,0.12)] px-4 py-2 text-[13px]">100% satisfaction guarantee</li>
            </ul>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="bg-[var(--color-charcoal)] py-14 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-3">
          <div>
            <a href="#top" className="inline-flex items-center" aria-label="Precision Works Detailing home">
              <img
                src={logoImg}
                alt="Precision Works Detailing"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-[1.65] text-white/70">
              Professional mobile detailing — brought to your door.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://www.facebook.com/[handle]" aria-label="Facebook" className="text-white/85">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 8.5V6.8C13.5 6.1 14 5.6 14.7 5.6H16.3V3H14.1C11.9 3 10.6 4.3 10.6 6.5V8.5H8.5V11.1H10.6V21H13.5V11.1H16.1L16.5 8.5H13.5Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/[handle]" aria-label="Instagram" className="text-white/85">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-[0.1em] text-white/45">Services</h3>
            <nav aria-label="Footer services" className="mt-4 space-y-2 text-[14px] text-white/80">
              <a href="#package-bronze" className="block">
                Bronze Detail
              </a>
              <a href="#package-silver" className="block">
                Silver Full Detail
              </a>
              <a href="#package-gold" className="block">
                Gold Premium Detail
              </a>
              <a href="#package-platinum" className="block">
                Platinum Ceramic
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-[0.1em] text-white/45">Contact</h3>
            <div className="mt-4 space-y-2 text-[14px] text-white/80">
              <p>Phone: +1 (678) 677-6673</p>
              <p>Email: info@precisionworksdetailing.com</p>
              <p>Service Area: Bethlehem, Georgia</p>
              <p>Hours: Mon-Sat 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="section-shell mt-10 flex flex-col gap-3 border-t border-[rgba(255,255,255,0.08)] pt-5 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Precision Works Detailing. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
