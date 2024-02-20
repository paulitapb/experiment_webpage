
const { mongoose, allowCORS } = require('../db');
const CurrentSerieIndex = require('../models/CurrentSerieModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});
    
    const current_serie_index = await CurrentSerieIndex.findOne();
    if (!current_serie_index) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    
    const new_index = (current_serie_index.currentIndex + 1) % 50;
    
    
    const updated_serie_index = await CurrentSerieIndex.findOneAndUpdate(
      { _id: current_serie_index._id }, 
      { $set: { currentIndex: new_index } },
      { new: true }  // return the updated document
    ).catch(err => { console.error(err); });

    res.json(current_serie_index.currentIndex);

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}
