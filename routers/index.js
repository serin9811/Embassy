var express = require("express");
var router = express.Router();
var embassyController = require("../controllers/embassy.controller");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/page", embassyController.checkPage);

module.exports = router;
