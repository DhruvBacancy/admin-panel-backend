require('@babel/register')({
  presets: ['@babel/preset-env'],
});
require('babel-polyfill');
const app = require("./app")