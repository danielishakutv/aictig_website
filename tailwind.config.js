/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AICTiG Official Brand Colors
        primary: {
          // Green: #00a859 (RGB: 0, 168, 89)
          DEFAULT: '#00a859',
          50: '#e6f8f0',
          100: '#ccf1e1',
          200: '#99e3c3',
          300: '#66d5a5',
          400: '#33c787',
          500: '#00a859',
          600: '#008647',
          700: '#006535',
          800: '#004323',
          900: '#002212',
        },
        secondary: {
          // Blue: #0e76bc (RGB: 14, 118, 188)
          DEFAULT: '#0e76bc',
          50: '#e7f3fb',
          100: '#cfe7f7',
          200: '#9fcfef',
          300: '#6fb7e7',
          400: '#3f9fdf',
          500: '#0e76bc',
          600: '#0b5e96',
          700: '#084771',
          800: '#062f4b',
          900: '#031826',
        },
        accent: {
          // Orange: #fcb040 (RGB: 252, 176, 64)
          DEFAULT: '#fcb040',
          50: '#fff7eb',
          100: '#ffefd7',
          200: '#ffdfaf',
          300: '#ffcf87',
          400: '#ffbf5f',
          500: '#fcb040',
          600: '#ca8d33',
          700: '#976a26',
          800: '#65461a',
          900: '#32230d',
        },
        danger: {
          // Red: #ed1c24 (RGB: 237, 28, 36)
          DEFAULT: '#ed1c24',
          50: '#fde8e9',
          100: '#fbd1d3',
          200: '#f7a3a7',
          300: '#f3757b',
          400: '#ef474f',
          500: '#ed1c24',
          600: '#be161d',
          700: '#8e1116',
          800: '#5f0b0e',
          900: '#2f0607',
        },
        neutral: {
          DEFAULT: '#475569',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      });
    },
  ],
};
