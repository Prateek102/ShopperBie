const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");
const router = express.Router();

//base path for user as it is already added in base path
router.get("/:id", fetchUserById).patch("/:id", updateUser);
exports.router = router;
