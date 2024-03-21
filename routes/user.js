const express = require("express");
const {
  createUser,
  getUser,
  deleteUser,
  loginUser,
  verifyToken,
} = require("../Controllers/user");
const router = express.Router();

router.post("/username", createUser);

router.delete("/:userID", deleteUser);
router.post("/login", loginUser);
router.get("/:userID", verifyToken, getUser);

module.exports = router;
