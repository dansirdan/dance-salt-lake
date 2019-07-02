const db = require("../models");
const passport = require("../config/passport");
const controllers = require("../controllers");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/usershome");
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/auditions", controllers.audition.create);
  app.get("/api/auditions", controllers.audition.findAll);
  app.get("/api/auditions/:id", controllers.audition.findOne);

  app.post("/api/classes", controllers.klass.create);
  app.get("/api/classes", controllers.klass.findAll);
  app.get("/api/classes/:id", controllers.klass.findOne);

  app.post("/api/performances", controllers.performance.create);
  app.get("/api/performances", controllers.performance.findAll);
  app.get("/api/performances/:id", controllers.performance.findOne);

  app.post("/api/space", controllers.space.create);
  app.get("/api/space", controllers.space.findAll);
  app.get("/api/space/:id", controllers.space.findOne);
};