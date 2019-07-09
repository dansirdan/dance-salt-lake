const router = require("express").Router();
const performanceController = require("../../controllers/performanceController");

router.route("/")
  .get(performanceController.findAll)
  .post(performanceController.create)

router.route("/:id")
  .get(performanceController.findOne)
  .put(performanceController.update)
  .delete(performanceController.delete)

router.route("/date/:date")
  .get(performanceController.findByDate)

module.exports = router;