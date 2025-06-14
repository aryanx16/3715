const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions } = require('../controllers/questioncontroller');
const { protect } = require('../middleware/authmiddleware');

router.post('/', protect, addQuestion);
router.get('/', protect, getQuestions);

module.exports = router;
