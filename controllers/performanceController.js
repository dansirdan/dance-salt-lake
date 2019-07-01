const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Performance
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  read: function (req, res) {
    db.Performance
      .findAll({})
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Performance
      .update(req.body, { where: { id: req.params.id } }) 
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Performance
      .destroy({ where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
}
