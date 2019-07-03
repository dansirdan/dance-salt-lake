const router = require("express").Router();
const auditionRoutes = require("./audition");
const classRoutes = require("./class");
const performanceRoutes = require("./performance");
const spaceRoutes = require("./space");
const authRoutes = require("./auth");

// Post routes
router.use("/auditions", auditionRoutes);
router.use("/classes", classRoutes);
router.use("/performances", performanceRoutes);
router.use("/space", spaceRoutes);
router.use("/auth", authRoutes);

module.exports = router;
