import { defineConfig } from 'unocss'
import { presetStarlightIcons } from 'starlight-plugin-icons/uno'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetStarlightIcons(),
    presetIcons(),
  ],
})
