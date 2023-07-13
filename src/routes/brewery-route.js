const express = require("express");

const breweryController = require("../controllers/brewery-controller");
const authenticateAdmin = require("../middlewares/authenticate-admin");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/search", breweryController.findBrewery);
router.get("/:breweryId", breweryController.dataBrewery);
router.get("/", breweryController.getAllBrewery);
router.post(
  "/",
  authenticate,
  authenticateAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),

  breweryController.addBrewery
);

module.exports = router;
