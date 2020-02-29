const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const schema = mongoose.Schema;
var userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    userInfo: {
      type: String,
      trim: true
    },

    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.getSecurePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.method = {
  authenticate: function(plainPassword) {
    return this.getSecurePassword(plainPassword) === this.encry_password;
  },
  getSecurePassword: function(plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("User", userSchema);
