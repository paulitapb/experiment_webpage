
const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});

    const {userId, imgId, imgGroup, imgGeneratedBy, promptUsed, rating, submitTime } = req.body; 
    
    if (!imgId || !imgGroup || !promptUsed || !rating || !submitTime || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
      console.log("user id" + userId)
      let user = await ExperimentModel.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.ratings.push({ 
        imgId:  imgId, 
        imgGroup: imgGroup, 
        imgGeneratedBy: imgGeneratedBy, 
        promptUsed: promptUsed, 
        rating: rating,
        submitTime: submitTime});
        
      await user.save();
      res.json(user);
  
    } catch (err) {
      console.error(err);
      if (!res.headersSent) {
        res.status(500).send('Server Error');
      }
    }
}