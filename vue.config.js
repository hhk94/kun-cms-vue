const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
		  path.resolve(__dirname, './src/assets/styles/base.scss')
	  ]
    }
  }
}
