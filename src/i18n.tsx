import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Locale = 'pt' | 'en'

interface I18nContextValue {
  locale: Locale
  t: (key: string) => string
  switchLocale: (next?: Locale) => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

// Translation dictionary (flat keys)
const dict: Record<Locale, Record<string, string>> = {
  pt: {
    'nav.home': 'Home',
    'nav.projects': 'Meus Projetos',
    'nav.contact': 'Contato',
    'nav.langToggle': 'EN',

    'home.badge': 'Portfólio • Ciência de Dados',
    'home.greeting': 'Olá, eu sou',
    'home.roleLine': 'Cientista de Dados e Engenheiro em formação. Foco em criar pipelines robustos, modelos de machine learning que geram valor real e experiências orientadas por dados.',
    'home.cta.projects': 'Ver Projetos',
    'home.cta.contact': 'Contato',
    'home.skills.Python': 'Python',
    'home.skills.Machine Learning': 'Machine Learning',
    'home.skills.PySpark': 'PySpark',
    'home.skills.SQL': 'SQL',
    'home.skills.Deep Learning': 'Deep Learning',
    'home.skills.MLOps': 'MLOps',
    'home.skills.Visualização': 'Visualização',
    'home.skills.NLP': 'NLP',
    'home.skills.Azure': 'Azure',
    'home.skills.Airflow': 'Airflow',
    'home.info.objective.title': 'Objetivo Profissional',
    'home.info.objective.body': 'Atuar em ciência de dados criando pipelines, modelos e análises que entreguem valor mensurável, com foco em qualidade, escalabilidade e impacto de negócio.',
    'home.info.education.title': 'Formação Acadêmica',
    'home.info.education.item1': 'EBAC: Técnico em Data Science (projetos práticos, Python, ML).',
    'home.info.education.item2': 'Estácio: Ciência da Computação (2023–2026).',
    'home.info.education.item3': 'UFTM: Engenharia Elétrica e Eletrônica (iniciado 2019).',
    'home.info.education.item4': 'Alura (Engenharia de Dados): Databricks, Python p/ Data Science, Otimização, OOP.',
    'home.info.langs.title': 'Idiomas',
    'home.info.langs.pt': 'Inglês: Fluente (leitura, escrita, conversação)',
    'home.info.langs.es': 'Espanhol: Básico',
    'home.info.rec.title': 'Reconhecimentos & Competições',
    'home.info.rec.item1': 'Kaggle: Top 14 em competição (3.000+ participantes).',
    'home.info.rec.item2': 'Beecrown: Destaques com várias 1ª colocações.',
    'home.info.rec.item3': 'OBI: Participações representando UFTM e Algar.',
    'home.info.rec.item4': 'ICPC: Representação em provas de alto nível.',
    'home.info.rec.item5': 'Projeto Assistente IA "Coral" (voz + NLP).',

    'projects.title': 'Projetos em Destaque',
    'projects.subtitle': 'Experimentos e soluções construídas com foco em impacto de negócio e boas práticas de engenharia.',
    'project.churn.title': 'Análise de Churn',
    'project.churn.desc': 'Modelo preditivo para churn de clientes usando Gradient Boosting.',
    'project.fraud.title': 'Detecção de Fraude',
    'project.fraud.desc': 'Pipeline de detecção de fraude em transações financeiras.',
    'project.nlp.title': 'NLP Classificação',
    'project.nlp.desc': 'Classificador de sentimentos em reviews com Transformers.',
    'project.coral.title': 'Assistente Virtual Coral',
    'project.coral.desc': 'Assistente com IA (voz + NLP) similar à Alexa. Arquitetura modular e extensível.',
    'project.kaggle.title': 'Kaggle Highlight',
    'project.kaggle.desc': 'Análise de dataset hospitalar com ranking top 14 de 3.000 participantes.',

    'contact.title': 'Contato',
    'contact.subtitle': 'Vamos conversar sobre como dados podem gerar impacto. Use o formulário ou mande um e-mail direto.',
    'contact.form.name': 'Nome',
    'contact.form.name.placeholder': 'Seu nome',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'voce@exemplo.com',
    'contact.form.message': 'Mensagem',
    'contact.form.message.placeholder': 'Vamos construir algo incrível...',
    'contact.form.submit': 'Enviar',
    'contact.other': 'Outros Canais',

    'footer.copy': 'Portfólio. Build com React + Vite.'
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.langToggle': 'PT',

    'home.badge': 'Portfolio • Data Science',
    'home.greeting': 'Hi, I am',
    'home.roleLine': 'Data Scientist and Engineer in training. Focused on building robust pipelines, ML models that generate real value, and data-driven experiences.',
    'home.cta.projects': 'View Projects',
    'home.cta.contact': 'Contact',
    'home.skills.Python': 'Python',
    'home.skills.Machine Learning': 'Machine Learning',
    'home.skills.PySpark': 'PySpark',
    'home.skills.SQL': 'SQL',
    'home.skills.Deep Learning': 'Deep Learning',
    'home.skills.MLOps': 'MLOps',
    'home.skills.Visualização': 'Visualization',
    'home.skills.NLP': 'NLP',
    'home.skills.Azure': 'Azure',
    'home.skills.Airflow': 'Airflow',
    'home.info.objective.title': 'Professional Objective',
    'home.info.objective.body': 'Work in data science creating pipelines, models and analyses that deliver measurable value with focus on quality, scalability and business impact.',
    'home.info.education.title': 'Education',
    'home.info.education.item1': 'EBAC: Data Science Technical Program (hands-on projects, Python, ML).',
    'home.info.education.item2': 'Estácio: Computer Science (2023–2026).',
    'home.info.education.item3': 'UFTM: Electrical & Electronic Engineering (started 2019).',
    'home.info.education.item4': 'Alura (Data Engineering): Databricks, Python for Data Science, Optimization, OOP.',
    'home.info.langs.title': 'Languages',
    'home.info.langs.pt': 'English: Fluent (reading, writing, conversation)',
    'home.info.langs.es': 'Spanish: Basic',
    'home.info.rec.title': 'Recognitions & Competitions',
    'home.info.rec.item1': 'Kaggle: Top 14 in a competition (3,000+ participants).',
    'home.info.rec.item2': 'Beecrown: Multiple first-place highlights.',
    'home.info.rec.item3': 'OBI: Participations representing UFTM and Algar.',
    'home.info.rec.item4': 'ICPC: Representation in high-level contests.',
    'home.info.rec.item5': 'AI Assistant project "Coral" (voice + NLP).',

    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Experiments and solutions built with focus on business impact and engineering best practices.',
    'project.churn.title': 'Churn Analysis',
    'project.churn.desc': 'Predictive model for customer churn using Gradient Boosting.',
    'project.fraud.title': 'Fraud Detection',
    'project.fraud.desc': 'Fraud detection pipeline for financial transactions.',
    'project.nlp.title': 'NLP Classification',
    'project.nlp.desc': 'Sentiment classifier on reviews using Transformers.',
    'project.coral.title': 'Coral Virtual Assistant',
    'project.coral.desc': 'AI assistant (voice + NLP) similar to Alexa. Modular & extensible architecture.',
    'project.kaggle.title': 'Kaggle Highlight',
    'project.kaggle.desc': 'Hospital dataset analysis ranking top 14 of 3,000 participants.',

    'contact.title': 'Contact',
    'contact.subtitle': 'Let\'s talk about how data can create impact. Use the form or send an email directly.',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'you@example.com',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Let\'s build something awesome...',
    'contact.form.submit': 'Send',
    'contact.other': 'Other Channels',

    'footer.copy': 'Portfolio. Built with React + Vite.'
  }
}

function detectInitialLocale(): Locale {
  // 1. Persisted
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'pt' || stored === 'en')) return stored
  }
  // 2. Navigator
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language.toLowerCase()
    if (nav.startsWith('pt')) return 'pt'
  }
  return 'en'
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => detectInitialLocale())

  useEffect(() => {
    try {
      localStorage.setItem('locale', locale)
    } catch (err) {
      // ignore persistence errors (private mode, etc.)
    }
  }, [locale])

  const switchLocale = useCallback((next?: Locale) => {
    setLocale(prev => {
      if (next) return next
      return prev === 'pt' ? 'en' : 'pt'
    })
  }, [])

  const t = useCallback((key: string) => {
    const value = dict[locale][key]
    return value ?? key
  }, [locale])

  const value = useMemo(() => ({ locale, t, switchLocale }), [locale, t, switchLocale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
