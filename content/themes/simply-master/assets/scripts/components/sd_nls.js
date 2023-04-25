const ghost = require('ghost');
const path = require('path');
const hbs = require('express-hbs');

const config = path.join(__dirname, 'config.js');
const coreHelpers = {};

coreHelpers.sd_nls = require('./sd_nls');

// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}

registerThemeHelper('sd_nls', coreHelpers.sd_nls);

ghost({ config: config })
    .then(ghostServer => ghostServer.start());