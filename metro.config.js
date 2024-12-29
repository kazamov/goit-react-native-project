const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('js', 'json', 'cjs', 'ts', 'tsx');

module.exports = defaultConfig;
