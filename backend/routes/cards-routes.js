const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const cardsController = require("../controllers/cards-controller");

router.get("/", cardsController.getAllCards);

router.get("/:id", cardsController.getCardsByListId);

router.post(
  "/",
  [check("title").not().isEmpty(), check("list").not().isEmpty()],
  cardsController.createCard
);

router.patch("/:id", cardsController.updateCard);

router.delete("/:id", cardsController.deleteCard);

router.patch("/:id/comments", cardsController.updateComment);

router.delete("/:id/comments", cardsController.deleteComment);

module.exports = router;
