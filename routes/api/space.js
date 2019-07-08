const router = require("express").Router();
const spaceController = require("../../controllers/spaceController");

router.route("/")
  .get(spaceController.findAll)
  .post(spaceController.create)

router.route("/:id")
  .get(spaceController.findOne)
  .put(spaceController.update)
  .delete(spaceController.delete)

module.exports = router;