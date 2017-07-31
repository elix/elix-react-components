let path = require('path');
let alias = {};
try {
  alias = require('./webpack.alias').alias;
}
catch(e) {}

module.exports = {

  entry: './demos/demos.jsx',

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
			}
    ]
  },

  output: {
    filename: 'demos.js',
    path: path.resolve(__dirname, 'build'),
    sourceMapFilename: 'demos.map'
  },
  
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    // Add alias below for preact builds
    alias: alias
  }

};
