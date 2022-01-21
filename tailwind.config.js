module.exports = {
  content: ['./public/index.html', './src/**/*.{svelte,ts}'],
  theme: {
    screens: {
      sm: { max: '559px' },
      md: '560px',
      lg: '1000px',
    },
    extend: {
      colors: {
        keycolor: '#00b979',
        twitter: '#1da1f2',
      },
    },
  },
};
