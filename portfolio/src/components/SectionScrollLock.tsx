import { useEffect } from 'react'

interface Props { sections: string[]; active: string; enable?: boolean }

// Scroll inertia lock: requires a stronger scroll (cumulative delta) to move between full-height sections.
export function SectionScrollLock({ sections, active, enable = true }: Props) {
  useEffect(() => {
    if (!enable) return
    if (window.innerHeight < 520) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let accum = 0
    let lastDir: number | null = null
    let locking = false
    const threshold = 160 // how much wheel delta required
    const cooldown = 850

    function wheel(e: WheelEvent) {
      if (e.ctrlKey) return
      const dir = e.deltaY > 0 ? 1 : -1
      const target = e.target as HTMLElement
      if (target.closest('textarea, input, select')) return
      // allow scroll inside a designated scrollable element (e.g., opened accordion) until reaching edge
      const scrollable = target.closest('[data-scrollable]') as HTMLElement | null
      if (scrollable) {
        const atTop = scrollable.scrollTop <= 0 && dir < 0
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && dir > 0
        if (!atTop && !atBottom) return
      }
      e.preventDefault()
      if (locking) return
      if (lastDir !== dir) { accum = 0; lastDir = dir }
      accum += Math.abs(e.deltaY)
      if (accum < threshold) return
      accum = 0
      const idx = sections.indexOf(active)
      let targetId: string | null = null
      if (dir > 0 && idx < sections.length - 1) targetId = sections[idx + 1]
      else if (dir < 0 && idx > 0) targetId = sections[idx - 1]
      if (!targetId) return
      const el = document.getElementById(targetId)
      if (!el) return
      locking = true
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => { locking = false }, cooldown)
    }

    window.addEventListener('wheel', wheel, { passive: false })
    return () => window.removeEventListener('wheel', wheel)
  }, [sections, active, enable])
  return null
}
