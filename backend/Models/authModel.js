const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:VTH8dXLG4aENn7vZ@cluster0.qprskym.mongodb.net/teacherDB?retryWrites=true&w=majority",
    {}
  )
  .then((conn) => {
    console.log("Connection Successful");
  });

  const teacherSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    dateOfBirth: {
      type: String,
    },
    day1: {
      type: Number,
    },
    day2: {
      type: Number,
    },
    day3: {
      type: Number,
    },
    day4: {
      type: Number,
    },
    day5: {
      type: Number,
    },
    avgClasses: {
      type: Number, // Change to Number, not String
    },
  });

const Teacher = mongoose.model("User", teacherSchema);

module.exports = Teacher;
