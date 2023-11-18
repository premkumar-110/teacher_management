const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/teacherDB');


// Define Teacher Schema
const teacherSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  dateOfBirth: Date,
  numberOfClasses: Number
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// Landing/Home Page
// Landing/Home Page
app.get('/teachers', async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

app.post('/teachers', async (req, res) => {
    const teacher = new Teacher({
      fullName: req.body.fullName,
      age: req.body.age,
      dateOfBirth: req.body.dateOfBirth,
      numberOfClasses: req.body.numberOfClasses
    });
  
    try {
      const newTeacher = await teacher.save();
      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

app.get('/teachers/filter', async (req, res) => {
    const { age, numberOfClasses } = req.query;
    let filter = {};
  
    if (age) {
      filter.age = age;
    }
  
    if (numberOfClasses) {
      filter.numberOfClasses = numberOfClasses;
    }
  
    try {
      const filteredTeachers = await Teacher.find(filter);
      res.json(filteredTeachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
app.get('/teachers/search', async (req, res) => {
    const { searchQuery } = req.query;
    
    try {
      const searchResult = await Teacher.find({
        fullName: { $regex: new RegExp(searchQuery, 'i') }
      });
  
      res.json(searchResult);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Other routes for updating, deleting, and searching teachers go here...
app.put('/teachers/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedTeacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
app.delete('/teachers/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Teacher.findByIdAndDelete(id);
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
