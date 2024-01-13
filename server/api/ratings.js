const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
      allowCORS(req, res, () => {});
    
      const ratings = await ExperimentModel.find();
      res.json(ratings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
}