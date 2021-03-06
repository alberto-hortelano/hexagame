const path = require('path');

module.exports = {
	entry: './src/client/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			core: path.resolve(__dirname, 'src/common/core/'),
			lib: path.resolve(__dirname, 'src/common/lib/'),
			components: path.resolve(__dirname, 'src/client/react/components/'),
		}
	},
	output: {
		filename: 'client.js',
		path: path.resolve(__dirname, 'public')
	},
	context: __dirname, //set the context of the app to be the project directory
	node: {
		__dirname: true, //Allow use of __dirname in modules, based on context
		__filename: true
	},
	stats: 'normal',
	target: 'web',
	mode: 'development',
	watch: true
};
