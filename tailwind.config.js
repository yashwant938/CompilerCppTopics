/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        panel: '#111827',
        card: '#1f2937',
        accent: '#22d3ee',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 211, 238, 0.18)'
      }
    }
  },
  plugins: []
}
