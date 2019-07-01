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
  // TODO: research how to write queries for user filters
  // find one
/* find by:
  * date
  * instructor
  * level
  * master class
  */
  
  
  // ============= Un-tested =============
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

