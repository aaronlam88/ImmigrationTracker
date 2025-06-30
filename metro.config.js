const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for ES modules
config.resolver.sourceExts.push('cjs');

// Handle ES module dependencies
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

// Transform options for better compatibility
config.transformer.minifierConfig = {
  ...config.transformer.minifierConfig,
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Add resolver configuration for problematic modules
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Handle node_modules with ES modules
config.resolver.platforms = ['ios', 'android', 'web'];

module.exports = config; 