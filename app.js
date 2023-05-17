const express = require("express");
const app = express();
const satRoutes = require("./satRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/sat", satRoutes);

module.exports = app;
