var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
    path                = require('path'),
    webpack             = require('webpack')

var config = {

  entry: {
    vendor: [
      'jquery',
      'bootstrap'
    ],
    app: './app/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/js')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/bower_components/],
        query: {
          presets : ['es2015', 'stage-0'],
          //plugins : ["transform-runtime","transform-class-properties"]
        }
      },
      { test: /\.json$/, loader: 'json-loader' },

      // jQuery
      { test: /jquery\.js$/, loader: 'expose?$' },
      { test: /jquery\.js$/, loader: 'expose?jQuery' },

      // Bootstrap
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },

  node: {
    fs: 'empty'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.hbs', '.js', '.json'],
    modulesDirectories: ['bower_components', 'node_modules'],
    alias: {
      'jquery': path.join(__dirname, './bower_components/jquery/dist/jquery.min.js'),
      'bootstrap': path.join(__dirname, './bower_components/bootstrap/dist/js/bootstrap.min.js'),
    }
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    /*new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    })*/
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

if(process.env.NODE_ENV == 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin(
  {
    compress : {
      warnings : false
    },
    output : {
      comments : false,
      semicolons : true
    }
  }))
}

module.exports = config
