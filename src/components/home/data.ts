export type PackageTier = {
  id: string
  name: string
  tier: string
  price: number
  displayPrice: string
  summary: string
  bestFor: string
  includes: string[]
  featured?: boolean
  icon: string
  bookingUrl: string
  bookingUrlSuvTruck?: string
}

export type AddOn = {
  id: string
  name: string
  price: number
  icon: string
}

export type BoatAddOn = {
  id: string
  name: string
  description: string
  priceLabel: string
}

export type Review = {
  id: string
  quote: string
  author: string
  initials: string
  date: string
}

export type BeforeAfterExample = {
  title: string
  beforeAlt: string
  afterAlt: string
  beforeSrc: string
  afterSrc: string
}

export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'results', label: 'Results' },
]

export const vehicleTypes = [
  { id: 'sedan', label: 'Sedan / Coupe', icon: '🚗' },
  { id: 'suv', label: 'SUV / Crossover', icon: '🚙' },
  { id: 'truck', label: 'Truck', icon: '🛻' },
  { id: 'van', label: 'Van / Large SUV', icon: '🚐' },
]

export const scheduleSlots = [
  { id: 'asap', label: 'ASAP', icon: '⚡' },
  { id: 'morning', label: 'Morning', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon', icon: '☀️' },
  { id: 'weekend', label: 'Weekend', icon: '📅' },
]

export const detailPackages: PackageTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Detail',
    tier: 'BRONZE',
    price: 59.99,
    displayPrice: '$59.99',
    summary: 'The perfect upkeep wash. Fast, thorough, gentle on paint.',
    bestFor: 'Weekly/bi-weekly maintenance',
    icon: '🥉',
    bookingUrl: 'https://api.leadconnectorhq.com/widget/booking/0hxe7RSeVu5fbqv3KwGS',
    includes: [
      'Hand wash — 2-bucket safe method',
      'Wheel + rim detail (faces & barrels)',
      'Microfiber blow-dry (prevents water spots)',
      'Exterior glass cleaned',
    ],
  },
  {
    id: 'silver',
    name: 'Silver Full Detail',
    tier: 'SILVER',
    price: 179.99,
    displayPrice: '$179.99',
    summary: 'A full reset, inside and out. Best value for first-timers.',
    bestFor: 'Parents, rideshare drivers, daily commuters',
    icon: '🥈',
    bookingUrl: 'https://api.leadconnectorhq.com/widget/booking/4Ccw9Pplw7J8KjPGLCbZ',
    includes: [
      'Everything in Bronze',
      'Full interior vacuum — all compartments',
      'Surface wipe-down — dash, vents, panels',
      'Interior glass cleaned',
      'Drill-brush agitation on carpets & seats',
      'Trim + steering wheel conditioned',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Premium Detail',
    tier: 'GOLD',
    price: 239.99,
    displayPrice: '$239.99',
    summary: 'The complete transformation — restoration-level clean.',
    bestFor: 'Deep cleans, special occasions, vehicle revival',
    icon: '🏆',
    featured: true,
    bookingUrl: 'https://api.leadconnectorhq.com/widget/booking/9lxMF4bpnXYi0XCeqD7C',
    includes: [
      'Everything in Silver',
      'Steam + hot water extraction on stains',
      'Leather seat cleaning + conditioning',
      'Trim conditioning + protectant',
      'Tire shine + plastics dressed',
      'Optional paint sealant (3–6 month)',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Ceramic',
    tier: 'PLATINUM',
    price: 999.99,
    displayPrice: 'from $999.99',
    summary: 'Show-quality finish. Better than the day it left the lot.',
    bestFor: 'Paint correction & long-term protection',
    icon: '💎',
    bookingUrl: 'https://api.leadconnectorhq.com/widget/booking/WtjhJahjiDGV80u3pGJr',
    bookingUrlSuvTruck: 'https://api.leadconnectorhq.com/widget/booking/XotdrvX2Wqr0iSPjKtzR',
    includes: [
      'Everything in Gold',
      'Clay bar paint decontamination',
      '2-step paint correction (compound + polish)',
      '9H ceramic coating — 5-year protection',
      'Sedan from $999 · Truck/SUV from $1,299',
    ],
  },
]

export const addOns: AddOn[] = [
  { id: 'engine-bay', name: 'Engine Bay Clean', price: 49.99, icon: '🔧' },
  { id: 'headlight', name: 'Headlight Restoration', price: 74.99, icon: '💡' },
  { id: 'odor', name: 'Odor Elimination', price: 39, icon: '🌿' },
  { id: 'pet-hair', name: 'Pet Hair Removal', price: 35, icon: '🐾' },
  { id: 'paint-sealant', name: 'Paint Sealant', price: 79, icon: '🛡️' },
]

export const boatPackages: PackageTier[] = [
  {
    id: 'boat-basic',
    name: 'Basic Wash',
    tier: 'BASIC',
    price: 10,
    displayPrice: '$10/ft',
    summary: '~$230 for a 23ft pontoon',
    bestFor: 'Routine maintenance, season opener/closer',
    icon: '🚤',
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
    summary: '~$460 for a 23ft pontoon',
    bestFor: 'Seasonal deep clean, post-storage refresh',
    icon: '⚓',
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
    summary: '~$760 for a 20ft boat',
    bestFor: 'Full-season protection, show-ready finish',
    icon: '✨',
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

export const boatAddOns: BoatAddOn[] = [
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

export const reviews: Review[] = [
  {
    id: 'jonah-craymer',
    quote: 'Lucas and his team CRUSHED cleaning and waxing our two boats! If you need anything from car washes, to detailing a boat, he\'s got you covered!',
    author: 'Jonah Craymer',
    initials: 'JC',
    date: 'April 2026',
  },
  {
    id: 'cory-finn',
    quote: 'Prompt arrival, great communication, and an immaculate car wash! Will definitely be a repeat customer!',
    author: 'Cory Finn',
    initials: 'CF',
    date: 'April 2026',
  },
  {
    id: 'isaac-sterner',
    quote: 'I have had several mobile detailing companies work on my cars & trucks and no one does it like these guys! Professional, timely, and does exactly what they say they will. I will always use Lucas & his crew!',
    author: 'Isaac Sterner',
    initials: 'IS',
    date: 'March 2026',
  },
  {
    id: 'tiffany-carlisle',
    quote: 'They did amazing work! So kind and respectful I will be using them again!',
    author: 'Tiffany Carlisle',
    initials: 'TC',
    date: 'March 2026',
  },
  {
    id: 't-maxx',
    quote: 'They did an amazing job on my 2010 F150, made the black paint look new again. Very pleased and will use again.',
    author: 'T. Maxx',
    initials: 'TM',
    date: 'February 2026',
  },
  {
    id: 'brockton-bray',
    quote: 'Great to work with. He shows up on time, cars look amazing, and payment is easy to take care of. Highly recommend!',
    author: 'Brockton Bray',
    initials: 'BB',
    date: 'February 2026',
  },
  {
    id: 'aaron-reed',
    quote: 'Excellent service provided by Lucas. He arrived on time, was professional, and made my car look brand new. Absolutely amazing value for the price!',
    author: 'Aaron Reed',
    initials: 'AR',
    date: 'January 2026',
  },
  {
    id: 'jodie-campbell',
    quote: 'Amazing job done on our truck. Very nice and courteous to do business with. Would definitely recommend and will be using again.',
    author: 'Jodie Campbell',
    initials: 'JC',
    date: 'January 2026',
  },
  {
    id: 'jacqueline-allen',
    quote: 'Great experience with Isaac! They made scheduling super easy and were in and out quickly without sacrificing quality. Highly recommend and will be using again very soon.',
    author: 'Jacqueline Allen',
    initials: 'JA',
    date: 'January 2026',
  },
  {
    id: 'michele-wonsey',
    quote: 'Inside of the car was pretty rough! The completed job was wonderful! The amount of hard work he put in was amazing! I would definitely recommend him for any interior you thought would be impossible to get clean. Very impressed with this young man!',
    author: 'Michele Wonsey',
    initials: 'MW',
    date: 'January 2026',
  },
  {
    id: 'christina-cline',
    quote: 'Great company to use! Their communication was excellent, they showed up on time and thoroughly cleaned my husband\'s truck. Highly recommend!',
    author: 'Christina Cline',
    initials: 'CC',
    date: 'January 2026',
  },
  {
    id: 'allen-roman',
    quote: 'Great experience, interior and exterior look great after the detail. Would definitely recommend!',
    author: 'Allen Roman',
    initials: 'AR',
    date: 'January 2026',
  },
  {
    id: 'ben-tuhlei',
    quote: 'Did a really good job — highly recommend, best in the business.',
    author: 'Ben Tuhlei',
    initials: 'BT',
    date: 'January 2026',
  },
  {
    id: 'jeremy-leech',
    quote: 'My truck looks amazing and the inside looks new and smells great. Highly recommend.',
    author: 'Jeremy Leech',
    initials: 'JL',
    date: 'December 2025',
  },
  {
    id: 'heaven-h',
    quote: 'Lucas was punctual and professional. He was thorough and has my car looking brand new. Pricing is reasonable and this is one of the best details I ever got! Amazing customer service.',
    author: 'Heaven H.',
    initials: 'HH',
    date: 'December 2025',
  },
  {
    id: 'brenda-k',
    quote: 'Love my car again — they did an awesome job on my Nissan Rogue inside and out. It\'s great they come to you. Highly recommend!! Very professional.',
    author: 'Brenda K.',
    initials: 'BK',
    date: 'November 2025',
  },
]

function makeBg(label: string, variant: 'before' | 'after') {
  const bg = variant === 'before' ? '#2C323C' : '#0C2A52'
  const bodyFill = variant === 'before' ? '#4A5568' : '#1E3A6E'
  const shineColor = variant === 'before' ? '#8899AA' : '#5BAEFF'
  const roadColor = variant === 'before' ? '#1A1E25' : '#071428'

  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="glow" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="${shineColor}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${variant === 'before' ? '#1A2030' : '#071428'}"/>
      <stop offset="100%" stop-color="${bg}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#sky)"/>
  <rect x="0" y="480" width="1200" height="220" fill="${roadColor}" rx="0"/>
  <rect x="0" y="478" width="1200" height="4" fill="${shineColor}" fill-opacity="0.08"/>
  <rect x="540" y="490" width="120" height="8" fill="rgba(255,255,255,0.06)" rx="4"/>
  <ellipse cx="600" cy="520" rx="480" ry="60" fill="${bodyFill}" fill-opacity="0.25"/>
  <rect x="180" y="370" width="840" height="130" rx="28" fill="${bodyFill}"/>
  <rect x="310" y="290" width="560" height="110" rx="20" fill="${bodyFill}" fill-opacity="0.85"/>
  <rect x="315" y="295" width="555" height="100" rx="18" fill="${shineColor}" fill-opacity="${variant === 'after' ? '0.14' : '0.05'}"/>
  <line x1="600" y1="295" x2="600" y2="395" stroke="${bg}" stroke-width="2" stroke-opacity="0.4"/>
  <rect x="185" y="373" width="830" height="3" rx="2" fill="${shineColor}" fill-opacity="0.2"/>
  <circle cx="330" cy="480" r="72" fill="#0D1117"/>
  <circle cx="330" cy="480" r="52" fill="#191F2A"/>
  <circle cx="330" cy="480" r="28" fill="${bodyFill}"/>
  ${variant === 'after' ? `<circle cx="330" cy="480" r="20" fill="${shineColor}" fill-opacity="0.5"/>` : ''}
  <circle cx="870" cy="480" r="72" fill="#0D1117"/>
  <circle cx="870" cy="480" r="52" fill="#191F2A"/>
  <circle cx="870" cy="480" r="28" fill="${bodyFill}"/>
  ${variant === 'after' ? `<circle cx="870" cy="480" r="20" fill="${shineColor}" fill-opacity="0.5"/>` : ''}
  <rect x="180" y="420" width="50" height="18" rx="5" fill="${variant === 'after' ? '#FFE066' : '#555'}"/>
  <rect x="970" y="420" width="50" height="18" rx="5" fill="${variant === 'after' ? '#FF5555' : '#444'}"/>
  <rect x="186" y="376" width="828" height="120" rx="26" fill="url(#glow)"/>
  <text x="60" y="80" font-family="Georgia,serif" font-size="52" font-weight="700" fill="white" fill-opacity="0.92">${variant === 'before' ? 'Before' : 'After'}</text>
  <text x="60" y="130" font-family="Georgia,serif" font-size="26" fill="${shineColor}" fill-opacity="0.8">${label}</text>
  ${variant === 'after' ? `<circle cx="1100" cy="80" r="34" fill="${shineColor}" fill-opacity="0.18"/><text x="1100" y="90" font-family="Georgia,serif" font-size="22" fill="${shineColor}" text-anchor="middle" dominant-baseline="middle">✦</text>` : ''}
</svg>`)}`
}

const heroSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1000" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#030C1A"/>
      <stop offset="60%" stop-color="#071428"/>
      <stop offset="100%" stop-color="#0A1E3D"/>
    </linearGradient>
    <radialGradient id="heroGlow" cx="55%" cy="52%" r="38%">
      <stop offset="0%" stop-color="#1E4FA0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#030C1A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="headlight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFBEA" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#FFD966" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="headlightR" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFBEA" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#FFD966" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1800" height="1000" fill="url(#heroSky)"/>
  <rect x="0" y="680" width="1800" height="320" fill="#020810"/>
  <rect x="0" y="678" width="1800" height="5" fill="#1E4FA0" fill-opacity="0.15"/>
  <rect x="850" y="700" width="100" height="10" rx="5" fill="rgba(255,255,255,0.04)"/>
  <rect x="0" y="700" width="1800" height="3" fill="rgba(255,255,255,0.03)"/>
  <rect x="200" y="570" width="1400" height="150" rx="36" fill="#0E2044"/>
  <rect x="380" y="430" width="1020" height="165" rx="26" fill="#0E2044"/>
  <rect x="385" y="435" width="1010" height="155" rx="24" fill="#112650" fill-opacity="0.7"/>
  <rect x="388" y="438" width="1004" height="148" rx="22" fill="#4A90E2" fill-opacity="0.07"/>
  <line x1="900" y1="435" x2="900" y2="595" stroke="#071428" stroke-width="3" stroke-opacity="0.5"/>
  <rect x="205" y="573" width="1390" height="4" rx="2" fill="#5BAEFF" fill-opacity="0.22"/>
  <ellipse cx="900" cy="740" rx="560" ry="55" fill="#1E4FA0" fill-opacity="0.12"/>
  <circle cx="420" cy="700" r="90" fill="#060E1C"/>
  <circle cx="420" cy="700" r="68" fill="#0B1830"/>
  <circle cx="420" cy="700" r="38" fill="#0E2044"/>
  <circle cx="420" cy="700" r="20" fill="#1A3A70" fill-opacity="0.6"/>
  <circle cx="1380" cy="700" r="90" fill="#060E1C"/>
  <circle cx="1380" cy="700" r="68" fill="#0B1830"/>
  <circle cx="1380" cy="700" r="38" fill="#0E2044"/>
  <circle cx="1380" cy="700" r="20" fill="#1A3A70" fill-opacity="0.6"/>
  <rect x="207" y="574" width="1386" height="144" rx="34" fill="url(#heroGlow)"/>
  <ellipse cx="270" cy="590" rx="90" ry="28" fill="url(#headlight)" fill-opacity="0.7"/>
  <ellipse cx="1530" cy="590" rx="90" ry="28" fill="url(#headlightR)" fill-opacity="0.7"/>
  <rect x="210" y="615" width="30" height="10" rx="3" fill="#FFE066" fill-opacity="0.7"/>
  <rect x="1560" y="615" width="30" height="10" rx="3" fill="#FF5555" fill-opacity="0.7"/>
  <circle cx="120" cy="130" r="2" fill="white" fill-opacity="0.6"/>
  <circle cx="280" cy="80" r="1.5" fill="white" fill-opacity="0.5"/>
  <circle cx="450" cy="200" r="1" fill="white" fill-opacity="0.4"/>
  <circle cx="1600" cy="100" r="2" fill="white" fill-opacity="0.55"/>
  <circle cx="1720" cy="220" r="1.5" fill="white" fill-opacity="0.45"/>
  <circle cx="900" cy="60" r="1" fill="white" fill-opacity="0.35"/>
  <circle cx="700" cy="150" r="1.5" fill="white" fill-opacity="0.4"/>
  <circle cx="1100" cy="180" r="1" fill="white" fill-opacity="0.3"/>
</svg>`)}`

export const heroImage = heroSvg

import beforeFloormat from '@/assets/uploads/before-car-floormat-1775276097045-xmc37g.png'
import afterFloormat from '@/assets/uploads/after-car-floormat-1775276096878-2l1o5h.png'
import beforeM3 from '@/assets/uploads/before-m3-1775276101713-evrjaa.png'
import afterM3 from '@/assets/uploads/after-m3-1775276101546-6y5yfl.png'
import beforeBoat from '@/assets/uploads/before-boat-1775276300627-dka6qd.png'
import afterBoat from '@/assets/uploads/after-boat-1775276300475-amftqa.png'
import beforeImg9639 from '@/assets/uploads/IMG_9639-1775610662754-4wm4h7.png'
import afterImg9640 from '@/assets/uploads/IMG_9640-1775610662782-qg0knb.jpg'

export const beforeAfterExamples: BeforeAfterExample[] = [
  {
    title: 'Toyota Tacoma — Interior Detail',
    beforeAlt: 'Before detail — Toyota Tacoma floor mat — Precision Works',
    afterAlt: 'After detail — Toyota Tacoma floor mat — Precision Works',
    beforeSrc: afterFloormat,
    afterSrc: beforeFloormat,
  },
  {
    title: 'BMW M3 Competition — Platinum Ceramic',
    beforeAlt: 'Before detail — BMW M3 Competition — Precision Works',
    afterAlt: 'After detail — BMW M3 Competition — Precision Works',
    beforeSrc: afterM3,
    afterSrc: beforeM3,
  },
  {
    title: 'Pontoon Boat — Full Wash & Detail',
    beforeAlt: 'Before detail — Pontoon boat — Precision Works',
    afterAlt: 'After detail — Pontoon boat — Precision Works',
    beforeSrc: afterBoat,
    afterSrc: beforeBoat,
  },
  {
    title: 'Hyundai Elantra — Silver Package',
    beforeAlt: 'Before detail — Hyundai Elantra — Precision Works',
    afterAlt: 'After detail — Hyundai Elantra — Precision Works',
    beforeSrc: afterImg9640,
    afterSrc: beforeImg9639,
  },
]

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
