const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
            imgId: { type: Number, required: true },
            imgGroup: { type: Number, required: true },
            imgGeneratedBy: { type: String, required: true },
            promptUsed: {type: Number, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            submit_time: { type: Date, required: true }
    });

const expDBSchema = new mongoose.Schema({
    userId: { type: String, required: true , unique: true},
    login_time: { type: Date, required: true },
    ratings: [ratingSchema]
    
});

const current_serie_index = mongoose.Schema({
    current_index : {type: Number, required: true}
});

const ExperimentModel = mongoose.model('ExperimentModel', expDBSchema);
const CurrentSerieIndex = mongoose.model('CurrentSerieIndex', current_serie_index);

module.exports = ExperimentModel;
module.exports = CurrentSerieIndex;