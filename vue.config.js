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
};
