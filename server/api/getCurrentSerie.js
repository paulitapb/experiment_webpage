
const { mongoose, allowCORS } = require('../db');
const CurrentSerieIndex = require('../models/CurrentSerieModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});
    
    const current_serie_index = await CurrentSerieIndex.findOne();
    if (!current_serie_index) {
      console.log('No document found with findOne');
      return;
    }
    const new_index = (current_serie_index.current_index + 1) % 50;
    console.log('new_index:', new_index)
    const updated_serie_index = await CurrentSerieIndex.findOneAndUpdate(
      { _id: current_serie_index._id }, 
      { $set: { current_index: new_index } },
      { new: true }  // return the updated document
    ).catch(err => console.log(err + ' Error updating serie index'));

    res.json(updated_serie_index);

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}
