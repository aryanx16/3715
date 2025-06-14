const Question = require('../models/Question');

const addQuestion = async (req, res) => {
  const { title, difficulty, link, dateSolved } = req.body;
  const question = new Question({
    user: req.user._id,
    title,
    difficulty,
    link,
    dateSolved,
  });
  await question.save();
  res.status(201).json(question);
};

const getQuestions = async (req, res) => {
  const questions = await Question.find({ user: req.user._id }).sort({ dateSolved: -1 });
  res.json(questions);
};

module.exports = { addQuestion, getQuestions };
