module.exports = function override(config, env) {
  if (config.resolve.fallback) {
    config.resolve.fallback.util = require.resolve("util/");
  } else {
    config.resolve.fallback = {
      util: require.resolve("util/"),
    };
  }
  return config;
};
