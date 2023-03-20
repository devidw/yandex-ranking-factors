import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import robotsTxt from "astro-robots-txt"
import UnoCss from "unocss/astro"

// https://astro.build/config
export default defineConfig({
  site: "https://yandex-ranking-factors.netlify.app",
  markdown: {},
  integrations: [
    svelte(),
    UnoCss(),
    mdx(),
    robotsTxt(),
    sitemap({
      filter: (page) => !page.includes("/x/"),
    }),
  ],
})
