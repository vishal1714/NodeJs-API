var app = require("./app");

var Port = process.env.PORT || 5002;
// Web server start
app.listen(Port, () => {
  console.log("Web Server is started on Port => " + Port);
});
