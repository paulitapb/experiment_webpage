const mongoose = require('mongoose');

const current_serie_index = mongoose.Schema({
    currentIndex : {type: Number, required: true}
});

const CurrentSerieIndex = mongoose.model('CurrentSerieIndex', current_serie_index);

module.exports = CurrentSerieIndex;