const EmployeeManagementSystem = require("../controllers/EmployeeManagement.js");
const express = require("express");
const router = express.Router();

const employeeManagement = new EmployeeManagementSystem();

router.get("/:id", employeeManagement.getEmployee);

router.put("/update", employeeManagement.updateEmployee);

router.delete("/delete/:id", employeeManagement.deleteEmployee);

router.post("/add", employeeManagement.addEmployee);

module.exports = router;
