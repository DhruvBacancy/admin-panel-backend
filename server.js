require('@babel/register')({
  presets: ['@babel/preset-env'],
});
require('babel-polyfill');
const app = require("./app")

app.listen(process.env.APP_PORT, () => {
  console.log("App Listening at:", process.env.APP_PORT)
})