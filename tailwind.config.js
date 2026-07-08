/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': 'var(--color-background)',
        'background-soft': 'var(--color-background-soft)',
        'surface': 'var(--color-surface)',
        'text': 'var(--color-text)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'primary': 'var(--color-primary)',
        'primary-soft': 'var(--color-primary-soft)',
        'primary-strong': 'var(--color-primary-strong)',
      }
    },
  },
  plugins: [],
}

