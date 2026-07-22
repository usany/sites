import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno({ dark: 'media' }), presetIcons()],
  content: {
    filesystem: ['app/**/*.{js,ts,jsx,tsx,mdx}'],
  },
});
