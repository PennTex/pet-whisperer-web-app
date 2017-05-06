const appRoot = 'src/';
const outputRoot = 'dist/';

module.exports = {
  all: [appRoot + "**/*.js", appRoot + "**/*.html"],
	root: appRoot,
	html: [
		appRoot + "**/*.html"
	],
	images: [
		appRoot + "**/*.png"
	],
  app: appRoot + "index.js",
  output: outputRoot
}