const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const userData = await User.findOne(
    { email: email },
    { _id: 1, name: 1, email: 1 }
  );
  if (userData == null) {
    res.status(401).json({
      status: "fail",
      msg: "Invalid IITH email",
    });
  } else {
    res.status(200).json(userData);
  }
});

module.exports = router;
