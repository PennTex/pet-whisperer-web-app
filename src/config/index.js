import * as base from './base';
import * as development from './development';
import * as production from './production';

var config = {
  development,
  production
};

var env = process.env.APP_ENV || 'development';
console.log('Environment: ', env);

module.exports = Object.assign({}, base, config[env]);
