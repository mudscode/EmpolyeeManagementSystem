const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDb = require("./database");
const employeeRoutes = require("./routes/employeeRoutes.js");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/employees", employeeRoutes);

// db connection
connectDb();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
