const Employee = require("../models/Employee");
const mongoose = require("mongoose");

class EmployeeManagementSystem {

  // Adds an employee to the Employee model
  async addAnEmployee(req, res) {
    try {

      // Extracts the details from req.body
      const { name, age, email, position, salary } = req.body;

      const employeeExists = await Employee.findOne({ email });

      if (employeeExists) {
        return res
          .status(400)
          .json("An employee with the same email already exists!");
      }

      // Storing the required fields so that it can iterated over
      const requiredFields = ["name", "age", "email", "position", "salary"];

      // Checking whether all the required fields are passed down in the req.body or not and sending an error if not all are passed
      for (const field of requiredFields) {
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

  // Gets an employee from the Employee model
  async getAnEmployee(req, res) {
    try {

      // Returns an error if the employee id is invalid, when you send an id that's not the standard 12 digigts hexadecimal format which the mongoose accept, it gives an error as not objectId ... And we use this mongoose method to check that
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Employee not found!" });
      }

      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json("Employee not found!");
      }

      return res.status(200).json(employee);

      // Returns an error during an exception or internal server error
    } catch (err) {
      res.status(500).json("An error occured internally!");
      console.log(err);
    }
  }

  // Updates an employee
  async updateEmployee(req, res) {
    try {
      const { _id, name, age, email, position, salary } = req.body;

      const findEmployee = Employee.findById(_id);

      if (!findEmployee) {
        return res.status(404).json("Employee not found!");
      }

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

  // Deletes an employee
  async deleteAnEmployee(req, res) {
    try {

      // Returns an error if the id is invalid
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
      console.log(err);    }
  }
}

module.exports = EmployeeManagementSystem;
