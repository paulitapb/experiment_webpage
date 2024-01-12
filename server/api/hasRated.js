const db = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  const { userId, imgId } = req.query;

  try {
    const hasRated = await ExperimentModel.exists({ userId: userId, 
                                ratings: { $elemMatch: { imgId: { "$exists": imgId } } } });
    if (hasRated?.hasRated){
      res.json({ hasRated: true });
    }else{
      res.json({ hasRated: false });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};