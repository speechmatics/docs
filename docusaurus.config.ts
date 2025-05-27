import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { prismTheme } from "./prism-theme";
import { sidebarItemsGenerator } from "./sidebar-generator";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Speechmatics Docs",
  tagline: "Speechmatics Documentation",
  favicon: "img/favicon.ico",

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
          type: "dropdown",
          label: "API reference",
          position: "left",
          items: [
            {
              type: "doc",
              docId: "jobs-api/speechmatics-asr-rest-api",
              label: "Jobs API",
            },
            // TODO add these as docs later. For now link to the existing docs as placeholder
            {
              label: "Flow Conversational AI",
              href: "https://docs.speechmatics.com/flow-api-ref",
            },
            {
              label: "Real-time transcription",
              href: "https://docs.speechmatics.com/flow-api-ref",
            },
          ],
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
            specPath: "spec/jobs-spec-final.yaml",
            outputDir: "docs/jobs-api",
            sidebarOptions: {
              groupPathsBy: "tag",
              sidebarCollapsed: false,
              sidebarCollapsible: true,
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
  scripts: [
    {
      src: "/js/color-theme.js",
      async: true,
    },
  ],
};

export default config;
