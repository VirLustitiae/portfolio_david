import { useState } from 'react'
import { useI18n } from '../i18n'
import '../index.css'

interface NavBarProps {
  active?: string
}

const navItems = ['home','projects','contact'] as const

export function NavBar({ active }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const { t, locale, switchLocale } = useI18n()

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40 }}>
      <div
        className="container"
        style={{
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <a
          href="#home"
          style={{
            fontWeight: 600,
            letterSpacing: '.5px',
            fontSize: '1.05rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'var(--gradient-accent)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#0f141a',
              boxShadow: 'var(--shadow)' ,
            }}
          >
            DS
          </span>
          <span style={{ fontWeight: 500 }}>Data Scientist</span>
        </a>

        <nav aria-label="Navegação principal" className="nav-desktop" style={{ display: 'none' }}>
          <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', gap: '.25rem', margin: 0, padding: 0 }}>
            {navItems.map(id => {
              const label = t(`nav.${id}`)
              const shortLabel = id === 'projects' ? (locale === 'pt' ? 'Projetos' : 'Projects') : label
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'active-link' : ''}
                    style={{
                      position: 'relative',
                      padding: '.55rem .95rem',
                      borderRadius: 8,
                      fontSize: '.9rem',
                      fontWeight: 500,
                      color: active === id ? 'var(--color-accent-alt)' : 'var(--color-text-soft)',
                      transition: 'background .25s,color .25s',
                    }}
                  >
                    {shortLabel}
                  </a>
                </li>
              )
            })}
            <li>
              <button
                onClick={() => switchLocale()}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '.55rem .8rem',
                  borderRadius: 8,
                  fontSize: '.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--color-text-soft)'
                }}
              >{t('nav.langToggle')}</button>
            </li>
          </ul>
        </nav>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(o => !o)}
          className="menu-btn"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            width: 42,
            height: 42,
            borderRadius: 12,
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 20, height: 16, position: 'relative' }}>
            <span style={bar(0, open)} />
            <span style={bar(1, open)} />
            <span style={bar(2, open)} />
          </div>
        </button>
      </div>

      {open && (
        <div
          style={{
            background: 'rgba(15,20,26,.6)',
            backdropFilter: 'blur(14px)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ padding: '1.25rem 1.25rem 1.75rem' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '.25rem' }}>
              {navItems.map(id => {
                const label = t(`nav.${id}`)
                const shortLabel = id === 'projects' ? (locale === 'pt' ? 'Projetos' : 'Projects') : label
                return (
                  <li key={id}>
                    <a
                      onClick={() => setOpen(false)}
                      href={`#${id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '.9rem 1rem',
                        borderRadius: 10,
                        fontWeight: 500,
                        fontSize: '.95rem',
                        background: active === id ? 'var(--gradient-accent)' : 'var(--color-surface)',
                        color: active === id ? '#0f141a' : 'var(--color-text)',
                        boxShadow: active === id ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                      }}
                    >
                      {shortLabel}
                    </a>
                  </li>
                )
              })}
              <li>
                <button
                  onClick={() => { switchLocale(); setOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '.9rem 1rem',
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: '.8rem',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-soft)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}
                >{locale === 'pt' ? 'EN' : 'PT'}</button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <style>{`
      @media (min-width: 860px) {
        .nav-desktop { display:block !important; }
        .menu-btn { display:none !important; }
      }
      .active-link::after { content:""; position:absolute; left:10px; right:10px; bottom:6px; height:2px; background:var(--gradient-accent); border-radius:4px; }
      header { background: rgba(15,20,26,.6); backdrop-filter: blur(14px); border-bottom:1px solid var(--color-border); }
      `}</style>
    </header>
  )
}

function bar(index: number, open: boolean): React.CSSProperties {
  const common: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    background: 'var(--color-text)',
    borderRadius: 2,
    transition: 'transform .4s var(--ease-spring), top .3s .1s',
  }
  if (!open) {
    return { ...common, top: index === 0 ? 0 : index === 1 ? 7 : 14 }
  }
  if (index === 0) return { ...common, top: 7, transform: 'rotate(45deg)' }
  if (index === 1) return { ...common, top: 7, transform: 'scaleX(0)' }
  return { ...common, top: 7, transform: 'rotate(-45deg)' }
}
