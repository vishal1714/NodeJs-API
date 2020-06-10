var app = require("./app");

var Port = process.env.PORT || 8081;
// Web server start
app.listen(Port, () => {
  console.log("Web Server is started on Port => " + Port);
});
