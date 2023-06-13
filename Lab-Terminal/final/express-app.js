const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  cgpa: Number,
  skills: [String],
  address: String
});

const Student = mongoose.model('Student', studentSchema);

// Middleware
app.use(bodyParser.json());

// GET /students - Get all students
app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(students);
    }
  });
});

// GET /students/:id - Get a specific student by ID
app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;

  Student.findById(studentId, (err, student) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(student);
    }
  });
});

// POST /students - Create a new student
app.post('/students', (req, res) => {
  const { name, cgpa, skills, address } = req.body;

  const newStudent = new Student({
    name,
    cgpa,
    skills,
    address
  });

  newStudent.save((err, savedStudent) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(savedStudent);
    }
  });
});

// PUT /students/:id - Update a student
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, cgpa, skills, address } = req.body;

  Student.findByIdAndUpdate(studentId, { name, cgpa, skills, address }, { new: true }, (err, updatedStudent) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!updatedStudent) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(updatedStudent);
    }
  });
});

// DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;

  Student.findByIdAndRemove(studentId, (err, deletedStudent) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!deletedStudent) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(deletedStudent);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
