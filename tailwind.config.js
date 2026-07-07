/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-primary': 'var(--color-text-primary)',
        primary: 'var(--color-primary)',
        'primary-soft': 'var(--color-primary-soft)',
        'primary-strong': 'var(--color-primary-strong)',
      }
    },
  },
  plugins: [],
}

