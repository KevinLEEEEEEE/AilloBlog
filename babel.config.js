const isProduction = process.env.NODE_ENV === 'production';
const removeConsolePlugin = [];

if (isProduction) {
  removeConsolePlugin.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
    removeConsolePlugin,
  ],
};
