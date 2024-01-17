const { validationResult } = require("express-validator");
const Card = require("../models/card");
const List = require("../models/list");
const Status = require("../models/status");
const Priority = require("../models/priority");
const HttpError = require("../models/http-error");

exports.getAllCards = async (req, res, next) => {
  let cards;
  try {
    cards = await Card.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get cards.", 500)
    );
  }
  res.json({
    cards,
  });
};

exports.getCardById = async (req, res, next) => {
  const { id } = req.params;
  let card;

  try {
    card = await Card.findById({ _id: id });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get card.", 500)
    );
  }
  res.json({
    card,
  });
};

exports.getCardsByListId = async (req, res, next) => {
  const { listId } = req.query;
  let cards;

  try {
    cards = await Card.find({ list: listId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get cards.", 500)
    );
  }
  res.json({
    cards,
  });
};

exports.createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { title, list } = req.body;

  const createdCard = new Card({
    title,
    description: "",
    createDate: new Date(),
    updateDate: new Date(),
    status: Status.Active,
    image: "card_image.jpg",
    comments: [],
    priority: Priority.None,
    list,
    assignee: null,
  });

  let foundList;
  try {
    foundList = await List.findById(list);
  } catch (err) {
    const error = new HttpError("Creating card failed, please try again.", 500);
    return next(error);
  }

  try {
    await createdCard.save();
    foundList.cards.push(createdCard);
    await foundList.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create card.", 500)
    );
  }
  res.status(201).json({ card: createdCard });
};

exports.updateCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const cardId = req.params.id;

  let card;
  try {
    card = await Card.findById(cardId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update card.",
      500
    );
    return next(error);
  }

  for (const field in req.body) {
    if (req.body[field] !== undefined) {
      card[field] = req.body[field];
    }
  }

  try {
    await card.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update card.",
      500
    );
    return next(error);
  }

  res.status(200).json({ card });
};

exports.deleteCard = async (req, res, next) => {
  const cardId = req.params.id;

  let card;
  try {
    card = await Card.findById(cardId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete card.",
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError("Could not find a card for this id.", 404);
    return next(error);
  }

  try {
    await card.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete card.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted card." });
};

exports.postComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { id } = req.params;
  const { text, commenter } = req.body;
  let card;

  try {
    card = await Card.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create comment.",
      500
    );
    return next(error);
  }

  const createdComment = {
    text,
    commenter,
  };

  try {
    card.comments.push(createdComment);
    await card.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create comment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ card });
};

exports.updateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { id, index } = req.params;
  const { comment } = req.body;

  let card;
  try {
    card = await Card.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update comment.",
      500
    );
    return next(error);
  }

  if (comment && index >= 0 && index < card.comments.length) {
    card.comments[index] = comment;
  } else {
    return next(new HttpError("Invalid data.", 400));
  }

  try {
    await card.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update comment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ card });
};

exports.deleteComment = async (req, res, next) => {
  const { id, index } = req.params;

  let card;
  try {
    card = await Card.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete comment.",
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError("Could not find a card for this id.", 404);
    return next(error);
  }

  if (index >= 0 && index < card.comments.length) {
    card.comments.splice(index, 1);
  } else {
    return next(new HttpError("Invalid index.", 400));
  }

  try {
    await card.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete comment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted comment." });
};
