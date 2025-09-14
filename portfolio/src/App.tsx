import './index.css'
import { NavBar } from './components/NavBar'
import { HomeSection } from './components/HomeSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { useActiveSection } from './components/useActiveSection'
import { I18nProvider, useI18n } from './i18n'

// Removed footer social links (duplication with Contact section)

function AppInner() {
  const sectionIds = ['home','projects','contact']
  const active = useActiveSection(sectionIds)
  const { t } = useI18n()
  return (
    <>
  <NavBar active={active} />
      <div className="nav-spacer" />
      <main>
        <HomeSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer style={{ textAlign:'center', padding:'4rem 0 3rem', fontSize:'.7rem', color:'var(--color-text-soft)' }}>
        © {new Date().getFullYear()} David Palis Neto — {t('footer.copy')}
      </footer>
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppInner />
    </I18nProvider>
  )
}
