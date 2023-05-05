const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();
const {
  fetchAllComments,
  fetchMyComments,
  postMyComment,
  deleteMyComment,
} = require("../controllers/comments");

router.get("/all/:grievanceId", fetchAllComments);
router.post("/my", fetchMyComments);
router.post("/new", postMyComment);
router.delete("/my", deleteMyComment);

module.exports = router;
