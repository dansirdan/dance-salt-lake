const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Class
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Class
      .findAll({})
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findAllWhere: function (req, res) {
    console.log(req.query);

    db.Class
      .findAll({ where: req.query })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },

  // ============= Un-tested =============
  findOne: function (req, res) {
    db.Class
      .findOne({ where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Class
      .update(req.body, { where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Class
      .destroy({ where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
}

