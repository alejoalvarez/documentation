// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Alejo',
  tagline: 'Complete technical guide to master AI Engineering and AI Architecture',
  favicon: 'img/favicon.ico',

  url: 'https://alejoalvarez.github.io',
  baseUrl: '/documentation/',

  // GitHub Pages deploy config
  organizationName: 'alejoalvarez',
  projectName: 'documentation',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/alejoalvarez/documentation/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false, // Disabled — docs only
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',

      navbar: {
        title: 'Alejo-Docs',
        logo: {
          alt: 'Alejo',
          src: 'img/alejo-logo.png',
          srcDark: 'img/logo2.png',
        },
        items: [
          {
            type: 'dropdown',
            label: '🧭 Roadmaps',
            position: 'left',
            items: [
              {
                to: '/docs/ai-engineer/',
                label: '🤖 AI Engineer',
              },
              {
                to: '/docs/ai-architect/',
                label: '🏗️ AI Architect',
              },
              {
                to: '/docs/software-architecture/',
                label: '🧱 Software Architect',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '📚 Resources',
            position: 'left',
            items: [
              {
                to: '/docs/referencias/tools-stack',
                label: 'References',
              },
              {
                to: '/docs/referencias2/tools-stack2',
                label: 'Projects',
              },
            ],
          }
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'AI Engineer',
            items: [
              { label: 'Advanced Python', to: '/docs/ai-engineer/python-avanzado' },
              { label: 'LLMs & Transformers', to: '/docs/ai-engineer/llms-transformers' },
              { label: 'RAG and Embeddings', to: '/docs/ai-engineer/rag-embeddings' },
              { label: 'Fine-tuning y PEFT', to: '/docs/ai-engineer/fine-tuning-peft' },
            ],
          },
          {
            title: 'AI Architect',
            items: [
              { label: 'Clean Architecture', to: '/docs/ai-architect/clean-architecture' },
              { label: 'RAG Architecture', to: '/docs/ai-architect/rag-architecture' },
              { label: 'GPU Infrastructure', to: '/docs/ai-architect/gpu-infrastructure' },
              { label: 'AI Governance', to: '/docs/ai-architect/ai-governance' },
            ],
          },
          {
            title: 'Software Architect',
            items: [
              { label: 'System Design', to: '/docs/software-architecture/system-design-principles' },
              { label: 'Patterns', to: '/docs/software-architecture/architectural-patterns' },
              { label: 'DDD', to: '/docs/software-architecture/domain-driven-design' },
              { label: 'Scalability', to: '/docs/software-architecture/scalability-reliability' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Tools & Stack', to: '/docs/referencias/tools-stack' },
              { label: 'Sources', to: '/docs/referencias/fuentes' },
            ],
          },
          {
            title: 'Resources 2',
            items: [
              { label: 'Tools & Stack', to: '/docs/referencias2/tools-stack2' },
              { label: 'Sources', to: '/docs/referencias2/fuentes2' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Documentation. Alejo.`,
      },

      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },

      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['python', 'bash', 'yaml', 'json', 'typescript', 'docker'],
      },

    }),

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  plugins: [
    // Optional: analytics
    // ['@docusaurus/plugin-google-gtag', { trackingID: 'G-XXXXXXXXXX' }],
  ],
};

module.exports = config;
