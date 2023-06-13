const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6000;

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  cgpa: Number,
  skills: [String],
  address: String
});

const Student = mongoose.model('Student', studentSchema);

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

// GET /students/:id - Get a specific student
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

// PUT /students/:id - Update a specific student
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, cgpa, skills, address } = req.body;

  Student.findByIdAndUpdate(
    studentId,
    { name, cgpa, skills, address },
    { new: true },
    (err, updatedStudent) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (!updatedStudent) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        res.json(updatedStudent);
      }
    }
  );
});

// DELETE /students/:id - Delete a specific student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;

  Student.findByIdAndRemove(studentId, (err, removedStudent) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!removedStudent) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(removedStudent);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
