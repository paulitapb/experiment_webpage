
const { mongoose, allowCORS } = require('../db');
const CurrentSerieIndex = require('../models/CurrentSerieModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});
    
    const current_serie_index = await CurrentSerieIndex.findOne();
    res.json(current_serie_index);

   
    const new_index = (current_serie_index.current_index + 1) % 50;
    current_serie_index.current_index = new_index;
    await current_serie_index.save();

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}
