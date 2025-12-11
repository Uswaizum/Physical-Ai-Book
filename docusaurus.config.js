const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Comprehensive Guide to Physical AI and Humanoid Robotics',
  url: 'https://physical-ai-book.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'physical-ai-book', // Usually your GitHub org/user name.
  projectName: 'physical-ai-textbook', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/physical-ai-book/physical-ai-textbook/edit/main/docusaurus/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Let\'s Learn',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Textbook',
          },
          {
            href: 'https://github.com/physical-ai-book/physical-ai-textbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Textbook',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Chapter 1: Fundamentals',
                to: '/docs/chapter-1-fundamentals',
              },
              {
                label: 'Chapter 2: Robotics Design',
                to: '/docs/chapter-2-robotics-design',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/physical-ai-book/physical-ai-textbook',
              },
              {
                label: 'Physical AI Research',
                href: 'https://en.wikipedia.org/wiki/Physical_artificial_intelligence',
              },
              {
                label: 'Robotics Education',
                href: 'https://www.ieee-ras.org/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Book Project.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
