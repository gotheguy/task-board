// const { validationResult } = require("express-validator");

// const List = require("../models/list");
// const User = require("../models/user");
// const HttpError = require("../models/http-error");

// exports.getAllBoards = async (req, res, next) => {
//   let boards;
//   try {
//     boards = await Board.find({});
//   } catch (err) {
//     return next(
//       new HttpError("Something went wrong, could not get boards.", 500)
//     );
//   }
//   res.json({
//     boards,
//   });
// };

// exports.createBoard = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid data, please review your input data", 422)
//     );
//   }

//   const { title } = req.body;

//   const createdList = new Board({
//     title,
//     createDate: new Date(),
//     updateDate: new Date(),
//     cards: [],
//   });

//   try {
//     await createdList.save();
//   } catch (err) {
//     return next(
//       new HttpError("Something went wrong, could not create list.", 500)
//     );
//   }
//   res.status(201).json({ list: createdList });
// };

// exports.deleteList = async (req, res, next) => {
//   const listId = req.params.id;

//   let list;
//   try {
//     list = await Board.findById(listId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not delete list.",
//       500
//     );
//     return next(error);
//   }

//   if (!list) {
//     const error = new HttpError("Could not find a list for this id.", 404);
//     return next(error);
//   }

//   try {
//     await list.deleteOne();
//     await Card.deleteMany({ list: listId });
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not delete list.",
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: "Deleted list." });
// };
