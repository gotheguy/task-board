const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createDate: { type: Date },
  status: { type: String },
  image: { type: String },
  comments: [{ type: String }],
  priority: { type: String },
  list: { type: mongoose.Types.ObjectId, required: true, ref: "List" },
  assignee: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Card", cardSchema);
