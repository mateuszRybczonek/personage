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

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          ...options.compilerOptions,
          modules: [{
            preTransformNode(astEl) {
              if (process.env.NODE_ENV === 'production' && !process.env.CYPRESS_ENV) {
                const { attrsMap, attrsList } = astEl;
                if (attrsMap['data-test']) {
                  delete attrsMap['data-test'];
                  const index = attrsList.findIndex(x => x.name === 'data-test');
                  attrsList.splice(index, 1);
                }
              }
              return astEl;
            },
          }],
        },
      }));
  },
};
