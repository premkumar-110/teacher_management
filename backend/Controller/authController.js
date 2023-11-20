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
  const {
    firstName,
    lastName,
    age,
    dateOfBirth,
    day1,
    day2,
    day3,
    day4,
    day5,
  } = req.body;

  const avgClasses = (day1 + day2 + day3 + day4 + day5) / 5;

  const teacher = new Teacher({
    firstName: firstName,
    lastName: lastName,
    age: age,
    dateOfBirth: dateOfBirth,
    day1: day1,
    day2: day2,
    day3: day3,
    day4: day4,
    day5: day5,
    avgClasses: avgClasses,
  });

  try {
    const newTeacher = await teacher.save();
    res
      .status(201)
      .json({ message: "Data added successfully", newTeacher: newTeacher });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.filter = async (req, res) => {
  const { ageRange, classRange, ageFilters, classFilters } = req.body;
  console.log(ageRange, classRange, ageFilters, classFilters);

  let classFilteredResults = [];

  if (ageFilters.length === 0 && classFilters.length === 0) {
    if (ageRange !== -1) {
      try {
        let query = { age: ageRange };

        if (classRange !== -1) {
          query.numberOfClasses = classRange;
        }

        const res1 = await Teacher.find(query);
        console.log("Filtered Data:", res1);
        return res.status(200).json({ data: res1 });
      } catch (error) {
        console.error("Error filtering data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (classRange !== -1) {
      try {
        let query = { numberOfClasses: classRange };

        if (ageRange !== -1) {
          query.age = ageRange;
        }

        const res2 = await Teacher.find(query);
        console.log("Filtered Data:", res2);
        return res.status(200).json({ data: res2 });
      } catch (error) {
        console.error("Error filtering data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.json({
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
        // Remove the let keyword to avoid redeclaration
        classFilteredResults = [];

        for (let j = 0; j < classFilters.length; j++) {
          const classRange = classFilters[j].split("-");
          const minClasses = parseInt(classRange[0]);
          const maxClasses = parseInt(classRange[1]);

          // Further filter data based on the number of classes
          const classFilteredData = ageFilteredResults.filter((teacher) => {
            const avgClassesInt = Math.floor(teacher.avgClasses); // Convert avgClasses to int
            return avgClassesInt >= minClasses && avgClassesInt < maxClasses;
          });

          classFilteredResults.push(...classFilteredData);
        }

        return res.status(200).json({
          data: classFilteredResults,
        });
      } else {
        return res.status(200).json({
          data: ageFilteredResults,
        });
      }
    } else {
      // Remove the let keyword to avoid redeclaration
      classFilteredResults = [];

      for (let i = 0; i < classFilters.length; i++) {
        const classRange = classFilters[i].split("-");
        const minClass = parseInt(classRange[0]);
        const maxClass = parseInt(classRange[1]);

        // Use find method with MongoDB query to filter data based on age
        const classFilteredData = await Teacher.find({
          avgClasses: { $gte: minClass, $lt: maxClass },
        });

        classFilteredResults.push(...classFilteredData);
      }
    }
  }

  // Move this outside the else block to avoid the ReferenceError
  return res.status(200).json({
    data: classFilteredResults,
  });
};

exports.search = async (req, res) => {
  const { searchValue } = req.body;
  try {
    const searchResult = await Teacher.find({
      $or: [
        { firstName: { $regex: new RegExp(searchValue, "i") } },
        { lastName: { $regex: new RegExp(searchValue, "i") } },
      ],
    });

    res.json(searchResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    age,
    dateOfBirth,
    day1,
    day2,
    day3,
    day4,
    day5,
  } = req.body;

  // Calculate avgClasses
  const avgClasses = (day1 + day2 + day3 + day4 + day5) / 5;

  // Create a new Teacher instance with updated data
  const updatedTeacherData = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    dateOfBirth: dateOfBirth,
    day1: day1,
    day2: day2,
    day3: day3,
    day4: day4,
    day5: day5,
    avgClasses: avgClasses,
  };

  try {
    // Use the new Teacher instance for the update
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      updatedTeacherData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res
      .status(200)
      .json({
        message: "Data updated successfully",
        updatedTeacher: updatedTeacher,
      });
  } catch (error) {
    console.log(error);
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
