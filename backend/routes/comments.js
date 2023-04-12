const express = require("express");

const Comment = require("../models/comment");

const router = express.Router();

router.get("/all/:grievanceId", async (req, res) => {
  const comments = await Comment.find(
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
});

router.post("/my", async (req, res) => {
  const comment = await Comment.findOne(
    { user: req.body.userId, grievance: req.body.grievanceId },
    {
      _id: 0,
      text: 1,
      updatedAt: 1,
    }
  );

  res.status(200).json(comment);
});

router.delete("/my", async (req, res) => {
  const comment = await Comment.findOneAndDelete({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });

  res.status(200).json({
    status: "success",
  });
});

router.post("/new", async (req, res) => {
  const comment = new Comment({
    user: req.body.userId,
    grievance: req.body.grievanceId,
    text: req.body.text,
  });

  comment.save();

  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
