import { useEffect, useMemo, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] || '')
  const idsKey = useMemo(() => ids.join('|'), [ids])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActive(id)
            }
          })
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [ids, idsKey])

  return active
}
