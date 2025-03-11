const { lowerCase } = require("lodash");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    
    isSuperAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


const userModel = mongoose.model("user", userSchema)
module.exports = userModel
