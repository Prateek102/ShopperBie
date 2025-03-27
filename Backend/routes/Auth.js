const express = require("express");
const passport = require("passport");
const { createUser, loginUser, checkUser } = require("../controller/Auth");
const router = express.Router();

//auth is already added in base path
router
  .post("/signup", createUser)
  //passport.authenticate(strategy name i.e. local)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);
exports.router = router;
