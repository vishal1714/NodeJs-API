const express = require("express");
//const url = require('url');
const bodyparser = require("body-parser");
const Controller = require("../Controller/Logic");

const router = express.Router();
router.use(bodyparser.json());

// GET all City
router.get("/citys", Controller.GET_AllCitys);

// GET City by ID
router.get("/city/:id", Controller.GET_CityByID);

// GET City using Query 1) CountryCode or 2) CityName
router.get("/city", Controller.GET_CityBy_CityName_CountryCode);

// Post Add new City
router.post("/addcity", Controller.POST_AddCity);

// Delete City by ID
router.delete("/city/:id", Controller.DEL_CityByID);

//Update City by ID using Request Body
router.patch("/city", Controller.PATCH_UpdateCityByID);

module.exports = router;

router.get("/pillu", (req, resp, next) => {
  resp.json({
    "Message to my Yedu": "Love U so Much Pillu 💑",
  });
});