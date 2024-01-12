const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  allowCORS(req, res, () => {});
  const { userId } = req.body;

  try {
    const userExists = await ExperimentModel.findOne({ userId: userId });

    if (userExists !== null) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new ExperimentModel({ userId, ratings: [] });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}