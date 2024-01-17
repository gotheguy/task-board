const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createDate: { type: Date },
  // image: { type: String },
  lists: [{ type: mongoose.Types.ObjectId, required: true, ref: "List" }],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Board", boardSchema);
