
const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  const { userId, imgId } = req.query;

  try {
    const hasRated = await ExperimentModel.exists({ userId, ratings: { $elemMatch: { imgId } } });

    res.json({ hasRated });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};