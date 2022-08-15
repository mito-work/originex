const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const globule = require("globule");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//====================
//html複数ページの対応
//====================
const templates = [];
const documents = globule.find("./src/html/**/*.html");

documents.forEach((document) => {
  const fileName = document.replace("./src/html/", "");
  templates.push(
    new HtmlWebpackPlugin({
      filename: fileName,
      template: document, //コンパイル対象
      inject: "head", //エントリーポイントのファイルを埋め込む
      minify: false, //ファイルの圧縮
    })
  );
});
module.exports = {
  // mode: "development",  //開発用本番ではproduction
  entry: {
    main: "./src/assets/js/main.js",
    // main: "./src/assets/ts/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "./assets/js/[name].bandle.js",
  },
  // devtool: "source-map", //開発用
  //watch: true, //開発用
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          //"style-loader",
          MiniCssExtractPlugin.loader, //cssファイルを分離
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
          "import-glob-loader",
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { sources: false }, //画像をバンドルするかしないか
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./assets/css/common.css", //出力ファイル名
    }),
    ...templates, //スプレット構文
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/img", //コピー元
          to: "assets/img", //コピー先(output pathが基準)
          noErrorOnMissing: true, //コピー元ファイルがなくてもエラーにしない
        },
        {
          from: "src/.htaccess",
          noErrorOnMissing: true,
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "95-100",
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256,
      },
      svgo: {},
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)$/i,
          options: {
            quality: 75,
          },
        },
      ],
      detailedLogs: true,
      overrideExtension: false, //拡張子の変換は行わない(jpegもwebpも両方)
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["public"] },
      // online: true,
      // option: "external",
    }),
  ],
};
