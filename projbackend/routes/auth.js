const express = require("express");
const router = express.Router();
const { signout, signup } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 characters.").isLength({ min: 3 }),
    check("email", "Email is required.").isEmail(),
    check("password", "Password too short.").isLength({ min: 3 })
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
