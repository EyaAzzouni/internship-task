/* const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',

    entry: {
        main: './src/main.ts',
        polyfills: './src/polyfills.ts',
        styles: './src/styles.css'
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
    },

      module: {
        rules: [
          // process the TypeScript files and detects any templates and stylesheets in Component decorators
          {
            test: /\.ts$/,
            use: '@ngtools/webpack'
          },
          // extract source maps
          {
            test: /\.js$/,
            exclude: /(ngfactory|ngstyle).js$/,
            enforce: 'pre',
            use: 'source-map-loader'
          },
          // Process component templates
          {
            test: /\.html$/,
            use: 'raw-loader'
          },
          // Process component stylesheets
          {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader'],
            exclude: [resolve('./src/styles.css')]
          },
          // Process the global stylesheet
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            include: [resolve('./src/styles.css')]
          },
          // Process file assets that are encountered and ensure the url is correct when moved to output folder
          {
            test: /\.(eot|svg|cur)$/,
            loader: 'file-loader',
            options: {
              name: `[name].[ext]`,
              limit: 10000
            }
          },
          // Inline small assets in base64 form - assets too large will be processed by the file-loader
          {
            test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
            loader: 'url-loader',
            options: {
              name: `[name].[ext]`,
              limit: 10000
            }
          },
          // This hides some deprecation warnings that Webpack throws
          {
            test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
            parser: { system: true },
          }
        ],
        plugins: [
            new IndexHtmlWebpackPlugin({
                input: './src/index.html',
                output: 'index.html',
                entrypoints: [
                  'styles',
                  'polyfills',
                  'main'
                ]
              }),

              new AngularCompilerPlugin({
                mainPath: resolve('./src/main.ts'),
                sourceMap: true,
                nameLazyFiles: true,
                tsConfigPath: resolve('./src/tsconfig.app.json'),
                skipCodeGeneration: true
              }),

              new SuppressExtractedTextChunksWebpackPlugin(),
              new ProgressPlugin(),
              new CircularDependencyPlugin({ exclude: /[\\\/]node_modules[\\\/]/ }),
              new CopyWebpackPlugin([
                {
                  from: 'src/assets',
                  to: 'assets'
                },
                {
                  from: 'src/favicon.ico'
                }
              ])

        ]
      }
}*/