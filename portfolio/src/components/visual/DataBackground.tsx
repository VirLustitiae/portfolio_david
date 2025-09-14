import { useEffect, useRef } from 'react'

/* Canvas animado "data science" (nós + espiral Fibonacci + fórmulas + colunas de dígitos + clusters) */
export function DataBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const context = ctx // garantir tipo não-null

    function resize() {
      if (!ref.current) return { w: 0, h: 0 }
      const c = ref.current
      const w = (c.width = c.offsetWidth * devicePixelRatio)
      const h = (c.height = c.offsetHeight * devicePixelRatio)
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(devicePixelRatio, devicePixelRatio)
      return { w, h }
    }
    let { w: width, h: height } = resize()

    /* 1. Partículas/nós conectados */
    interface Node { x: number; y: number; vx: number; vy: number; r: number }
    const nodes: Node[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2,
    }))

    /* 2. Espiral de Fibonacci (pontos pré-calculados) */
    interface SpiralPoint { x: number; y: number; a: number; r: number }
    const fibPoints: SpiralPoint[] = []
    const fibCount = 120
    for (let i = 0; i < fibCount; i++) {
      const angle = i * 0.35
      const radius = 2 + i * 1.2
      fibPoints.push({ x: 0, y: 0, a: angle, r: radius })
    }

    /* 3. Fórmulas flutuantes */
    const formulas = [
      '∇·E = ρ/ε₀',
      'Σ (xi - μ)²',
      'P(y|x) = softmax(z)',
      'y = β₀ + β₁x',
      'argmin L(θ)',
      'E[x] = Σ x p(x)',
      '∂L/∂w',
      'σ = 1/(1+e^{-x})',
      'μ = (1/n) Σ xi',
      'Var(X)=E[X²]-E[X]²',
    ]
    interface FloatingText { x: number; y: number; vy: number; text: string; alpha: number; size: number }
    const floating: FloatingText[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -0.12 - Math.random() * 0.18,
      text: formulas[Math.floor(Math.random() * formulas.length)],
      alpha: 0.2 + Math.random() * 0.3,
      size: 10 + Math.random() * 6,
    }))

    /* 4. Colunas de dígitos (Matrix suave) */
    interface DigitColumn { x: number; y: number; speed: number; str: string; fade: number }
    const cols: DigitColumn[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 28 + Math.random() * 32,
      str: randomDigits(16 + Math.floor(Math.random() * 12)),
      fade: 0.08 + Math.random() * 0.15,
    }))

    /* 5. Scatter clusters (pontos gaussianos) */
    interface ClusterPoint { x: number; y: number; ox: number; oy: number; a: number; r: number }
    const clusterCenters = Array.from({ length: 3 }, () => ({
      x: width * (0.2 + Math.random() * 0.6),
      y: height * (0.2 + Math.random() * 0.6),
    }))
    const clusterPts: ClusterPoint[] = []
    clusterCenters.forEach(c => {
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.pow(Math.random(), 0.6) * 70
        clusterPts.push({
          x: c.x + Math.cos(angle) * dist,
          y: c.y + Math.sin(angle) * dist,
          ox: c.x,
          oy: c.y,
          a: Math.random() * Math.PI * 2,
          r: 0.5 + Math.random() * 1.2,
        })
      }
    })

    let frame = 0
    let lastTime = performance.now()

    function tick(now: number) {
      frame++
      const dt = Math.min(60, now - lastTime)
      lastTime = now
      // base clear
      context.clearRect(0, 0, width, height)
      context.fillStyle = 'rgba(15,20,26,0.85)'
      context.fillRect(0, 0, width, height)

      // Colunas de dígitos
      context.save()
      context.font = '12px monospace'
      context.textBaseline = 'top'
      cols.forEach(c => {
        c.y -= (c.speed * dt) / 1000
        if (c.y < -220) {
          c.y = height + Math.random() * 120
          c.x = Math.random() * width
          c.str = randomDigits(12 + Math.floor(Math.random() * 14))
        }
        for (let i = 0; i < c.str.length; i++) {
          const ch = c.str[i]
          const yy = c.y + i * 12
          if (yy < -20 || yy > height + 20) continue
          const intensity = 1 - i / c.str.length
          context.fillStyle = `rgba(90,169,255,${(0.22 + intensity * 0.55) * c.fade})`
          context.fillText(ch, c.x, yy)
        }
      })
      context.restore()

      // Clusters
      context.save()
      clusterPts.forEach(p => {
        p.a += 0.0005 * dt
        const swing = Math.sin(frame * 0.01 + p.a) * 4
        const px = p.x + swing
        const py = p.y + Math.cos(frame * 0.008 + p.a) * 4
        context.fillStyle = 'rgba(125,200,255,0.07)'
        context.beginPath()
        context.arc(px, py, p.r * 4, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = 'rgba(125,200,255,0.45)'
        context.beginPath()
        context.arc(px, py, p.r, 0, Math.PI * 2)
        context.fill()
      })
      context.restore()

      // Espiral Fibonacci
      context.save()
      const cx = width / 2
      const cy = height / 2
      context.translate(cx, cy)
      context.rotate(frame * 0.0005)
      fibPoints.forEach((p, i) => {
        const angle = p.a + frame * 0.0008
        const x = Math.cos(angle) * p.r
        const y = Math.sin(angle) * p.r
        const alpha = Math.min(0.5, 0.1 + (i / fibPoints.length) * 0.6)
        context.fillStyle = `rgba(45,129,255,${alpha * 0.35})`
        context.beginPath()
        context.arc(x, y, 2, 0, Math.PI * 2)
        context.fill()
      })
      context.restore()

      // Nós conectados
      context.save()
      context.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > width) a.vx *= -1
        if (a.y < 0 || a.y > height) a.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < 150) {
            const op = 1 - d / 150
            context.strokeStyle = `rgba(90,169,255,${op * 0.25})`
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
        context.fillStyle = 'rgba(255,255,255,0.65)'
        context.beginPath()
        context.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()

      // Fórmulas
      context.save()
      floating.forEach(f => {
        f.y += f.vy * dt
        if (f.y < -40) {
          f.y = height + 20
          f.x = Math.random() * width
          f.text = formulas[Math.floor(Math.random() * formulas.length)]
          f.alpha = 0.2 + Math.random() * 0.3
        }
        context.font = `${f.size}px "JetBrains Mono", monospace`
        context.fillStyle = `rgba(219,226,234,${f.alpha})`
        context.fillText(f.text, f.x, f.y)
      })
      context.restore()

      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    function onResize() {
      const r = resize()
      width = r.w
      height = r.h
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }} aria-hidden>
      <canvas ref={ref} style={{ width: '100%', height: '100%', opacity: 0.78, mixBlendMode: 'plus-lighter' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%,rgba(var(--color-accent-glow)/.18),transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(15,20,26,.15),rgba(15,20,26,.55))' }} />
    </div>
  )
}

function randomDigits(len: number) {
  let out = ''
  for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10)
  return out
}
