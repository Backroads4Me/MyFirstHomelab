// @ts-check
import { defineConfig } from "astro/config";
import Icons from "starlight-plugin-icons";
import UnoCSS from "unocss/astro";
import starlightThemeSix from "@six-tech/starlight-theme-six";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://myfirsthomelab.com",
  output: "static",

  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener"] }],
    ],
  },

  integrations: [
    sitemap(),
    UnoCSS(),
    Icons({
      starlight: {
        title: "MyFirstHomelab",
        head: [
          {
            tag: "link",
            attrs: { rel: "sitemap", href: "/sitemap-index.xml" },
          },
          {
            tag: "link",
            attrs: {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: "/icons/apple-touch-icon.png",
            },
          },
          {
            tag: "link",
            attrs: { rel: "manifest", href: "/icons/site.webmanifest" },
          },
          {
            tag: "script",
            content:
              'document.addEventListener("DOMContentLoaded",()=>{for(const a of document.querySelectorAll(\'a[href^="http"]\'))if(a.hostname!==location.hostname){a.target="_blank";a.relList.add("noopener")}});',
          },
          {
            tag: "meta",
            attrs: {
              property: "og:image",
              content: "https://myfirsthomelab.com/og-default.png",
            },
          },
          {
            tag: "meta",
            attrs: { name: "twitter:card", content: "summary_large_image" },
          },
          {
            tag: "meta",
            attrs: {
              name: "twitter:image",
              content: "https://myfirsthomelab.com/og-default.png",
            },
          },
        ],
        plugins: [
          starlightThemeSix({
            footerText:
              'MyFirstHomelab • Your First Homelab Made Simple • Content <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a> • Site code <a href="https://github.com/Backroads4Me/my-first-homelab/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a>',
          }),
        ],
        customCss: ["./src/styles/custom.css"],
        components: {
          Card: "starlight-plugin-icons/components/Card.astro",
        },
        favicon: "/icons/favicon.svg",
        logo: {
          src: "./public/logo.svg",
          replacesTitle: false,
        },
        lastUpdated: false,
        social: [
          {
            icon: "github",
            label: "GitHub",
            href: "https://github.com/Backroads4Me/my-first-homelab",
          },
        ],
        sidebar: [
          {
            label: "The Path",
            items: [
              { autogenerate: { directory: "start-here" } },
              { autogenerate: { directory: "guide" } },
            ],
          },
          {
            label: "Reference",
            items: [{ autogenerate: { directory: "reference" } }],
          },
        ],
      },
    }),
  ],
});
