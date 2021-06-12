const express = require('express');
const BoardsController = require('../controllers/BoardsController');

const router = express.Router();

router.get('/', BoardsController.getBoards);
router.put('/', BoardsController.updateBoards);

module.exports = router;
