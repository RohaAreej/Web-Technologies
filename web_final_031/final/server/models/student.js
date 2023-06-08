const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  cgpa: Number,
  skills: [String],
  address: String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
