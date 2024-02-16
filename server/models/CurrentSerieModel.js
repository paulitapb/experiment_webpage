const mongoose = require('mongoose');

const current_serie_index = mongoose.Schema({
    current_index : {type: Number, required: true}
});

const CurrentSerieIndex = mongoose.model('CurrentSerieIndex', current_serie_index);

module.exports = CurrentSerieIndex;