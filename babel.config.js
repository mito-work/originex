module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage", //必要なpolyfillのみimport
          corejs: 3,
        },
      ],
    ],
  };
};
