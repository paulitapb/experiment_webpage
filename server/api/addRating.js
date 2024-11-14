
const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});

    const {userId, imgGeneratedId, imgId, imgGroup, imgGeneratedBy, promptUsed, rating, submitTime, lastImageIndexSubmitted} = req.body; 
    
    if ( (imgGeneratedId==null) || !imgId || !imgGroup || !promptUsed || !rating || !submitTime || (!userId || lastImageIndexSubmitted == undefined)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
      let user = await ExperimentModel.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.lastImageIndexSubmitted = lastImageIndexSubmitted;

      user.ratings.push({
        imgGeneratedId: imgGeneratedId, 
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