const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    imgId: { type: Number, required: true },
            imgGroup: { type: Number, required: true },
            imgGeneratedBy: { type: String, required: true },
            promptUsed: {type: Number, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
    });

const expDBSchema = new mongoose.Schema({
    userId: { type: String, required: true , unique: true},
    ratings: [ratingSchema]
    
});

const ExperimentModel = mongoose.model('ExperimentModel', expDBSchema);

module.exports = ExperimentModel;