var env = process.env.APP_ENV || 'development';

console.log('Environment: ', env);

var config = {
  development: require('./development.js'),
  production: require('./production.js')
};

module.exports = config[env];