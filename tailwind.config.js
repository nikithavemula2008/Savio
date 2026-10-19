/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        savio: {
          indigo: '#4F46F5',
          indigoDark: '#4338CA',
          indigoLight: '#EEF2FF',
          emerald: '#059669',
          emeraldDark: '#047857',
          emeraldLight: '#ECFDF5',
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          rose: '#EF4444',
          roseLight: '#FEE2E2',
          purple: '#8B5CF6',
          purpleLight: '#F5F3FF',
          bgLight: '#F8FAFC',
          bgDark: '#0B0F19',
          cardDark: '#111827',
          cardBorderDark: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 25px -5px rgba(79, 70, 245, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'glow-indigo': '0 0 20px -3px rgba(79, 70, 245, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(5, 150, 105, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
