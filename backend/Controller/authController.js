const Teacher = require("../Models/authModel");

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
    numberOfClasses: req.body.numberOfClasses,
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json({message:"Data added successfully",newTeacher:newTeacher});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.filter = async (req, res) => {
  const { ageRange, classRange, ageFilters, classFilters } = req.body;
  console.log(ageRange, classRange, ageFilters, classFilters);
  if (ageFilters.length === 0 && classFilters.length === 0) {
    if (ageRange !== -1) {
      try {
        let query = { age: ageRange };

        if (classRange !== -1) {
          query.numberOfClasses = classRange;
        }

        const res1 = await Teacher.find(query);
        console.log("Filtered Data:", res1);
        res.status(200).json({ data: res1 });
      } catch (error) {
        console.error("Error filtering data:", error);
      }
    } else if (classRange !== -1) {
      try {
        let query = { numberOfClasses: classRange };

        if (ageRange !== -1) {
          query.age = ageRange;
        }

        const res2 = await Teacher.find(query);
        console.log("Filtered Data:", res2);
        res.status(200).json({ data: res2 });
      } catch (error) {
        console.error("Error filtering data:", error);
      }
    } else {
      res.json({
        message: "No Data is found",
      });
    }
  } else {
    if (ageFilters.length !== 0) {
      const ageFilteredResults = [];

      for (let i = 0; i < ageFilters.length; i++) {
        const ageRange = ageFilters[i].split("-");
        const minAge = parseInt(ageRange[0]);
        const maxAge = parseInt(ageRange[1]);

        // Use find method with MongoDB query to filter data based on age
        const ageFilteredData = await Teacher.find({
          age: { $gte: minAge, $lt: maxAge },
        });

        ageFilteredResults.push(...ageFilteredData);
      }

      if (classFilters.length !== 0) {
        const classFilteredResults = [];

        for (let j = 0; j < classFilters.length; j++) {
          const classRange = classFilters[j].split("-");
          const minClasses = parseInt(classRange[0]);
          const maxClasses = parseInt(classRange[1]);

          // Further filter data based on the number of classes
          const classFilteredData = ageFilteredResults.filter(
            (teacher) =>
              teacher.numberOfClasses >= minClasses &&
              teacher.numberOfClasses < maxClasses
          );

          classFilteredResults.push(...classFilteredData);
        }
        res.status(200).json({
          data: classFilteredResults,
        });
      } else {
        res.status(200).json({
          data: ageFilteredResults,
        });
      }
    } else {
      const classFilteredData = [];

      for (let i = 0; i < classFilters.length; i++) {
        const classRange = classFilters[i].split("-");
        const minClass = parseInt(classRange[0]);
        const maxClass = parseInt(classRange[1]);

        // Use find method with MongoDB query to filter data based on age
        const classFilteredData = await Teacher.find({
          numberOfClasses: { $gte: minClass, $lt: maxClass },
        });

        classFilteredResults.push(...classFilteredData);
      }
    }
  }
};

exports.search = async (req, res) => {
  const { searchValue } = req.body;
  try {
    const searchResult = await Teacher.find({
      fullName: { $regex: new RegExp(searchValue, "i") },
    });
    res.json(searchResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body);
    res.status(200).json({message:"Data updated successfully",updatedTeacher:updatedTeacher});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.delete = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Teacher.findByIdAndDelete(id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
