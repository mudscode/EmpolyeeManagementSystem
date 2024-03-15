const EmployeeManagementSystem = require("../controllers/EmployeeManagement.js");
const express = require("express");
const router = express.Router();

const employeeManagement = new EmployeeManagementSystem();

router.get("/:id", employeeManagement.getAnEmployee);

router.put("/update", employeeManagement.updateEmployee);

router.delete("/delete/:id", employeeManagement.deleteAnEmployee);

router.post("/add", employeeManagement.addAnEmployee);

module.exports = router;
