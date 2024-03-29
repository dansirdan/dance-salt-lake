const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Performance
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Performance
      .findAll({})
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findAllWhere: function(req, res) {
    db.Performance
      .findAll({ where: req.query })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  updateOrCreate: function (req, res) {

    if (req.body.id) {

      db.Performance
        .findOne({ where: { id: req.body.id } })
        .then(data => data.update(req.body))
        .catch(err => res.status(422).json(err));
    } else {

      db.Performance
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
  },
  // ============= Un-tested =============
  findOne: function (req, res) {
    db.Performance
      .findOne({ where: { id: req.params.id }})
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
