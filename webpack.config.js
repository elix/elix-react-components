var path = require('path');

module.exports = {

  entry: './src/app.jsx',

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
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: 'app.map'
  },
  
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  }

};
