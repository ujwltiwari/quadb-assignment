require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await argon2.hash(this.password);
  next();
});

// Method to compare password for authentication
userSchema.methods.comparePassword = function (candidatePassword) {
  console.log("userSchema called", this, candidatePassword);
  return argon2.verify(this.password, candidatePassword);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
