
const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});

    const {userId, tutorialTime} = req.body; 
    
    if (!userId || !tutorialTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
      let user = await ExperimentModel.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      user.tutorialTime = new Date(tutorialTime);
      
      await user.save();
      res.json(user);
  
    } catch (err) {
      console.error(err);
      if (!res.headersSent) {
        res.status(500).send('Server Error');
      }
    }
}