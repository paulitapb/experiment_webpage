const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
            imgId: { type: Number, required: true },
            imgGroup: { type: Number, required: true },
            imgGeneratedBy: { type: String, required: true },
            promptUsed: {type: Number, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            submitTime: { type: Date, required: true }
    });

const expDBSchema = new mongoose.Schema({
    userId: { type: String, required: true , unique: true},
    loginTime: { type: Date, required: true },
    ratings: [ratingSchema], 
    tutorialTime: { type: Date, required: false },
    serieAssigned: { type: Number, required: false },
    lastImageIndexSubmitted: { type: Number, required: false }, 
});


const ExperimentModel = mongoose.model('ExperimentModel', expDBSchema);

module.exports = ExperimentModel;
