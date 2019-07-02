// https://github.com/okonet/lint-staged#configuration

module.exports = {
  'packages/**/*.{js,jsx}': ['prettier --write', 'git add'],
  'packages/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'git add'],
  'packages/**/*.{css}': ['prettier --write', 'stylelint --fix', 'git add'],
  'packages/**/*.{less}': ['prettier --write', 'stylelint --syntax less --fix', 'git add'],
  'packages/**/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss --fix', 'git add'],
  'packages/**/*.{json,md,html}': ['prettier --write', 'git add'],
  'yarn.lock': ['git rm --cached']
};
