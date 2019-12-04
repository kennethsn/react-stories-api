const fs = require('fs');

function getShallowDirs(path){
  return fs.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}


module.exports = {
  pagePerSection: true,
  sections: [
    {
      name: 'Live Demo',
      external: true,
      href: 'https://kennethsn.github.io/react-stories-api/'
    },

    // TODO: (#93) Add getting started section here

    {
      name: 'Main Components',
      // TODO: (#92) Add content md file
      components: 'src/Components/StoriesAPI/**/index.js',
      ignore: [
        '**/{constants,client,}.js',
        'src/Components/StoriesAPI/index.js',
      ]
    },

    {
      name: 'Moments',
      // TODO: (#92) Add content md file
      sectionDepth: 1,
      sections : getShallowDirs('src/Components/Moment').map(dir => (
        {
          name: dir,
          components: `src/Components/Moment/${dir}/**/*.js`,
          sectionDepth: 1,
          ignore: [
            '**/constants.js',
            'src/Components/Moment/index.js',
          ]
        }
      ))
    },

    {
      name: 'Core UI',
      // TODO: (#92) Add content md file
      components: 'src/Components/**/index.js',
      ignore: [
        '**/constants.js',
        'src/Components/Moment/**/*.js',
        'src/Components/StoriesAPI/**/*.js',
        'src/Components/index.js',
      ]
    },
   ],

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
