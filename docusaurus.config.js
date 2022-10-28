// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

const math = require('remark-math')
const katex = require('rehype-katex')

module.exports = async () => {
  const mermaid = (await import('mdx-mermaid')).default

  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: 'TITLE',
    url: 'https://url',
    baseUrl: '/',

    customFields: {
      ghostAPiKey: process.env.GHOST_API_KEY,
    },

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'es'],
    },

    presets: [
      [
        '@acid-info/logos-docusaurus-preset',
        /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
        ({
          businessUnit: 'Waku',
          theme: {
            name: 'default',
            options: {
              customCss: [require.resolve('./src/css/custom.scss')],
            },
          },
          docs: {
            remarkPlugins: [math, mermaid],
            rehypePlugins: [katex],
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
      ({
        navbar: {
          items: [
            {
              href: '/',
              label: 'Guides',
              type: 'dropdown',
              items: [
                {
                  to: '/js',
                  label: 'JS',
                },
                {
                  to: '/go',
                  label: 'GO',
                },
                {
                  to: '/nwaku',
                  label: 'NWAKU',
                },
              ],
            },
            {
              type: 'docsVersionDropdown',
              position: 'right',
              docsPluginId: 'docs-js',
            },
            {
              type: 'localeDropdown',
              position: 'right',
            },
          ],
        },
      }),

    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],

    plugins: [
      [
        '@docusaurus/plugin-content-docs',
        /**@type {import("@docusaurus/plugin-content-docs").PluginOptions} */
        ({
          id: 'docs-js',
          path: 'docs-js',
          routeBasePath: '/js',
          lastVersion: 'current',
        }),
      ],
      [
        '@docusaurus/plugin-content-docs',
        /**@type {import("@docusaurus/plugin-content-docs").PluginOptions} */
        ({
          id: 'docs-go',
          path: 'docs-go',
          routeBasePath: '/go',
        }),
      ],
      [
        '@docusaurus/plugin-content-docs',
        /**@type {import("@docusaurus/plugin-content-docs").PluginOptions} */
        ({
          id: 'docs-nwaku',
          path: 'docs-nwaku',
          routeBasePath: '/nwaku',
        }),
      ],
    ],
  }

  return config
}
