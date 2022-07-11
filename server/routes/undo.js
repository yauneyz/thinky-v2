const express = require("express");
const UndoController = require("../controllers/UndoController");

const router = express.Router();

router.post("/deleteTab", UndoController.deleteTab);
router.post("/undoDeleteTab", UndoController.undoDeleteTab);
router.get("/getDeletedTabs", UndoController.getDeletedTabs);
router.post("/deleteAxis", UndoController.deleteAxis);
router.post("/undoDeleteAxis", UndoController.undoDeleteAxis);
router.get("/getDeletedAxes", UndoController.getDeletedAxes);

module.exports = router;
