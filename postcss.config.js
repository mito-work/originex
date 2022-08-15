module.exports = {
  plugins: [
    require("autoprefixer")({
      grid: true, //IE11対応
    }),
    require("css-declaration-sorter")({
      order: "smacss",
    }),
    require("css-mqpacker")({
      sort: true, //モバイルファースト順
    }),
  ],
};
