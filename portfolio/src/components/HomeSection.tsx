import '../index.css'
import { DataBackground } from './visual/DataBackground'
import profile from './visual/fotoperfil.png'
import { useI18n } from '../i18n'
import { useEffect, useRef, useState } from 'react'

export function HomeSection() {
  const { t } = useI18n()
  const skills = ['Python','Machine Learning','PySpark','SQL','Deep Learning','MLOps','Visualização','NLP','Azure','Airflow']
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const balloonRef = useRef<HTMLDivElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [hovering, setHovering] = useState(false)
  const rafRef = useRef<number | null>(null)
  const delayRef = useRef<number | null>(null)
  const sideRef = useRef<'left' | 'right'>('right')
  const fullText = `${t('home.info.objective.body')}\n\n${t('home.info.education.title')}:\n${t('home.info.education.item1')}\n${t('home.info.education.item2')}\n${t('home.info.education.item3')}\n${t('home.info.education.item4')}\n\n${t('home.info.langs.title')}:\n${t('home.info.langs.pt')} | ${t('home.info.langs.es')}\n\n${t('home.info.rec.title')}:\n${t('home.info.rec.item1')}\n${t('home.info.rec.item2')}\n${t('home.info.rec.item3')}\n${t('home.info.rec.item4')}\n${t('home.info.rec.item5')}`

  // Recalcula posição quando mouse entra ou resize
  function positionBalloon() {
    const w = wrapperRef.current
    const b = balloonRef.current
    if (!w || !b) return
    // Reset para medir como apareceria à direita
  b.classList.remove('left')
  b.style.left = ''
  b.style.right = ''
    const rect = b.getBoundingClientRect()
    const overflowRight = rect.right > window.innerWidth - 8
  if (overflowRight) b.classList.add('left')
  }

  useEffect(() => {
    function onResize() { positionBalloon() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Decide balloon side on hover enter
  function decideSide() {
    const circle = wrapperRef.current
    if (!circle) return
    const rect = circle.getBoundingClientRect()
    const centerLine = window.innerWidth / 2
    sideRef.current = rect.left > centerLine ? 'left' : 'right'
  }

  // Hover-driven typewriter (≤3s) with humanized pacing.
  useEffect(() => {
    if (!hovering) {
      // reset
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (delayRef.current) clearTimeout(delayRef.current)
      setTyped('')
      return
    }
    // Build variable schedule: slightly irregular speeds + brief pauses after line breaks
    const text = fullText
    const len = text.length
    const maxDuration = 3000
    // Precompute timestamps per char
    const breakPoints = new Set<number>()
    for (let i=0;i<len;i++) if (text[i] === '\n') breakPoints.add(i)
    const times: number[] = new Array(len)
    let t = 0
    for (let i=0;i<len;i++) {
      // base per-char time (roughly uniform total)
      const remaining = len - i
      const avg = (maxDuration - t) / Math.max(remaining,1)
      // jitter factor
      const jitter = avg * (0.55 + Math.random()*0.9) // 55% - 145% of avg
      t += jitter
      // small pause after newline
      if (breakPoints.has(i)) t += 35 + Math.random()*45
      times[i] = t
    }
    // scale to exactly <= maxDuration
    const finalT = times[len-1] || maxDuration
    const scale = finalT > 0 ? maxDuration / finalT : 1
    for (let i=0;i<len;i++) times[i] *= scale
    const start = performance.now()
    function step(now: number) {
      const elapsed = now - start
      // binary search last char whose time <= elapsed
      let lo=0, hi=len-1, visible=-1
      while (lo<=hi) { const mid=(lo+hi)>>1; if (times[mid] <= elapsed){ visible=mid; lo=mid+1 } else hi=mid-1 }
      const nextText = visible >=0 ? text.slice(0, visible+1) : ''
      setTyped(nextText)
      if (elapsed < maxDuration && hovering && visible < len-1) {
        rafRef.current = requestAnimationFrame(step)
      } else if (!hovering) {
        setTyped('')
      } else if (visible === len-1) {
        // ensure full text at end
        setTyped(text)
      }
    }
    const localRaf = requestAnimationFrame(step)
    rafRef.current = localRaf
    const localDelay = delayRef.current
    return () => {
      cancelAnimationFrame(localRaf)
      if (localDelay) clearTimeout(localDelay)
    }
  }, [hovering, fullText])

  // Fecha overlay mobile ao ESC
  useEffect(() => {
    function key(e: KeyboardEvent){ if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])
  return (
    <section id="home" className="section fade-in" style={{ position: 'relative' }}>
      <DataBackground />
  <div className="container home-grid" style={{ display: 'grid', alignItems: 'flex-start', gap: '3rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem', justifyItems: 'start' }}>
          <h1 style={{ margin: 0 }}>
            {t('home.greeting')} <span className="accent-gradient">David Palis Neto</span>
          </h1>
          <p className="lead text-soft" style={{ margin: 0 }}>{t('home.roleLine')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '.5rem' }}>
            <a href="#projects" className="focus-ring" style={ctaPrimary}>{t('home.cta.projects')}</a>
            <a href="#contact" className="focus-ring" style={ctaSecondary}>{t('home.cta.contact')}</a>
            <a href="https://www.linkedin.com/in/david-palis-6893621a8/" target="_blank" rel="noreferrer" className="focus-ring" style={ctaSecondary}>LinkedIn</a>
            <a href="https://github.com/dpalisn" target="_blank" rel="noreferrer" className="focus-ring" style={ctaSecondary}>GitHub</a>
          </div>
          <ul style={{ display:'flex', listStyle:'none', padding:0, margin:'1rem 0 0', gap:'.75rem', flexWrap:'wrap', fontSize:'.75rem', letterSpacing:.5 }}>
            {skills.map(sk => (
              <li key={sk} style={{ padding:'.45rem .7rem', background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius: 8, color:'var(--color-text-soft)' }}>{t(`home.skills.${sk}`)}</li>
            ))}
          </ul>
        </div>
        <div
          style={{ justifySelf: 'center', position: 'relative' }}
          className="portrait-wrapper"
          ref={wrapperRef}
          onMouseEnter={() => { decideSide(); setHovering(true); positionBalloon() }}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="portrait-circle radar">
            <div className="circle-sweep" />
            <div className="circle-glow" />
            <img src={profile} alt="Foto de David Palis Neto" className="circle-img" />
            <div className="circle-overlay" />
          </div>
          <div className={"cli-balloon" + (hovering ? ' open' : '') + (sideRef.current === 'left' ? ' left' : '')} ref={balloonRef} aria-hidden={!hovering}>
            <div className="cli-inner">
              <div className="cli-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="title">terminal:/home/david</span>
              </div>
              <pre className="cli-screen"><code>{typed}{hovering && <span className="cursor" aria-hidden="true">_</span>}</code></pre>
            </div>
          </div>
        </div>
        {mobileOpen && <div className="balloon-backdrop" onClick={() => setMobileOpen(false)} />}
      </div>
      <style>{`
      @media (min-width: 760px){
        #home > .container.home-grid { grid-template-columns: minmax(0,1fr) 320px; align-items: start; }
        #home .portrait-wrapper { justify-self: end; }
      }
    .portrait-circle { position:relative; width:240px; height:240px; border-radius:50%; overflow:hidden; box-shadow:0 0 0 2px rgba(var(--color-accent-glow)/.45),0 0 0 6px rgba(var(--color-accent-glow)/.08),0 18px 48px -12px rgba(var(--color-accent-glow)/.45); }
    .circle-img { width:100%; height:100%; object-fit:cover; filter:grayscale(100%) contrast(1.05); transition: filter .8s ease, transform .8s ease; border-radius:50%; border:2px solid var(--color-border); }
    .portrait-circle:hover .circle-img { filter:grayscale(25%) contrast(1.05); transform:scale(1.02); }
  .circle-glow { position:absolute; inset:-12%; border-radius:50%; background:radial-gradient(circle at 50% 50%, rgba(var(--color-accent-glow)/.65), rgba(var(--color-accent-glow)/0) 72%); filter:blur(34px); opacity:.8; animation: pulse 5.5s ease-in-out infinite; }
  .circle-sweep { position:absolute; inset:0; border-radius:50%; background:conic-gradient(from 0deg, rgba(var(--color-accent-glow)/.65) 0deg, rgba(var(--color-accent-glow)/0) 75deg); animation: sweep 7s linear infinite; mix-blend-mode:plus-lighter; }
  @keyframes pulse { 0%,100% { transform:scale(1); opacity:.75;} 50% { transform:scale(1.07); opacity:.95;} }
    .circle-overlay { position:absolute; inset:0; border-radius:50%; background:linear-gradient(150deg,rgba(0,0,0,.35),rgba(0,0,0,.55)); mix-blend-mode:soft-light; }
    @keyframes sweep { to { transform: rotate(360deg); } }

    /* Info balloon */
    .portrait-wrapper { --balloon-w: 320px; }
  /* CLI balloon */
  .cli-balloon { position:absolute; top:50%; left:calc(100% + 18px); transform:translateY(-50%) scale(.95); opacity:0; pointer-events:none; width:300px; max-width:55vw; max-height:240px; }
  .cli-balloon.open { opacity:1; transform:translateY(-50%) scale(1); transition:opacity .45s var(--ease-spring), transform .55s var(--ease-spring); pointer-events:auto; }
  .cli-inner { background:#000; border:1px solid #0d1a23; border-radius:14px; box-shadow:0 8px 30px -6px rgba(0,0,0,.7),0 0 0 1px rgba(var(--color-accent-glow)/.35); overflow:hidden; display:flex; flex-direction:column; height:100%; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace; }
  .cli-header { background:linear-gradient(180deg,#10181f,#06090c); padding:.35rem .55rem; display:flex; align-items:center; gap:.45rem; font-size:.5rem; letter-spacing:.5px; color:#4a6475; border-bottom:1px solid #142631; }
  .cli-header .dot { width:9px; height:9px; border-radius:50%; display:inline-block; }
  .cli-header .red { background:#ff5f56; }
  .cli-header .yellow { background:#ffbd2e; }
  .cli-header .green { background:#27c93f; }
  .cli-screen { flex:1; margin:0; padding:.65rem .75rem .8rem; font-size:.58rem; line-height:1.4; color:#cde4ff; white-space:pre-wrap; overflow:hidden; position:relative; text-shadow:0 0 2px rgba(45,129,255,.35); }
  .cli-screen code { font:inherit; }
  .cli-balloon.open .cli-screen { animation: scanlines .12s linear infinite; }
  @keyframes scanlines { 0%,100% { filter:contrast(1) brightness(1); } 50% { filter:contrast(1.05) brightness(1.02); } }
  .cli-balloon.left { left:auto; right:calc(100% + 18px); }
  @media (max-width: 860px){
    .cli-balloon { position:fixed; top:auto; left:50%; right:auto; bottom:1rem; transform:translate(-50%,8px) scale(.95); width:min(92vw,420px); max-height:46vh; z-index:60; }
    .cli-balloon.open { transform:translate(-50%,0) scale(1); }
  }
  @keyframes blink { 50% { opacity:0; } }
  .cli-screen code .cursor { display:inline-block; animation:blink 1s steps(2,start) infinite; }

    @media (max-width: 940px){
      .info-balloon { left:50%; top:calc(100% + 18px); transform:translate(-50%,0) scale(.92); }
      .portrait-wrapper:hover .info-balloon { transform:translate(-50%,0) scale(1); }
      .balloon-inner:after { left:50%; top:-10px; transform:translate(-50%,0) rotate(45deg); }
    }
    @media (max-width: 680px){
      #home > .container { gap:2.25rem; }
      .portrait-circle { width:180px; height:180px; }
      h1 { font-size: clamp(2rem,9vw,3rem); }
      .lead { font-size: clamp(.95rem,4.5vw,1.15rem); }
      ul { font-size:.65rem; }
      .portrait-wrapper { --balloon-w: 92vw; }
      /* Desativa hover puro no mobile, usa clique */
      .portrait-wrapper:hover .info-balloon { opacity:0; transform:translate(-50%,0) scale(.92); }
    }
      `}</style>
    </section>
  )
}

const baseBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.5rem',
  fontWeight: 600,
  fontSize: '.9rem',
  letterSpacing: '.5px',
  padding: '.9rem 1.35rem',
  borderRadius: 14,
  position: 'relative',
  overflow: 'hidden',
  textDecoration: 'none',
  transition:'background .3s, box-shadow .4s, transform .25s',
}

const ctaPrimary: React.CSSProperties = {
  ...baseBtn,
  background: 'var(--gradient-accent)',
  color: '#0f141a',
  boxShadow: 'var(--shadow-glow)',
}

const ctaSecondary: React.CSSProperties = {
  ...baseBtn,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text)',
}

// Removed old InfoGroup accordions replaced by hover balloon.
