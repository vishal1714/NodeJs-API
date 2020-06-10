const express = require("express");
//const url = require('url');
const route = require("./Route");
const morgon = require("morgan");

const app = express();

//app.use(express.json());
app.use(morgon("dev"));
app.use("/api", route);

/*   Headear Concept x
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Headers", "*");
  resp.header("Access-Control-Allow-Origin", "*");
  resp.removeHeader("X-Powered-By", "*");
  req.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});*/

// Error handaling 🔥
app.use((req, resp, next) => {
  var error = new Error("Not Found ⛔ ");
  error.status = 404;
  next(error);
});

app.use((error, req, resp, next) => {
  resp.status(error.status || 500);
  resp.json({
    Error: {
      message: error.message,
    },
  });
});

module.exports = app;