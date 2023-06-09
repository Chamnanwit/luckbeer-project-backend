const express = require("express");

const breweryController = require("../controllers/brewery-controller");
const authenticateAdmin = require("../middlewares/authenticate-admin");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.get("/:breweryId", breweryController.dataBrewery);
router.post("/", authenticate, authenticateAdmin, breweryController.addBrewery);

module.exports = router;
