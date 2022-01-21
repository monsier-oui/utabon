module.exports = {
  '*.{js,jsx,ts,tsx,svelte}': ['prettier --write', 'eslint --fix'],
  '!(*-lock).{json,md}': ['prettier --write'],
};
