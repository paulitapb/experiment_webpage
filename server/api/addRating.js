
const db = require('../db');

const ExperimentModel = require('../models/ExperimentModel');


module.exports = async (req, res) => {
    const {userId, imgId, imgGroup, imgGeneratedBy, promptUsed, rating } = req.body; 
    
    if (!imgId || !imgGroup || !promptUsed || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      let user = await ExperimentModel.findOne({ userId: String(userId) });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.ratings.push({ 
        imgId:  imgId, 
        imgGroup: imgGroup, 
        imgGeneratedBy: imgGeneratedBy, 
        promptUsed: promptUsed, 
        rating: rating });
      await user.save();
      res.json(user);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error', details: err.message });
    }
}