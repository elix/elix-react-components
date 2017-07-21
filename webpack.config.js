var path = require('path');

module.exports = {

  entry: './demos/demos.jsx',

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
    ]
  },

  output: {
    filename: 'demos.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: 'demos.map'
  },
  
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  }

};
