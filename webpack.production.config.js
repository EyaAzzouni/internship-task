/* const path = require('path');

module.exports = {
    mode:'production',
    devtool: 'source-map',

    entry: {
        main: './src/main.ts',
        polyfills: './src/polyfills.ts',
        styles: './src/styles.css'
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
    },

    optimization: {
  noEmitOnErrors: true,
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      default: {
        chunks: 'async',
        minChunks: 2,
        priority: 10
      },
      common: {
        name: 'common',
        chunks: 'async',
        minChunks: 2,
        enforce: true,
        priority: 5
      },
      vendors: false,
      vendor: false
    }
  },
  minimizer: [
    new HashedModuleIdsPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        safari10: true,
        output: {
          ascii_only: true,
          comments: false,
          webkit: true,
        },
        compress: {
          pure_getters: true,
          passes: 3,
          inline: 3,
        }
      }
    }),
    new CleanCssWebpackPlugin({
      sourceMap: true,
      test: (file) => /\.(?:css)$/.test(file),
    })
  ]
}

      module: {
        rules: [
            {
         test: /\.ts$/,
         use: '@ngtools/webpack'
     },
        {
            test: /\.js$/,
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: { sourceMap: true }
        },
        {
            test: /\.css$/,
             use: [MiniCssExtractPlugin.loader, 'css-loader'],
             include: [resolve('./src/styles.css')]
        }
        
        ],
        plugins: [
          new AngularCompilerPlugin({
          mainPath: resolve('./src/main.ts'),
          sourceMap: true,
          nameLazyFiles: false,
          tsConfigPath: resolve('./src/tsconfig.app.json'),
          skipCodeGeneration: false,
          hostReplacementPaths: {
          [resolve('src/environments/environment.ts')]: resolve('src/environments/environment.prod.ts')
  }
}),

             new MiniCssExtractPlugin({ filename: '[name].css' })

        ]
      }
}*/