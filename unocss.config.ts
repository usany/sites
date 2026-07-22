import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno({ dark: 'class' }), presetIcons()],
  content: {
    filesystem: ['app/**/*.{js,ts,jsx,tsx,mdx}'],
  },
});
