const { validationResult } = require("express-validator");

const User = require("../models/user");
const Card = require("../models/user");
const HttpError = require("../models/http-error");
const ColorGradients = require("../models/colorGradients");

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get users.", 500)
    );
  }
  res.json({
    users,
  });
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get user.", 500)
    );
  }
  res.json({
    user,
  });
};

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { fullName, userName, email, password } = req.body;
  const { colorGradient1, colorGradient2 } = getAvatarGradients();

  const createdUser = new User({
    fullName,
    userName,
    email,
    password,
    avatar: {
      initials: getInitials(fullName),
      imageUrl: "",
      colorGradient1,
      colorGradient2,
    },
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create user.", 500)
    );
  }
  res.status(201).json({ user: createdUser });
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  for (const field in req.body) {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user });
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find a user for this id.", 404);
    return next(error);
  }

  try {
    await user.deleteOne();
    await Card.deleteMany({ assignee: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted user." });
};

function getInitials(fullName) {
  const nameParts = fullName.split(" ");
  let initials = "";

  for (const part of nameParts) {
    if (part) {
      initials += part[0];
    }
  }
  return initials.toUpperCase();
}

function getAvatarGradients() {
  const randomIndex = Math.floor(Math.random() * ColorGradients.length);
  const randomGradientPair = ColorGradients[randomIndex];

  return {
    colorGradient1: randomGradientPair.colorGradient1,
    colorGradient2: randomGradientPair.colorGradient2,
  };
}
