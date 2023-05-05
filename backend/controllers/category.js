const Category = require("../models/category");

async function addNewHandler(req, res) {
  try {
    const handlerEmail = req.body.handlerEmail;
    const escalationLevel = req.body.escalationLevel;
    const categoryName = req.body.categoryName;

    const category = await Category.findOne(
      { name: categoryName },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    let updatedChain = category.escalationChain;
    updatedChain.splice(escalationLevel, 0, handlerEmail);
    await Category.updateOne(
      { name: categoryName },
      { escalationChain: updatedChain }
    );
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteHandler(req, res) {
  try {
    const handlerEmail = req.body.email;
    const categoryName = req.body.categoryName;
    const escalationLevel = req.body.escalationLevel;
    const category = await Category.findOne(
      { name: categoryName },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    let updatedChain = category.escalationChain;
    updatedChain.splice(escalationLevel, 1);
    await Category.updateOne(
      { name: categoryName },
      { escalationChain: updatedChain }
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  addNewHandler,
  deleteHandler,
};
