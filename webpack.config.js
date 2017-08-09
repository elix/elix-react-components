let path = require('path');

module.exports = [{

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
  }

},
{
  entry: './test/tests.jsx',

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
    filename: 'tests.js',
    path: path.resolve(__dirname, 'build'),
    sourceMapFilename: 'tests.map'
  },
  
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
  
}];
