const express = require("express");
const Feedback = require("../models/feedback");
const {
  fetchMyFeedbackComments,
  postMyFeedbackComment,
  deleteMyFeedbackComment,
  fetchAllFeedbackComments,
} = require("../controllers/feedback");
const router = express.Router();

router.get("/all/:grievanceId", fetchAllFeedbackComments);
router.post("/my", fetchMyFeedbackComments);
router.post("/new", postMyFeedbackComment);
router.delete("/my", deleteMyFeedbackComment);

module.exports = router;
