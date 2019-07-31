const router = require("express").Router();
const classController = require("../../controllers/classController");

router.route("/")
  .get(classController.findAll)
  .post(classController.updateOrCreate)

router.route("/:id")
  .get(classController.findOne)
  .put(classController.update)
  .delete(classController.delete)

router.route("/filter/")
  .post(classController.findAllWhere)

module.exports = router;