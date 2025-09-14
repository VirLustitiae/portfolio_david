import type { ProjectInfo } from './ProjectsSection'

export function ProjectCard({ info }: { info: ProjectInfo }) {
  return (
    <article
      className="project-card surface"
      style={{
        padding: '1.25rem 1.25rem 1.4rem',
        display: 'grid',
        gap: '.9rem',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 18,
        border: '1px solid var(--color-border)',
        background:
          'linear-gradient(160deg,#1d2732 0%,#121a21 55%) padding-box, linear-gradient(140deg,rgba(var(--color-accent-glow)/.4),rgba(255,255,255,.05)) border-box',
        transition: 'transform .45s var(--ease-spring), box-shadow .5s, border-color .4s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 100% 0%,rgba(var(--color-accent-glow)/.22),transparent 55%)',
          opacity: 0,
          transition: 'opacity .5s',
          pointerEvents: 'none',
        }}
        className="glow"
      />
      <div style={{ display: 'grid', gap: '.55rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
          <a
            href={info.github}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
            aria-label={`Abrir GitHub do projeto ${info.title}`}
          >
            {info.title}
          </a>
        </h3>
        {info.description && (
          <p style={{ margin: 0, fontSize: '.8rem', lineHeight: 1.4 }} className="text-soft">
            {info.description}
          </p>
        )}
      </div>
      {info.tech && (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.4rem',
            margin: '0 0 .25rem',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {info.tech.map(t => (
            <li
              key={t}
              style={{
                fontSize: '.625rem',
                letterSpacing: '.5px',
                padding: '.35rem .55rem .3rem',
                background: 'var(--color-surface-alt)',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-soft)',
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      <a
        href={info.github}
        target="_blank"
        rel="noreferrer"
        className="focus-ring"
        style={actionBtn}
      >
        <span style={{ position: 'relative', zIndex: 2 }}>GitHub</span>
      </a>
      <style>{`
        .project-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-glow); border-color: rgba(var(--color-accent-glow)/.45); }
        .project-card:hover .glow { opacity: 1; }
      `}</style>
    </article>
  )
}

const actionBtn: React.CSSProperties = {
  justifySelf: 'start',
  marginTop: '.25rem',
  background: 'var(--gradient-accent)',
  color: '#0f141a',
  fontSize: '.7rem',
  fontWeight: 600,
  letterSpacing: '.8px',
  padding: '.55rem .9rem',
  borderRadius: 10,
  textDecoration: 'none',
  boxShadow: '0 4px 14px -4px rgba(var(--color-accent-glow)/.5)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform .4s var(--ease-spring)',
}
