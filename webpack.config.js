const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./source/js/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `build`),
    watchContentBase: true
  },
  module: {
    rules: [{test: /\.(png|jpe?g|gif|svg|ico|mp3|ogg|mp4|webm)$/,
            loader: 'file-loader',
            options: {name: 'media/[name].[ext]'}},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.html$/, loader: 'html-loader',
              options: {minimize: true, attrs: 'img:src link:href source:src'} }
    ]
  }
};
