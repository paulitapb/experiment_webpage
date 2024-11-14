
const { mongoose, allowCORS } = require('../db');
const CurrentSerieIndex = require('../models/CurrentSerieModel');
const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});
    
    const {userId} = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await ExperimentModel.findOne({userId: userId}
                          ).catch(err => { console.error('User not found');});
    
    if (user.serieAssigned == null) {
        res.status(404).json({ message: 'New user' });
    }else{
      res.json(user.lastImageIndexSubmitted);
    }
    

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}
