const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  './src/index.js',
    output: {
        path:  __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx','css']
    },
    externals: ['axios'],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },

            {
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader?name=img/img-[hash:6].[ext]"
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  alias: {
                    "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
                  }
                }
              },
              {
                loader: "sass-loader",
                options: {
                  includePaths: [
                    path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                  ]
                }
              }
            ]
          },
          {
                  test: /\.(jpg|jpeg|png)(\?.*)?$/, // Load only .jpg .jpeg, and .png files
                  use: {
                    loader: 'file-loader',
                    options: {
                      name: '[name][md5:hash].[ext]', // Name of bundled asset
                      outputPath: 'assets/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
                      publicPath: '/assets/' // Endpoint asset can be found at on Rails server
                    }
                  }
                }


        ]
    },
   //
  //   devServer: {
  //     historyApiFallback: true,
  //
  //  },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body'
    })]
}
