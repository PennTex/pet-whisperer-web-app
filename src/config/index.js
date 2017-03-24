var env = process.env.APP_ENV || 'development';

var config = {
  development: require('./development.js'),
  production: require('./production.js')
};

module.exports = config[env];