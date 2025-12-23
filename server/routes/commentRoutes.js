const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Delete a comment by id (only comment owner or skill owner)
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;