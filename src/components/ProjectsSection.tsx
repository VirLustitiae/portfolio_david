import '../index.css'
import { ProjectCard } from './ProjectCard'
import { useI18n } from '../i18n'

export interface ProjectInfo {
  title: string
  description?: string
  github: string
  tech?: string[]
}

function useProjects(): ProjectInfo[] {
  const { t } = useI18n()
  return [
    { title: t('project.churn.title'), description: t('project.churn.desc'), github: 'https://github.com/usuario/projeto-churn', tech: ['Python','XGBoost','Pandas','MLFlow'] },
    { title: t('project.fraud.title'), description: t('project.fraud.desc'), github: 'https://github.com/usuario/deteccao-fraude', tech: ['PyTorch','Sklearn','Airflow'] },
    { title: t('project.nlp.title'), description: t('project.nlp.desc'), github: 'https://github.com/usuario/nlp-classifier', tech: ['Transformers','HuggingFace','FastAPI'] },
    { title: t('project.coral.title'), description: t('project.coral.desc'), github: 'https://github.com/yleseverino/Coral', tech: ['Python','NLP','Speech','Transformers'] },
    { title: t('project.kaggle.title'), description: t('project.kaggle.desc'), github: 'https://www.kaggle.com/dpalisn', tech: ['Python','Feature Eng','Ensembles'] },
  ]
}

export function ProjectsSection() {
  const { t } = useI18n()
  const projects = useProjects()
  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gap: '2.5rem' }}>
        <header style={{ display: 'grid', gap: '.9rem' }}>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="lead text-soft" style={{ margin: 0, fontSize:'clamp(1rem,1.6vw,1.15rem)', maxWidth: '62ch' }}>{t('projects.subtitle')}</p>
        </header>
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          }}
        >
          {projects.map(p => (
            <ProjectCard key={p.title} info={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
