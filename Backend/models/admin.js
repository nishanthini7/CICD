// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('admin', adminSchema);

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: "Admin" },
  department: { type: String, required: true },
  password:{ type: String },
  workLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },

}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
