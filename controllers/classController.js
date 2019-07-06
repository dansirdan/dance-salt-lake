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
  // ============= Find By ===============
  // ============ Un-Tested ==============
  findByDate: function (req, res) {
    db.Class
      .findAll({ where: { date: req.params.date } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByInstructor: function (req, res) {
    db.Class
      .findAll({ where: { instructor: req.params.instructor } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByLevel: function (req, res) {
    db.Class
      .findAll({ where: { level: req.params.level } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByMaster: function (req, res) {
    db.Class
      .findAll({ where: { master: req.params.master } })
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

