import path from "node:path";
import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import katex from "rehype-katex";
import math from "remark-math";
import { prismTheme } from "./prism-theme";
import { checkRedirects } from "./scripts/redirects/check-redirects";
import { sidebarItemsGenerator } from "./sidebar-generator";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Speechmatics Docs",
  tagline: "Speechmatics Documentation",
  favicon: "img/favicon.ico",
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.speechmatics.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "speechmatics", // Usually your GitHub org/user name.
  projectName: "speechmatics-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          remarkPlugins: [math],
          rehypePlugins: [katex],
          sidebarItemsGenerator,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/sm-social-card.png",
    navbar: {
      logo: {
        alt: "Speechmatics Logo",
        src: "img/logo-text.svg",
        srcDark: "img/logo-text-dark.svg",
        height: 23,
        width: 150,
      },
      items: [
        {
          type: "doc",
          position: "left",
          docId: "index",
          label: "Docs",
        },
        {
          type: "doc",
          position: "left",
          docId: "api-ref/index",
          label: "API Reference",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Speechmatics. Built with Docusaurus.`,
    },
    prism: {
      theme: prismTheme,
      darkTheme: prismTheme,
      additionalLanguages: ["docker", "bash"],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'K9Y1459LXK',

      // Public API key: it is safe to commit it
      apiKey: '4192375eb6e5980b954ea3a77a14ff99',

      indexName: 'beta_Beta docs',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          jobs: {
            specPath: "static/batch.yaml",
            outputDir: "docs/api-ref/batch",
            template: "templates/api.mustache",
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
    () => {
      return {
        name: "source-loader-plugin",
        configureWebpack(config) {
          // console.log("Webpack Configuration:");
          // console.log("Rules:", config.module.rules);
          return {
            module: {
              rules: [
                {
                  // Load Python and text files as raw assets
                  test: /\.py$|\.txt$|\.sh$/,
                  type: "asset/source",
                },
                {
                  // Load JS files as raw assets when requested with ?raw query
                  test: /\.js$|\.ts$|\.tsx$|\.mjs$|\.html$|\.yml$|\.yaml$/,
                  resourceQuery: /raw/,
                  // With Webpack 5 we shouldn't need raw-loader
                  // But because Docusaurus uses babel-loader for all JS files by default,
                  // doing it like above for txt and py files strips line breaks and whitespace
                  // TODO: Configure custom JS loader that isn't babel, and remove the raw-loader dependency
                  // one day it will be legacy.
                  use: "raw-loader",
                },
                {
                  // Load content from URLs when requested with ?url= query
                  resourceQuery: /url=/,
                  use: path.resolve(__dirname, "scripts/url-loader.js"),
                },
              ],
            },
          };
        },
      };
    },

    () => {
      return {
        name: "check-redirects-plugin",
        async postBuild({ routesPaths }) {
          checkRedirects(routesPaths);
        },
      };
    },
  ],
  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"], // export theme components
  scripts: [
    {
      src: "/js/color-theme.js",
      async: true,
    },
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

export default config;
