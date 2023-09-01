const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const avatarSchema = new mongoose.Schema({
  initials: { type: String },
  imageUrl: { type: String },
  colorGradient1: { type: String },
  colorGradient2: { type: String },
});

const userSchema = new Schema({
  fullName: { type: String },
  userName: { type: String },
  email: { type: String, unique: true },
  password: { type: String, minlength: 6 },
  avatar: avatarSchema,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
