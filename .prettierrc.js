module.exports = {
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
