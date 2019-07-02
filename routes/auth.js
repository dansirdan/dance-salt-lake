const router = require("express").Router();
const passport = require("../config/passport");
const authController = require("../controllers/authController");

router.route("/login")
  .post(authController.login)

router.route("/signup")
  .post(authController.signup)

router.route("/logout")
  .get(authController.logout)

router.route("/user_data")
  .get(authController.user)

