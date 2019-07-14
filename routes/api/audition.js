const router = require("express").Router();
const auditionController = require("../../controllers/auditionController");

router.route("/")
  .get(auditionController.findAll)
  .post(auditionController.create)

router.route("/:id")
  .get(auditionController.findOne)
  .put(auditionController.update)
  .delete(auditionController.delete)

router.route("/filter/")
  .get(auditionController.findAllWhere)

// router.route("/date/:date")
//   .get(auditionController.findByDate)

// router.route("/gender/:gender")
//   .get(auditionController.findByGender)

// router.route("/style/:style")
//   .get(auditionController.findByStyle)

// router.route("/location/:location")
//   .get(auditionController.findByLocation)


module.exports = router;
