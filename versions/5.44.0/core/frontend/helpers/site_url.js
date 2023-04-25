const { localhost } = require('../services/handlebars');

// We use the name twitter_url to match the helper for consistency:
module.exports = function site_url(host, options) { // eslint-disable-line camelcase
    if (!options) {
        options = host;
        host = localhost.findKey('twitter', this, options.data.site);
    }

    return host?.substring(1) || "";
};