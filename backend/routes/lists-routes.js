const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const listsController = require("../controllers/lists-controller");

router.get("/", listsController.getAllLists);

router.post("/", [check("title").not().isEmpty()], listsController.createList);

router.delete("/:id", listsController.deleteList);

module.exports = router;
