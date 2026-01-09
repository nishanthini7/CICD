// const mongoose = require('mongoose');

// const candidateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: Number, required: true },
//   dob: { type: Number, required: true },
//   Address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   pinCode: { type: Number, required: true },
//   linkedIn: { type: String },
//   portfolio: { type: String },
//   workExperience: { type: String, required: true },
//   skills: { type: String, required: true },
//   noticePeriod: { type: String },
//   aboutUs: { type: String },
//   Password:{ type: String },
//   createdAt: { type: Date, default: Date.now },
//   isActive: { type: Boolean, default: true },
//   relocate: { type: Boolean}
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Candidate', candidateSchema);

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  dob: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: Number, required: true },
  linkedIn: { type: String },
  portfolio: { type: String },
  workExperience: { type: String, required: true },
  skills: { type: String, required: true },
  noticePeriod: { type: String },
  aboutUs: { type: String },
  password: { type: String },
  relocate: { type: Boolean },

  // Relationship fields
  hrId: { type: mongoose.Schema.Types.ObjectId, ref: 'HR', required: true },
  invitedJDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JD' }], // multiple JDs

  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);