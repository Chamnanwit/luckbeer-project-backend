const express = require("express");

const beerController = require("../controllers/beer-controller");

const router = express.Router();

// router.get("/:beerId", beerController.dataBeer);
// router.post("/", beerController.addBeer);
// router.post("/comment", beerController.commentBeer)

module.exports = router;
