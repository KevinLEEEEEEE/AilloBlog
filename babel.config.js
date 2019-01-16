const isProduction = process.env.NODE_ENV === 'production';

const config = {
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
  ],
};

if (isProduction) {
  config.plugins.push('transform-remove-console');
}

module.exports = config;
