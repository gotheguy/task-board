const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.post(
  "/",
  [check("password").not().isEmpty()],
  usersController.createUser
);

router.patch("/:id", usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
