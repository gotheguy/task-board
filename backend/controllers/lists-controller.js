const { validationResult } = require("express-validator");

const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/http-error");

exports.getAllLists = async (req, res, next) => {
  let lists;
  try {
    lists = await List.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get lists.", 500)
    );
  }
  res.json({
    lists,
  });
};

exports.createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { title } = req.body;

  const createdList = new List({
    title,
    createDate: new Date(),
    updateDate: new Date(),
    cards: [],
  });

  try {
    await createdList.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create list.", 500)
    );
  }
  res.status(201).json({ list: createdList });
};

exports.deleteList = async (req, res, next) => {
  const { id } = req.params;

  let list;
  try {
    list = await List.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete list.",
      500
    );
    return next(error);
  }

  if (!list) {
    const error = new HttpError("Could not find a list for this id.", 404);
    return next(error);
  }

  try {
    await list.deleteOne();
    await Card.deleteMany({ list: listId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete list.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted list." });
};

// exports.moveCardFromList = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid data, please review your input data", 422)
//     );
//   }

//   const { listId, cardId } = req.params;

//   let card;
//   try {
//     card = await Card.findById(cardId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not get card.",
//       500
//     );
//     return next(error);
//   }

//   try {
//     await createdList.save();
//   } catch (err) {
//     return next(
//       new HttpError("Something went wrong, could not create list.", 500)
//     );
//   }
//   res.status(201).json({ list: createdList });
// };
