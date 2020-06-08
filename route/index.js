const express = require("express");
//const url = require('url');
const conn = require("../DB");
const bodyparser = require("body-parser");
var dateFormat = require("dateformat");

const router = express.Router();
router.use(bodyparser.json());

var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss TT");

// GET all City
router.get("/citys", (req, resp, next) => {
  conn.query("SELECT * FROM city", (err, result) => {
    if (err) {
      console.log(err);
      next(new Error(err));
    } else {
      var Count = result.length;
      console.log(Count);
      resp.status(200).json({
        TotalCityCount: Count,
        Citys: result,
      });
	//resp.send(JSON.stringify(result));
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
    conn.query(sql1, [CN], (err, result) => {
      if (err) {
        resp.send(JSON.stringify.err);
      } else if (result.length > 0) {
        resp.status(200);
        resp.json(result[0]);
      } else {
        next(
          new Error("Kindly Enter Correct CityName or CountryCode in URI 🔥")
        );
      }
    });
  }
});

// Pots Add new City
router.post("/addcity", (req, resp, next) => {
  const addcity = {
    Name: req.body.Name,
    CountryCode: req.body.CountryCode,
    District: req.body.District,
    Population: req.body.Population,
  };
  var apikey = req.query.APIKey;
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
});

// Delete City by ID
router.delete("/city/:id", (req, resp) => {
  conn.query(
    "DELETE FROM city WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        resp.status(400).json({
          error: "Id not found",
          Details: err,
        });
      } else {
        resp.status(200).json({
          ID: req.params.id,
          Status: "S",
          Time: day,
          Details: "City Entry has been deleted.",
        });
      }
    }
  );
});


router.get("/pillu", (req, resp, next) => {
  resp.json({
    "Message to my Yedu": "Love U so Much Pillu 💑",
  });
});

module.exports = router;

