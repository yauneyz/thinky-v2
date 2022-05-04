const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.get("/user", AuthController.user);

module.exports = router;
