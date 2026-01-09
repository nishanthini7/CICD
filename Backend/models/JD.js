const mongoose = require('mongoose');

const JDSchema = new mongoose.Schema({
  hrId: { type: mongoose.Schema.Types.ObjectId, ref: 'HR', required: true }, // Link to HR collection
  jobTitle: { type: String, required: true },
  primarySkills: { type: String, required: true },
  secondarySkills: { type: String, required: true },
  mustSkills: { type: String, required: true },
  experienceYear: { type: String, required: true },
  description:{ type: String},
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('JD', JDSchema);