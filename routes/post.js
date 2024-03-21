const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../Controllers/post");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", createPost);
router.get("/post/:id", getPostById);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
