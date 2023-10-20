/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/theme';

export default {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|card|image|modal|input|progress|skeleton|table|link|tabs|select| tooltip).js',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
