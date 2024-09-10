const mongoose = require('mongoose');

const photographSchema = new mongoose.Schema({
    photoId: {
        type: Number,
        unique: true,
        required: [true, 'Provide value for Photo Id']
    },
    capturedLocation: {
        type: String,
        required: [true, 'Provide value for Captured Location']
    },
    photographer: {
        type: String,
        required: [true, 'Provide value for Photographer Name']
    },
    viewerComments: {
        type: String,
        required: [true, 'Provide value for Viewer Comments']
    },
    photoType: {
        type: String,
        required: [true, 'Provide value for Photo Type']
    },
    rating: {
        type: Number,
        min: [1, 'Rating should be between 1 and 5'],
        max: [5, 'Rating should be between 1 and 5']
    },
    exhibitionObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibition' // Reference to the Exhibition model
    }
});

const Photograph = mongoose.model('Photograph', photographSchema);

module.exports = Photograph;
