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
        primary: {
          '50': '#eafff5',
          '100': '#cdfee4',
          '200': '#a0fad0',
          '300': '#63f2b7',
          '400': '#25e29a',
          '500': '#00b979',
          '600': '#00a46c',
          '700': '#00835a',
          '800': '#006748',
          '900': '#00553d',
          '950': '#003023',
        },
        brand: {
          twitter: '#1da1f2',
          mastodon: '#6364FF',
          misskey: '#94ca16',
        },
        var: 'var(--color)',
      },
    },
  },
} satisfies Config
