const express = require("express");

// A middleware used to log requests, errors to the console
const morgan = require("morgan");

// A module to access variables from .env files
const dotenv = require("dotenv").config();
const connectDb = require("./database");
const employeeRoutes = require("./routes/employeeRoutes.js");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes usage
app.use("/employees", employeeRoutes);

// db connection
connectDb();

const port = process.env.PORT || 5000;

// Server to handle http requests
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
