const express = require("express");
const router = express.Router();

const signout = (req, res) => {
  //res.send("user signout");
  res.json({
    message: "user signed out"
  });
};
router.get("/signout", signout);

module.exports = router;
