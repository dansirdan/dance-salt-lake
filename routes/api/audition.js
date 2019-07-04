const router = require("express").Router();
const auditionController = require("../../controllers/auditionController");

router.route("/")
  .get(auditionController.findAll)
  .post(auditionController.create)

router.route("/:id")
  .get(auditionController.findOne)
  .put(auditionController.update)
  .delete(auditionController.delete)

module.exports = router;
