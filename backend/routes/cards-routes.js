const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const cardsController = require("../controllers/cards-controller");

router.get("/", cardsController.getAllCards);

router.get("/byListId", cardsController.getCardsByListId);

router.get("/:id", cardsController.getCardById);

router.post(
  "/",
  [check("title").not().isEmpty(), check("list").not().isEmpty()],
  cardsController.createCard
);

router.patch("/:id", cardsController.updateCard);

router.delete("/:id", cardsController.deleteCard);

router.post("/:id/comments", cardsController.postComment);

router.patch("/:id/comments/:index", cardsController.updateComment);

router.delete("/:id/comments/:index", cardsController.deleteComment);

module.exports = router;
