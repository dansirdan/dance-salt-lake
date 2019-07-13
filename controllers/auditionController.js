const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Audition
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Audition
      .findAll({})
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // ============= Find By ===============
  // ============ Un-Tested ==============
  findByDate: function (req, res) {   
    db.Audition
      .findAll({ where: req.params })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByGender: function (req, res) {
    db.Audition
      .findAll({ where: { gender: req.params.gender } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByStyle: function (req, res) {
    db.Audition
      .findAll({ where: { style: req.params.style } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByLocation: function (req, res) {
    db.Audition
      .findAll({ where: { adress: req.params.address } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByGig: function (req, res) {
    db.Audition
      .findAll({ where: { gig: req.params.gig } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },

  // ============= Un-tested =============
  findOne: function (req, res) {
    db.Audition
      .findOne({ where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Audition
      .update(req.body, { where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Audition
      .destroy({ where: { id: req.params.id } })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
}
