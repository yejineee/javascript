module.exports = {
  targets: {
    chrome: '58',
    ie: '11',
  },
  presets: [
    ['@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.18',
      },
    ],
  ],
};
