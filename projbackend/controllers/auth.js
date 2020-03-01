const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken"); // save token to cookies
const expressJwt = require("express-jwt"); //

exports.signout = (req, res) => {
  //res.send("user signout");
  res.clearCookie("token");
  res.json({
    message: "user signed out success."
  });
};

exports.signup = (req, res) => {
  const result = validationResult(req);
  if (result.errors.length > 0) {
    return res.status(422).json({
      error: result.errors[0].msg
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user to DB."
      });
    }
    res.json({ name: user.name, email: user.email, id: user._id });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const email2 = email;
  // Validation
  const result = validationResult(req);
  if (result.errors.length > 0) {
    return res.status(422).json({
      error: result.errors[0].msg
    });
  }
  // Find the very first match.
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `User ${email2} does not exists.`
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match."
      });
    }

    // Creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put token in cookie
    res.cookie("token", token, {
      expire: new Date() + 9999
    });

    // Send response to frontend.
    const { _id, name, email, role } = user;
    res.json({
      token,
      user: {
        _id,
        name,
        role,
        email
      }
    });
  });
};

// Protected routes - acting as middleware
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  // profile will be set by front end and auth will be set up by the above middleware.
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not an admin."
    });
  }
  next();
};
