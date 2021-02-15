const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/api/token", auth, userCtrl.signup);
router.post("/api/justify", auth, userCtrl.justify);

module.exports = routes;
