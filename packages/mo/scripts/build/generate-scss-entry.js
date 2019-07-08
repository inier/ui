const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const cwd = process.cwd();
const { logger } = require('@ozo/node-dev-utils');

module.exports = function() {
    const styleJsPaths = glob.sync(path.join(cwd, 'src', '*', 'style.js'));
    styleJsPaths.forEach((styleJsPath) => {
        const styleJSContent = fs.readFileSync(styleJsPath, 'utf8');
        const relativePaths = styleJSContent
            .split(/\n/g)
            .filter((_) => _)
            .map((line) => line.match(/import '(.+)';/)[1]);

        const indexScssContent = relativePaths
            .map((relativePath) => {
                const pathDir = path.dirname(relativePath);
                if (pathDir !== '.') {
                    relativePath = path.join(pathDir, 'index.scss');
                }
                return `@import "${relativePath}";\n`;
            })
            .join('');
        const componentName = path.basename(path.dirname(styleJsPath));
        fs.writeFileSync(path.join(cwd, 'lib', componentName, 'index.scss'), indexScssContent);
        fs.writeFileSync(path.join(cwd, 'es', componentName, 'index.scss'), indexScssContent);
    });

    logger.success('Generate index.scss successfully!');
};
