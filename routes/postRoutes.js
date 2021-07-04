const express = require("express");
const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, postController.findAllPosts)
  .post(protect, postController.createOnePost);
  
router
  .route("/:id")
  .get(protect, postController.findOnePost)
  .patch(protect, postController.updateOnePost)
  .delete(protect, postController.deleteOnePost);

module.exports = router;
