const mongoose = require("mongoose");

// Mongoose schema for the Employee model
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    position: {
      type: String,
      required: true,
      enum: [
        "Developer",
        "Designer",
        "SEO Expert",
        "Manager",
        "Marketing Expert",
        "Other",
      ],
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Creating a model of the schema
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
