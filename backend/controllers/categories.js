const Category = require("../models/category");

async function fetchAllCategories(req, res) {
  try {
    const categories = await Category.find({}, { _id: 0, name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function fetchCategory(req, res) {
  try {
    const categories = await Category.findOne(
      { name: req.params.name },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function createCategory(req, res) {
  try {
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.deleteOne({
      name: req.body.name,
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

module.exports = {
  fetchAllCategories,
  fetchCategory,
  createCategory,
  deleteCategory,
};
