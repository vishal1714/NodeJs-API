const express = require("express");
//const url = require('url');
const conn = require("../DB");
const bodyparser = require("body-parser");
const dateFormat = require("dateformat");

const router = express.Router();
router.use(bodyparser.json());

var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss TT");

// GET all City
router.get("/citys", (req, resp, next) => {
  conn.query("SELECT * FROM city", (err, result) => {
    if (err) {
      //console.log(err);
      next(new Error(err));
    } else {
      var Count = result.length;
      console.log(Count);
      resp.status(200).json({
        TotalCityCount: Count,
        Citys: result,
      });
    }
  });
});

// GET City by ID
router.get("/city/:id", (req, resp, next) => {
  conn.query(
    "SELECT * FROM city WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result[0] == null) {
        resp.status(404);
        next(new Error("City ID " + req.params.id + " Not Found"));
      } else {
        resp.json(result[0]);
      }
    }
  );
});

// GET City by CountryCode
router.get("/city", (req, resp, next) => {
  //const queryObject = url.parse(req.url,true).query;
  //var CC = queryObject.CountryCode;
  //let CC = JSON.stringify(req.query.CountryCode);
  var CC = req.query.CountryCode;
  var CN = req.query.CityName;
  var sql = "SELECT * FROM city WHERE CountryCode = ?";
  var sql1 = "SELECT * FROM city WHERE Name = ?";
  if (CC != null) {
    conn.query(sql, [CC], (err, result) => {
      if (err) {
        resp.send(JSON.stringify.err);
      } else if (result.length > 0) {
        var Count = result.length;
        console.log(Count);
        resp.status(200).json({
          CountryCode: CC,
          City_Count: Count,
          Time: day,
          Citys: result,
        });
      } else {
        next(
          new Error("Kindly Enter Correct CityName or CountryCode in URI 🔥")
        );
      }
    });
  } else if (CN != null) {
    conn.query(sql1, CN, (err, result) => {
      if (err) {
        next(new Error(err));
      } else if (result.length > 0) {
        resp.status(200);
        resp.json(result[0]);
      } else {
        next(
          new Error("Kindly Enter Correct CityName or CountryCode in URI 🔥")
        );
      }
    });
  } else {
    next(new Error("Kindly Enter Correct CityName or CountryCode in URI 🔥"));
  }
});

// Pots Add new City
router.post("/addcity", (req, resp, next) => {
  // Request Body in variables
  const addcity = {
    Name: req.body.Name,
    CountryCode: req.body.CountryCode,
    District: req.body.District,
    Population: req.body.Population,
  };
  // Variable for API Key Validation
  var reqKey = req.header("Key");
  var ValidKey = "Vishal1714";

  //Adding City Login
  if (reqKey == ValidKey) {
    conn.query("INSERT INTO city SET ?", [addcity], (err, result) => {
      //console.log(err);
      if (err) {
        resp.status(500).json({
          error: "Database Error , Contact Admin for more info ",
          Info: err,
        });
        console.log(day + "DB Error Post ==>" + JSON.stringify(err));
      } else {
        resp.status(200).json({
          Status: "S",
          Time: day,
          Inserted: addcity,
        });
        /* Without Database
            resp.status(200).json({
            message: "Successful",
            Insterted : addcity
            })*/
      }
    });
  } else {
    //If API Key is Invalid
    //next(new Error("Invalid API Key"));
    resp.status(401).json({
      Error: {
        message: "Invalid API Key",
      },
    });
  }
});

// Delete City by ID
router.delete("/city/:id", (req, resp, next) => {
  //API Key Validation varibale
  var reqKey = req.header("Key");
  var ValidKey = "Vishal1714";

  //Key Validation
  if (reqKey == ValidKey) {
    //Finding City ID is exist or not
    conn.query(
      "SELECT * FROM city WHERE id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          next(new Error(err));
        } else if (result[0] == null) {
          next(new Error("City ID " + req.params.id + " Not Found"));
        } else {
          //If City ID exist Delete City
          conn.query(
            "DELETE FROM city WHERE id = ?",
            [req.params.id],
            (err, result1) => {
              if (err) {
                console.log(err);
              } else {
                resp.status(200).json({
                  Status: "S",
                  Time: day,
                  Info: result[0],
                });
              }
            }
          );
        }
      }
    );
  } else {
    //If API Key is Invalid
    //next(new Error("Invalid API Key"));
    resp.status(401).json({
      Error: {
        message: "Invalid API Key",
      },
    });
  }
});

//Update City by ID using Request Body
router.patch("/city", (req, resp, next) => {
  var reqKey = req.header("Key");
  var ValidKey = "Vishal1714";
  const updateCity = {
    Name: req.body.Name,
    CountryCode: req.body.CountryCode,
    District: req.body.District,
    Population: req.body.Population,
  };
  var sqlq = "UPDATE city SET ? WHERE id = ?";
  //Key Validation
  if (reqKey == ValidKey) {
    conn.query(sqlq, [updateCity, req.body.ID], (err, result) => {
      if (err) {
        next(new Error(err));
      } else if (req.body.ID == null) {
        next(new Error("City ID not found in Request Body"));
      } else {
        resp.status(200).json({
          Status: "S",
          Time: day,
          ID: req.body.ID,
          Info: updateCity,
        });
      }
    });
  } else {
    //If API Key is Invalid
    //next(new Error("Invalid API Key"));
    resp.status(401).json({
      Error: {
        message: "Invalid API Key",
      },
    });
  }
});

module.exports = router;
