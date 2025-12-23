const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', skillController.getSkills);
router.get('/search', skillController.searchSkills);
router.get('/filter', skillController.filterSkills);
router.get('/sort', skillController.sortSkills);
router.get('/:id', skillController.getSkillById);

// Protected
router.post('/', authMiddleware, skillController.createSkill);
router.put('/:id', authMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillController.deleteSkill);

// Comments on skills
router.post('/:id/comment', authMiddleware, commentController.postComment);
router.get('/:id/comments', commentController.getCommentsForSkill);

module.exports = router;
