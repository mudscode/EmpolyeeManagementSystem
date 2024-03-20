const Employee = require("../models/Employee");
const mongoose = require("mongoose");

class EmployeeManagementSystem {
  async addAnEmployee(req, res) {
    try {
      // Extracts the details from req.body
      const { name, age, email, position, salary } = req.body;

      // Checking if an employeee exists by email to make the feature of everyone haing unique email
      const employeeExists = await Employee.findOne({ email });

      if (employeeExists) {
        return res
          .status(400)
          .json("An employee with the same email already exists!");
      }

      const requiredFields = ["name", "age", "email", "position", "salary"];

      // Checking whether all the required fields are passed down in the req.body
      for (const field of ["name", "age", "email", "position", "salary"]) {
        if (!req.body[field]) {
          return res.status(400).json(`${field} is required!`);
        }
      }

      const newEmployee = new Employee({ name, age, email, position, salary });
      const savedEmployee = await newEmployee.save();

      res.status(201).json(savedEmployee);
    } catch (err) {
      res.status(500).json("An error occured internally!");
      console.log(err);
    }
  }

  async getAnEmployee(req, res) {
    try {
      /* Returns an error if the employee id is invalid, when you send an id that's not the standard 12 digits hexadecimal format which the mongoose accept, it gives an error as not objectId ... And we use this mongoose method to check that */
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Employee not found!" });
      }

      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json("Employee not found!");
      }

      return res.status(200).json(employee);

    } catch (err) {
      res.status(500).json("An error occured internally!");
      console.log(err);
    }
  }

  async updateEmployee(req, res) {
    try {
      const { _id, name, age, email, position, salary } = req.body;

      const findEmployee = Employee.findById(_id);

      if (!findEmployee) {
        return res.status(404).json("Employee not found!");
      }

      // Update the fields that are to be updated
      const updatedEmployee = await Employee.findByIdAndUpdate(
        _id,
        { name, age, email, position, salary },
        { new: true }
      );

      res.status(200).json(updatedEmployee);
    } catch (err) {
      res.status(500).json("An error occured internally!");
      console.log(err);
    }
  }

  async deleteAnEmployee(req, res) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Employee not found!" });
      }

      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json("Employee not found!");
      }

      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

      res.status(200).json(`${deletedEmployee.name} deleted successfully.`);
    } catch (err) {
      res.status(500).json("An error occured internally!");
      console.log(err);
    }
  }
}

module.exports = EmployeeManagementSystem;
