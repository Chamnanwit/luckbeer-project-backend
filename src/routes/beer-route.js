const express = require("express");

const beerController = require("../controllers/beer-controller");
const authenticateAdmin = require("../middlewares/authenticate-admin");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/search", beerController.findBeer);
router.get("/:beerId", beerController.dataBeer);
router.get("/", beerController.getAllBeer);
router.post("/", authenticate, authenticateAdmin, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]), beerController.addBeer);

router.get("/:beerId/comment", beerController.getCommentBeer);
router.post("/:beerId/comment", authenticate, beerController.addCommentBeer);
router.patch("/:beerId/comment/:commentId", authenticate, beerController.updateCommentBeer); // ต้องเป็นชื่อตัวเองถึงแก้ได้
router.delete("/:beerId/comment/:commentId/admin", authenticate, authenticateAdmin, beerController.deleteCommentBeer); // โดย admin
router.delete("/:beerId/comment/:commentId/user", authenticate, beerController.deleteCommentBeerByUser); // โดย user

router.post("/:beerid/like", beerController.toggleLike); // ตัด-----------------------

module.exports = router;
