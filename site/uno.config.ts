import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "svelte-transition-grid-item": "col-(start-1 end-2) row-(start-1 end-2)",
  },
  rules: [
    ["drag-none", { "-webkit-user-drag": "none", "user-drag": "none" }],
  ]
})
