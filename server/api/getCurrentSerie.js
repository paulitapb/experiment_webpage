
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
      const current_serie_index = await CurrentSerieIndex.findOne();
      if (!current_serie_index) {
        console.log('Document not found')
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      
      const new_index = (current_serie_index.currentIndex + 1) % 10;
      
      
      const updated_serie_index = await CurrentSerieIndex.findOneAndUpdate(
        { _id: current_serie_index._id }, 
        { $set: { currentIndex: new_index } },
        { new: true }  
      ).catch(err => { console.error(err); });
      
      user.serieAssigned = updated_serie_index.currentIndex;
      await user.save();   
      res.json(current_serie_index.currentIndex);
    }else{
      res.json(user.serieAssigned);
    }
    

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}
