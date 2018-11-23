// eslint-disable-next-line import/no-extraneous-dependencies
const vueJest = require('vue-jest/lib/template-compiler');

module.exports = {
  process(src) {
    const { render } = vueJest({
      content: src,
      attrs: {
        functional: false,
      },
    });

    return `module.exports = { render: ${render} }`;
  },
};
