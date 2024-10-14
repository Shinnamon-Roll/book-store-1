const path = require('path');

module.exports = {
  entry: './src/app.jsx', // Your main JS file
  output: {
    path: path.resolve(__dirname, 'public'), // Where to output the bundled file
    filename: 'bundle.js' // Name of the output file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Files to be transformed
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JS/JSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for transforming ES6+ and React
          }
        }
      },
      {
        test: /\.css$/, // CSS files
        use: ['style-loader', 'css-loader'] // Loaders for CSS
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Extensions to resolve
  },
  devtool: 'source-map', // Enable source maps for easier debugging
  mode: 'development' // Set the mode (development or production)
};
