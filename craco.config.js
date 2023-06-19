const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        implementation: require('sass'),
        webpackImporter: false,
        additionalData: `
          @import "src/assets/scss/variables";
          @import "src/assets/scss/mixins";
          @import "src/assets/scss/colors";
          @import "src/assets/scss/fonts";
        `,
      },
    },
  },
};
