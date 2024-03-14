const Employee = require("../models/Employee");
const mongoose = require("mongoose");

class EmployeeManagementSystem {
  async addEmployee(req, res) {
    try {
      const { name, age, email, position, salary } = req.body;

      const requiredFields = ["name", "age", "email", "position", "salary"];

      const employeeExists = await Employee.findOne({ email });

      if (employeeExists) {
        return res
          .status(400)
          .json("An employee with the same email already exists!");
      }

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json(`${field} is required!`);
        }
      }

      const newEmployee = new Employee({ name, age, email, position, salary });
      const savedEmployee = await newEmployee.save();

      res.status(200).json(savedEmployee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEmployee(req, res) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Employee not found!" });
      }

      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json("Employee not found!");
      }

      return res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

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
      res.status(500).json({ error: err.message });
    }
  }

  async deleteEmployee(req, res) {
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
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = EmployeeManagementSystem;
