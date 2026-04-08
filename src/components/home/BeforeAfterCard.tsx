import { useEffect, useRef, useState } from 'react'
import type { BeforeAfterExample } from './data'

export function BeforeAfterCard({ title, beforeAlt, afterAlt, beforeSrc, afterSrc }: BeforeAfterExample) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !sliderRef.current) return
    const el = sliderRef.current
    let t: number | undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setPosition(64)
            t = window.setTimeout(() => setPosition(50), 900)
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => { obs.disconnect(); if (t) clearTimeout(t) }
  }, [hasAnimated])

  const updatePos = (clientX: number) => {
    if (!sliderRef.current) return
    const b = sliderRef.current.getBoundingClientRect()
    const pct = ((clientX - b.left) / b.width) * 100
    setPosition(Math.min(93, Math.max(7, pct)))
  }

  return (
    <figure className="reveal overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-white shadow-[0_4px_24px_rgba(17,36,66,0.08)]" style={{ transitionDelay: '80ms' }}>
      <div
        ref={sliderRef}
        className="relative overflow-hidden"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); updatePos(e.clientX) }}
        onPointerMove={(e) => { if (dragging) updatePos(e.clientX) }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <img src={beforeSrc} alt={beforeAlt} width={1200} height={700} loading="lazy" className="aspect-[12/7] w-full object-cover select-none" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={afterSrc} alt={afterAlt} width={1200} height={700} loading="lazy" className="aspect-[12/7] w-full object-cover select-none" draggable={false} />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-[rgba(10,20,40,0.82)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-[#2E4F8A] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">After</span>

        <div
          className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-white/95"
          style={{ left: `${position}%`, transition: dragging ? 'none' : 'left 500ms cubic-bezier(0.45,0,0.55,1)' }}
        >
          <div className="slider-handle pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.32)] text-[var(--color-navy)] text-[16px] font-bold select-none" aria-hidden="true">
            ⇄
          </div>
        </div>
      </div>
      <figcaption className="px-5 py-4 text-[14px] font-semibold text-[var(--color-navy)]">{title}</figcaption>
    </figure>
  )
}
