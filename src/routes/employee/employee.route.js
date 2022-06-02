const express = require("express");
const {
  getAllEmployee,
  getEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} = require("./employee.controller");

const employeeRouter = express.Router();

employeeRouter.get("/", getAllEmployee);
employeeRouter.post("/", addEmployee);
employeeRouter.get("/:id", getEmployee);
employeeRouter.delete("/:id", deleteEmployee);
employeeRouter.put("/:id", updateEmployee);

module.exports = employeeRouter;
