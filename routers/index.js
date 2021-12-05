const express = require("express");
const { checkPage } = require("../controllers/embassy.controller");

const router = express.Router();

router.get("/page", checkPage);

module.exports = router;
