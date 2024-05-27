
const { mongoose, allowCORS } = require('../db');
const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    if (allowCORS(req, res, () => {})) {
      return;
    }
    const userId = req.query.userId;

    const userExists = await ExperimentModel.exists({ userId: userId });
    if (userExists){
      res.json({ userExists: true });
    }else{
      res.json({ userExists: false });
    }
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      return res.status(500).send('Server Error');
    }
  }
}