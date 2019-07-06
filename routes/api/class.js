const router = require("express").Router();
const classController = require("../../controllers/classController");

router.route("/")
  .get(classController.findAll)
  .post(classController.create)

router.route("/:id")
  .get(classController.findOne)
  .put(classController.update)
  .delete(classController.delete)

router.route("/date/:date")
  .get(classController.findByDate)

router.route("/instructor/:instructor")
  .get(classController.findByInstructor)

router.route("/level/:level")
  .get(classController.findByLevel)

router.route("/master/:master")
  .get(classController.findByMaster)

module.exports = router;