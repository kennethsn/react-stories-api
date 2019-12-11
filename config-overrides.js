/* config-overrides.js */

module.exports = function override(config, env) {
  config.module.noParse = /mapbox-gl/;
  //do stuff with the webpack config...
  return config;
}
