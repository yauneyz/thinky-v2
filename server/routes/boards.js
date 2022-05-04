const express = require("express");
const BoardsController = require("../controllers/BoardsController");

const router = express.Router();

router.get("/", BoardsController.getBoards);
router.post("/", BoardsController.updateBoards);

module.exports = router;
