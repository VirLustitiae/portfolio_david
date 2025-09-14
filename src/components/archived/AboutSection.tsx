import '../index.css'

export function AboutSection() {
  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gap: '3.5rem', maxWidth: 1024 }}>
        <header style={{ display: 'grid', gap: '.75rem' }}>
          <h2 style={{ margin: 0 }}>Sobre</h2>
          <p className="lead text-soft" style={{ margin: 0 }}>
            Profissional movido por desafios técnicos e inovação. Paixão por IA, engenharia de dados e soluções que geram impacto real.
          </p>
        </header>

        <div style={{ display: 'grid', gap: '3rem' }}>
          <Section title="Objetivo Profissional">
            Atuar na área de dados (foco em ciência de dados) contribuindo com soluções inteligentes, eficientes e que gerem valor, evoluindo continuamente em pipelines, modelagem, estatística aplicada e visualização.
          </Section>

          <Section title="Dados Pessoais">
            <ul className="about-list">
              <li><strong>Nome:</strong> David Palis Neto</li>
              <li><strong>Idade:</strong> 29 anos</li>
              <li><strong>Estado civil:</strong> Solteiro</li>
              <li><strong>Endereço:</strong> Rua Duque de Caxias, 74, Apto 304 – São Benedito – Uberaba – MG / Petrópolis – RJ – Brasil</li>
              <li><strong>Celular:</strong> (34) 99338-6920</li>
              <li><strong>Portfólio:</strong> <a href="#home" aria-label="Link portfólio">(este site)</a></li>
              <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/david-palis-6893621a8/" target="_blank" rel="noreferrer">Perfil</a></li>
              <li><strong>Linktree:</strong> <a href="https://linktr.ee/example" target="_blank" rel="noreferrer">Links</a></li>
              <li><strong>GitHub:</strong> <a href="https://github.com/dpalisn" target="_blank" rel="noreferrer">dpalisn</a></li>
              <li><strong>Kaggle:</strong> <a href="https://www.kaggle.com/dpalisn" target="_blank" rel="noreferrer">@dpalisn</a></li>
            </ul>
          </Section>

          <Section title="Formação Acadêmica">
            <ul className="about-list">
              <li><strong>EBAC:</strong> Técnico em Data Science – Projetos práticos, Python, ML.</li>
              <li><strong>Estácio:</strong> Bacharelado em Ciência da Computação (2023–2026).</li>
              <li><strong>UFTM:</strong> Bacharelado em Engenharia Elétrica e Eletrônica (Início 2019).</li>
              <li><strong>Alura (Engenharia de Dados):</strong> Primeiros Passos, Databricks, Python para Data Science, Otimização, OOP.</li>
            </ul>
          </Section>

          <Section title="Idiomas">
            <ul className="about-list">
              <li><strong>Inglês:</strong> Fluente (leitura, escrita e conversação)</li>
              <li><strong>Espanhol:</strong> Básico (leitura, escrita e conversação)</li>
            </ul>
          </Section>

          <Section title="Experiência e Ferramentas Relevantes">
            <p className="text-soft" style={{ marginTop: 0 }}>Experiência prática com:</p>
            <ul className="tag-cloud">
              {['Python','PySpark','Pandas','NumPy','Spark','Seaborn','Matplotlib','Selenium','Playwright','PyTorch','Transformers','LangChain','LangFlow','Pydantic','Scikit-learn','Statsmodels','SpaCy','Azure','Databricks','Data Factory','Airflow'].map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="about-list">
              <li>Competição Kaggle: colocação entre os 14 melhores de 3.000 participantes.</li>
              <li>Projeto de assistente virtual (IA) "Coral" — <a href="https://github.com/yleseverino/Coral" target="_blank" rel="noreferrer">GitHub</a>.</li>
            </ul>
          </Section>

          <Section title="Reconhecimentos e Competições">
            <ul className="about-list">
              <li>Beecrown – Destaque com diversas 1ª colocações.</li>
              <li>OBI – Duas participações representando UFTM e Algar.</li>
              <li>ICPC – Representação da UFTM em programação de alto nível.</li>
            </ul>
          </Section>

          <Section title="Considerações Finais">
            Sou movido por desafios, com foco em excelência técnica, visão analítica e entrega de valor. Pronto para contribuir em times que valorizem qualidade e inovação.
          </Section>
        </div>
      </div>

      <style>{`
        #about .about-list { list-style:none; margin:0; padding:0; display:grid; gap:.45rem; font-size:.8rem; }
        #about .about-list li { line-height:1.4; color: var(--color-text-soft); }
        #about .about-list a { color: var(--color-accent-alt); }
        #about .tag-cloud { list-style:none; margin:.5rem 0 1rem; padding:0; display:flex; flex-wrap:wrap; gap:.5rem; }
        #about .tag-cloud li { font-size:.65rem; letter-spacing:.5px; padding:.4rem .6rem; border:1px solid var(--color-border); border-radius:6px; background: var(--color-surface); color: var(--color-text-soft); }
        #about section:not(:last-child) { margin-bottom:2rem; }
      `}</style>
    </section>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: '.75rem' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
      <div style={{ fontSize: '.85rem', lineHeight: 1.55 }}>{children}</div>
    </div>
  )
}
