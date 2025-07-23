import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import katex from "rehype-katex";
import math from "remark-math";
import { checkRedirectsPlugin } from "./plugins/check-redirects";
import { sourceLoaderPlugin } from "./plugins/source-loader";
import { prismTheme } from "./prism-theme";
import { sidebarItemsGenerator } from "./sidebar-generator";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Speechmatics Docs",
  tagline: "Speechmatics Documentation",
  favicon: "img/favicon.ico",
  customFields: {
    mixpanelToken: process.env.MIXPANEL_PROJECT_TOKEN,
  },

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
    async parseFrontMatter(params) {
      const result = await params.defaultParseFrontMatter(params);
      if (!result.frontMatter.description) {
        console.error(
          `Missing description for Markdown/MDX file: ${params.filePath}`,
        );
        process.exit(1);
      }
      return result;
    },
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
        height: 24,
        width: 190,
      },
      items: [
        {
          type: "search",
          position: "right",
        },
        {
          type: "doc",
          position: "right",
          docId: "index",
          label: "Docs",
        },
        {
          type: "doc",
          position: "right",
          docId: "api-ref/index",
          label: "API Reference",
        },
        {
          type: "html",
          position: "right",
          value:
            "<a href='https://portal.speechmatics.com/signup' target='_blank' class='rt-reset rt-BaseButton rt-r-size-2 rt-variant-solid rt-Button'>Sign up</a>",
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
      appId: "K9Y1459LXK",

      // Public API key: it is safe to commit it
      apiKey: "4192375eb6e5980b954ea3a77a14ff99",

      indexName: "prod",

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
    [
      "@signalwire/docusaurus-plugin-llms-txt",
      {
        siteTitle: "Speechmatics Docs",
        siteDescription: "Developer documentation for Speechmatics APIs",
        depth: 2,
        content: {
          includePages: true,
          enableLlmsFullTxt: true, // Optional: generates llms-full.txt
        },
      },
    ],
    sourceLoaderPlugin,
    checkRedirectsPlugin,
  ],
  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"], // export theme components
  scripts: [
    {
      src: "/js/color-theme.js",
      async: true,
    },
    {
      src: "https://consent.cookiebot.com/uc.js",
      async: false,
      defer: false,
      id: "Cookiebot",
      "data-cbid": "d687cfe6-4b5a-43ff-8e0e-ae6a3a33aeee",
      "data-blockingmode": "auto",
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
