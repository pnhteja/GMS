const Feedback = require("../models/feedback");

async function fetchAllFeedbackComments(req, res) {
  try {
    const comments = await Feedback.find(
      { grievance: req.params.grievanceId },
      {
        _id: 0,
        user: 1,
        text: 1,
        updatedAt: 1,
      }
    )
      .sort({ updatedAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function fetchMyFeedbackComments(req, res) {
  try {
    const comments = await Feedback.find(
      { user: req.body.userId, grievance: req.body.grievanceId },
      {
        _id: 0,
        user: 1,
        text: 1,
        updatedAt: 1,
      }
    )
      .sort({ updatedAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function postMyFeedbackComment(req, res) {
  try {
    const comment = new Feedback({
      user: req.body.userId,
      grievance: req.body.grievanceId,
      text: req.body.text,
    });

    await comment.save();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteMyFeedbackComment(req, res) {
  try {
    const comment = await Feedback.findOneAndDelete({
      user: req.body.userId,
      grievance: req.body.grievanceId,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  fetchAllFeedbackComments,
  fetchMyFeedbackComments,
  postMyFeedbackComment,
  deleteMyFeedbackComment,
};
