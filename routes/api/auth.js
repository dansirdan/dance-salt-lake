const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("../../config/passport");

router.route("/login")
  .post(passport.authenticate("local"), authController.login)

router.route("/signup")
  .post(authController.signup)

router.route("/logout")
  .get(authController.logout)

router.route("/user")
  .get(authController.user)

module.exports = router;