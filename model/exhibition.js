const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  exhibitionId: {
    type: String,
    unique: true,
    required: [true, 'Provide value for Exhibition Id'], // Validation: exhibitionId should not be empty
  },
  exhibitionTitle: {
    type: String,
    required: [true, 'Provide value for Exhibition Title'], // Validation: exhibitionTitle should not be empty
  },
  duration: {
    type: Number,
    min: [1, 'Duration should be greater than 0'], // Validation: duration should be positive value
  },
  theme: {
    type: String,
    required: [true, 'Provide value for Theme'], // Validation: theme should not be empty
  },
  status: {
    type: String,
    required: [true, 'Provide value for Status'], // Validation: status should not be empty
  },
  location: {
    type: String,
    required: [true, 'Provide value for location'], // Validation: location should not be empty
  },
  photographs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photograph' // Reference to the Photograph model
  }]
});

const Exhibition = mongoose.model('Exhibition', exhibitionSchema);

module.exports = Exhibition;
