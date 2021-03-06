const router = require("express").Router();
const performanceController = require("../../controllers/performanceController");

router.route("/")
  .get(performanceController.findAll)
  .post(performanceController.updateOrCreate)

router.route("/:id")
  .get(performanceController.findOne)
  .put(performanceController.update)
  .delete(performanceController.delete)

router.route("/filter/")
  .post(performanceController.findAllWhere)

module.exports = router;