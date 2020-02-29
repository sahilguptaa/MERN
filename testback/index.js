// import express from "express"; for node > V 13.0
const express = require("express");
const app = express();
const port = 3000;

const admin = (req, res) => {
  return res.send("ADMIN DASHBOARD");
};

// Middleware
const isAdmin = (req, res, next) => {
  console.log("is admin called");
  next();
};

app.get("/", (req, res) => res.send("hello world"));
app.get("/admin", isAdmin, admin);

app.listen(port, () => console.log("SERVER STARTED"));
