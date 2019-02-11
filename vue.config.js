const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    // https: true,
    port: 8080,
    open: true,
  },
  chainWebpack: () => {
    // const name = isProduction ? 'prod' : 'dev';

    // config
    //   .plugin('html')
    //   .tap((args) => {
    //     args[0].template = `./src/html/index.${name}.html`;
    //     return args;
    //   });

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin);
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );

      // config.externals = {
      //   vue: 'Vue',
      //   vuex: 'Vuex',
      //   'vue-router': 'VueRouter',
      // };
    } else {
      config.devtool = '#eval-source-map';
    }

    config.resolve = {
      extensions: ['.js', '.vue'],
      alias: {
        '@': path.resolve('src'),
      },
    };
  },
};
