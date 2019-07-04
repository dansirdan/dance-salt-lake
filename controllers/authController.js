const db = require("../models");

module.exports = {
  login: function (req, res) {
    res.json("/usershome");
  },
  signup: function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(function () {
      res.redirect(307, "/");
    })
    .catch(function (err) {
      res.json(err);
    });
  },
  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },
  user: function (req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  }
}
