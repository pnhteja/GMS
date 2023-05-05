const express = require("express");
const User = require("../models/user");
const { validateAuthInfo } = require("../controllers/auth");

const router = express.Router();

router.post("/", validateAuthInfo);

module.exports = router;
