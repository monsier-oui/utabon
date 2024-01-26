import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: 0,
      },
    },
    screens: {
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      lg: defaultTheme.screens.lg,
    },
    extend: {
      colors: {
        keycolor: '#00b979',
        twitter: '#1da1f2',
      },
    },
  },
} satisfies Config
