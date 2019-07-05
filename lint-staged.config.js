// https://github.com/okonet/lint-staged#configuration

module.exports = {
  // 'packages/**/src/**/*.{js,jsx}': ['prettier --write', 'git add'],
  // 'packages/**/src/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'git add'],
  // 'packages/**/src/**/*.{css}': ['prettier --write', 'stylelint --fix', 'git add'],
  // 'packages/**/src/**/*.{less}': ['prettier --write', 'stylelint --syntax less --fix', 'git add'],
  // 'packages/**/src/**/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss --fix', 'git add'],
  // 'packages/**/src/**/*.{json,md,html}': ['prettier --write', 'git add'],
  'yarn.lock': ['git rm --cached']
};
