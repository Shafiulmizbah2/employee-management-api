const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();

const employeeRouter = require("./routes/employee/employee.route");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//middlewares
app.use("/employees", employeeRouter);

module.exports = app;
