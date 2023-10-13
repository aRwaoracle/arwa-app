/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/theme';

export default {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|card|image).js'
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',

  plugins: [nextui()],
};
