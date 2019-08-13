const db = require("../models");

module.exports = {
  login: function (req, res) {
    res.json("this was successful")
  },
  signup: function (req, res) {
    db.User.create(req.body)
      .then(function () {
        res.json("this was successful");
      })
      .catch(function (err) {
        res.json(err);
      });
  },
  logout: function (req, res) {
    req.logout();
  },
  // whatever we need from the user's DB we can get it from here:
  user: function (req, res) {
    if (!req.user) {
      res.json({});
      console.log("No User")
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
        logo: req.user.logo,
        website: req.user.website,
        address: req.user.address,
        city: req.user.city,
        state: req.user.state,
        zip: req.user.zip
      });
    }
  }
}
