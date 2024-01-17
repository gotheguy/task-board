const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: { type: String },
  createDate: { type: Date },
  cards: [{ type: mongoose.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("List", listSchema);
