require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);

// Starting server
app.listen(port, () => {
  console.log(`App is running at ${port} port.`);
});
