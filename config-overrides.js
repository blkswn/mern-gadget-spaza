const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfill fallback for missing modules
  config.resolve.fallback = {
    zlib: require.resolve('browserify-zlib'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
  };

  // Provide process global variable
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
