# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Portfólio Data Scientist

Aplicação React + TypeScript + Vite otimizada para apresentar um portfólio de ciência de dados com foco em clareza e estética enterprise.

## Seções
- **Home**: Apresentação completa (objetivo, formações resumidas, idiomas e destaques em acordeões), avatar, tecnologias e CTAs.
- **Projetos**: Cards com link para GitHub/Kaggle e stack.
- **Contato**: Formulário (mailto) + canais diretos/links sociais.

## Personalização Rápida
1. Edite nome e descrição em `src/components/HomeSection.tsx`.
2. Substitua a imagem (`profile`) por um avatar/foto real em `src/assets/`.
3. Ajuste projetos em `src/components/ProjectsSection.tsx` (array `projects`).
4. Atualize e-mail e telefones em `src/components/ContactSection.tsx`.
5. Paleta/variáveis em `src/index.css`.

## Execução
```bash
npm install
npm run dev
```
Build de produção:
```bash
npm run build
```
Pré-visualização:
```bash
npm run preview
```

## Acessibilidade
- Navegação por teclado garantida
- Foco visível personalizado
- Contraste alto em botões e links

## Melhorias Futuras (idéias)
- Dark/Light toggle
- Envio real via API (EmailJS / backend)
- Páginas detalhadas de cada projeto
- Internacionalização (pt-BR / en-US)

## Licença
Uso pessoal livre. Remova ou adapte antes de publicar.
