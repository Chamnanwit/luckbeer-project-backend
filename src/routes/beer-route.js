const express = require("express");

const beerController = require("../controllers/beer-controller");
const authenticateAdmin = require("../middlewares/authenticate-admin");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/search", beerController.findBeer);
router.get("/:beerId", beerController.dataBeer);
router.post("/", authenticate, authenticateAdmin, beerController.addBeer);
router.post("/comment", authenticate, beerController.addCommentBeer);
router.patch("/comment/:commentId", authenticate, beerController.updateCommentBeer); // ต้องเป็นชื่อตัวเองถึงแก้ได้
router.delete("/comment/:commentId/admin", authenticate, authenticateAdmin, beerController.deleteCommentBeer); // โดย admin
router.delete("/comment/:commentId/user", authenticate, beerController.deleteCommentBeerByUser); // โดย user
router.post("/:beerid/like", beerController.toggleLike);
router.post("/image", authenticate, authenticateAdmin, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  beerController.uploadImage
);

module.exports = router;
