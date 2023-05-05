const Category = require("./models/category");

async function getHandlerEmail(categoryName, escalationLevel) {
  try {
    const category = await Category.findOne(
      { name: categoryName },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    if (category.escalationChain.length - 1 >= escalationLevel) {
      return {
        email: category.escalationChain[escalationLevel],
        status: "success",
      };
    } else {
      return {
        status: "failed",
      };
    }
  } catch (error) {
    return {
      status: "failed",
    };
  }
}

async function getHandlerEscalationLevel(categoryName, handlerEmail) {
  try {
    const category = await Category.findOne(
      { name: categoryName },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    for (let level = 0; level < category.escalationChain.length; level += 1) {
      if (category.escalationChain[level] == handlerEmail) {
        return {
          status: "success",
          escalationLevel: level,
        };
      }
    }

    return {
      status: "failed",
    };
  } catch (error) {
    return {
      status: "failed",
    };
  }
}

module.exports = { getHandlerEmail, getHandlerEscalationLevel };
