const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String },
  commenter: { type: mongoose.Types.ObjectId, ref: "User" },
});

const cardSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createDate: { type: Date },
  status: { type: String },
  image: { type: String },
  comments: [commentSchema],
  priority: { type: String },
  list: { type: mongoose.Types.ObjectId, ref: "List" },
  assignee: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Card", cardSchema);
