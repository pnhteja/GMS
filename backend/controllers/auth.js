const User = require("../models/user");

async function validateAuthInfo(req, res) {
  try {
    const email = req.body.email;
    const user = await User.findOne(
      { email: email },
      { _id: 1, name: 1, email: 1 }
    );
    if (user != null) {
      res.status(200).json(user);
    } else {
      res.status(401).json({
        msg: "Invalid IITH email",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { validateAuthInfo };
