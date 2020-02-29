require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
app.listen(port, () => {
  console.log(`App is running at ${port} port.`);
});
