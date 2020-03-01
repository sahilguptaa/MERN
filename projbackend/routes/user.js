const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { getUserById, getUser, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

// Will take userId from any req coming and
// will populate the req obj with profile as user object.
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
