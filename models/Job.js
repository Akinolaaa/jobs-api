const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company and name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,   // tying this to one of the schemas
    ref: 'User',  // the specific schema is User
    required: [true, 'Please provide user']
  }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema);