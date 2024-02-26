// webpack.config.js
const path = require('./node_modules/stream-browserify');

module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify")
    }
  }
  
  
};
