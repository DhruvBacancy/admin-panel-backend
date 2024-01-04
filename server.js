const app = require("./app")

app.listen(process.env.APP_PORT, () => {
  console.log("App Listening at:", process.env.APP_PORT)
})
