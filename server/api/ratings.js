const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
      allowCORS(req, res, () => {});
      res.status(200).end();
      return;
    }
    allowCORS(req, res, () => {});
    try {
      const ratings = await ExperimentModel.find();
      res.json(ratings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
}