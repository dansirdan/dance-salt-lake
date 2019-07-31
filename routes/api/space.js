const router = require("express").Router();
const spaceController = require("../../controllers/spaceController");

router.route("/")
  .get(spaceController.findAll)
  .post(spaceController.updateOrCreate)

router.route("/:id")
  .get(spaceController.findOne)
  .put(spaceController.update)
  .delete(spaceController.delete)

router.route("/filter/")
  .post(spaceController.findAllWhere)

module.exports = router;