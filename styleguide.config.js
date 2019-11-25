module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      }
      ]
    }
  },
  template: {
       head: {
           links: [
               {
                   rel: 'stylesheet',
                   href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600'
               }
           ]
       }
   },
   theme: {
       fontFamily: {
           base: '"Montserrat", sans-serif',
           fontSize: '62.5%'
       }
   }
}
