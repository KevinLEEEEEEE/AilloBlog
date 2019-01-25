const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
  },
  chainWebpack: (config) => {
    const name = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

    config
      .plugin('html')
      .tap((args) => {
        args[0].template = `./src/html/index.${name}.html`;
        return args;
      });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );

      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
      };
    }
  },
};
