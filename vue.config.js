module.exports = {
  lintOnSave: false,
  css: {
    modules: true,
    loaderOptions: {
      sass: {
        data: `
          @import "~@/styles/variables/index.scss";
          @import "~@/styles/mixins.scss";
        `,
      },
    },
  },

  devServer: {
    disableHostCheck: true,
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete('workbox');

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeViewBox: false },
            { convertShapeToPath: false },
          ],
        },
      });
  },
};
