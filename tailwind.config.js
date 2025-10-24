/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A5BD3',
          50: '#E6F0FD',
          100: '#CCE1FB',
          200: '#99C3F7',
          300: '#66A5F3',
          400: '#3387EF',
          500: '#0A5BD3',
          600: '#0849A9',
          700: '#06377F',
          800: '#042554',
          900: '#02122A',
        },
        accent: {
          DEFAULT: '#15A34A',
          50: '#E7F8ED',
          100: '#CFF1DB',
          200: '#9FE3B7',
          300: '#6FD593',
          400: '#3FC76F',
          500: '#15A34A',
          600: '#11823B',
          700: '#0D622C',
          800: '#08411E',
          900: '#04210F',
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FEF7E6',
          100: '#FDEFCC',
          200: '#FBDF99',
          300: '#F9CF66',
          400: '#F7BF33',
          500: '#F59E0B',
          600: '#C47E09',
          700: '#935F07',
          800: '#623F04',
          900: '#312002',
        },
        danger: {
          DEFAULT: '#EF4444',
          50: '#FDECEC',
          100: '#FBD9D9',
          200: '#F7B3B3',
          300: '#F38D8D',
          400: '#EF6767',
          500: '#EF4444',
          600: '#BF3636',
          700: '#8F2929',
          800: '#601B1B',
          900: '#300E0E',
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
