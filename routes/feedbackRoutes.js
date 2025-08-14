const express = require('express');
const { addFeedback, getFeedbacks, deleteFeedback } = require('../controllers/feedbackController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', addFeedback);
router.get('/', auth("admin"), getFeedbacks);
router.delete('/:id', auth("admin"), deleteFeedback);

module.exports = router;