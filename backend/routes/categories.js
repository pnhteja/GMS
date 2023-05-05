const express = require("express");
const Category = require("../models/category");
const router = express.Router();
const {
  fetchAllCategories,
  fetchCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categories");

router.get("/all", fetchAllCategories);
router.get("/:name", fetchCategory);
router.post("/new", createCategory);
router.delete("/delete", deleteCategory);

module.exports = router;
