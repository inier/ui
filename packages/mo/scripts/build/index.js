const co = require('co');
const fs = require('fs-extra');
const path = require('path');
const initOptions = require('../init-options');
const transform = require('./transform');
const generateScssEntry = require('./generate-scss-entry');

const { logger } = require('@ozo/node-dev-utils');

function run() {
    const options = initOptions();

    logger.info('> transform es6 to es5...');
    transform();

    logger.info('> generate scss entry...');
    generateScssEntry(); 

    const cwd = process.cwd();
    const libPath = path.join(cwd, 'lib');
    const esPath = path.join(cwd, 'es');

    fs.removeSync(path.join(libPath, 'demo-helper'));
    fs.removeSync(path.join(esPath, 'demo-helper'));

    logger.success('Run build successfully!');
}

co(run).catch(err => {
    logger.error(err);
});