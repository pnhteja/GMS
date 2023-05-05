const express = require("express");
const Category = require("../models/category");
const router = express.Router();
const { addNewHandler, deleteHandler } = require("../controllers/category");

router.post("/new", addNewHandler);
// router.get("/:name", fetchCategory);
// router.post("/new", createCategory);
router.delete("/delete", deleteHandler);

module.exports = router;
