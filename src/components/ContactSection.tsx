import '../index.css'
import { useI18n } from '../i18n'

export function ContactSection() {
  const { t } = useI18n()
  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gap: '2.5rem', maxWidth: 820 }}>
        <header style={{ display: 'grid', gap: '.9rem' }}>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="lead text-soft" style={{ margin: 0 }}>{t('contact.subtitle')}</p>
        </header>
        <div style={{ display: 'grid', gap: '2.5rem', alignItems: 'start' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              const name = data.get('name')
              const email = data.get('email')
              const msg = data.get('message')
              const mailto = `mailto:seuemail@empresa.com?subject=Contato%20Portfólio%20-%20${encodeURIComponent(
                String(name || ''),
              )}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${msg}`)}`
              window.location.href = mailto
            }}
            style={{ display: 'grid', gap: '1.1rem' }}
          >
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <label htmlFor="name" style={labelStyle}>{t('contact.form.name')}</label>
              <input id="name" name="name" required style={inputStyle} placeholder={t('contact.form.name.placeholder')} />
            </div>
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <label htmlFor="email" style={labelStyle}>{t('contact.form.email')}</label>
              <input id="email" name="email" required type="email" style={inputStyle} placeholder={t('contact.form.email.placeholder')} />
            </div>
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <label htmlFor="message" style={labelStyle}>{t('contact.form.message')}</label>
              <textarea id="message" name="message" required rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.45 }} placeholder={t('contact.form.message.placeholder')} />
            </div>
            <button type="submit" style={submitBtn} className="focus-ring">{t('contact.form.submit')}</button>
          </form>
          <aside style={{ display:'grid', gap:'1.2rem' }}>
            <div style={{ display:'grid', gap:'.75rem' }}>
              <h3 style={{ margin:0, fontSize:'1rem', letterSpacing:'.5px', fontWeight:600 }}>{t('contact.other')}</h3>
              <div style={{ display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))' }}>
                <PlatformButton href="https://www.linkedin.com/in/david-palis-6893621a8/" label="LinkedIn" type="ln" />
                <PlatformButton href="https://github.com/dpalisn" label="GitHub" type="gh" />
                <PlatformButton href="https://www.kaggle.com/dpalisn" label="Kaggle" type="kg" />
                <PlatformButton href="https://linktr.ee/example" label="Linktree" type="lt" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

interface PBProps { href:string; label:string; type:'gh'|'ln'|'kg'|'lt' }
function PlatformButton({ href, label, type }: PBProps) {
  const icon = {
    gh: (<svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>),
    ln: (<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.02h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.05V23h-4v-7.08c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.73 1.84-2.73 3.74V23h-4V8z" /></svg>),
    kg: (<svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16m8.5-9.5L20 20M12.5 10.5 20 4" /></svg>),
    lt: (<svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-6 12-12m0 12L6 3" /></svg>)
  }[type]
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        display:'grid',
        gap:'.45rem',
        justifyItems:'center',
        textDecoration:'none',
        fontSize:'.65rem',
        letterSpacing:'.5px',
        color:'var(--color-text-soft)'
      }}
      className="platform-btn"
    >
      <span style={{
        width:64, height:64, borderRadius:18,
        display:'grid', placeItems:'center',
        background:'linear-gradient(145deg,#1b2530,#12191f 70%)',
        border:'1px solid var(--color-border)',
        boxShadow:'0 2px 10px -2px rgba(0,0,0,.55)',
        transition:'transform .45s var(--ease-spring), box-shadow .5s, border-color .4s'
      }}>
        {icon}
      </span>
      <strong style={{ fontWeight:500, color:'var(--color-text)', fontSize:'.7rem' }}>{label}</strong>
      <style>{`.platform-btn:hover span { transform:translateY(-6px); box-shadow: var(--shadow-glow); border-color: rgba(var(--color-accent-glow)/.45); }
      .platform-btn:hover { color: var(--color-text); }`}</style>
    </a>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  padding: '.9rem 1rem',
  fontSize: '.85rem',
  borderRadius: 10,
  color: 'var(--color-text)',
  outline: 'none',
  boxShadow: '0 1px 0 0 rgba(255,255,255,.05) inset',
}

const labelStyle: React.CSSProperties = {
  fontSize: '.7rem',
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  fontWeight: 600,
  color: 'var(--color-text-soft)',
}

const submitBtn: React.CSSProperties = {
  background: 'var(--gradient-accent)',
  color: '#0f141a',
  fontWeight: 600,
  border: 'none',
  padding: '.9rem 1.4rem',
  borderRadius: 14,
  fontSize: '.85rem',
  letterSpacing: '.5px',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-glow)',
}
