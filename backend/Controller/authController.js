const Teacher = require('../Models/authModel');

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTeacher = async (req, res) => {
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
}
exports.filter = async (req, res) => {
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
}
exports.search = async (req, res) => {
  const { searchValue } = req.body;
  try {
    const searchResult = await Teacher.find({
      fullName: { $regex: new RegExp(searchValue, 'i') }
    });
    res.json(searchResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.update = async (req, res) => {
  const { id } = req.params;
  
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body);
      res.status(200).json(updatedTeacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
} 
exports.delete = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    await Teacher.findByIdAndDelete(id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } 
}