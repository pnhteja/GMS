const express = require("express");

const Grievance = require("../models/grievance");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");

const router = express.Router();

router.post("/", async (req, res) => {
  const upvote = await Upvote.findOne({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });

  const downvote = await Downvote.findOne({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });

  if (!upvote && !downvote) {
    res.status(200).json({
      upvoted: false,
      downvoted: false,
    });
  } else if (upvote && !downvote) {
    res.status(200).json({
      upvoted: true,
      downvoted: false,
    });
  } else if (!upvote && downvote) {
    res.status(200).json({
      upvoted: false,
      downvoted: true,
    });
  }
});

router.post("/up", async (req, res) => {
  const grievance = await Grievance.findById(req.body.grievanceId);
  ++grievance.upvotesCount;
  await grievance.save();

  const upvote = new Upvote({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });
  upvote.save();
  res.status(200).json({
    status: "success",
  });
});

router.post("/down", async (req, res) => {
  const grievance = await Grievance.findById(req.body.grievanceId);
  ++grievance.downvotesCount;
  await grievance.save();

  const downvote = new Downvote({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });
  downvote.save();
  res.status(200).json({
    status: "success",
  });
});

router.delete("/up", async (req, res) => {
  const grievance = await Grievance.findById(req.body.grievanceId);
  --grievance.upvotesCount;
  await grievance.save();

  const upvote = await Upvote.findOneAndDelete({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });
  res.status(200).json({
    status: "success",
  });
});

router.delete("/down", async (req, res) => {
  const grievance = await Grievance.findById(req.body.grievanceId);
  --grievance.downvotesCount;
  await grievance.save();

  const downvote = await Downvote.findOneAndDelete({
    user: req.body.userId,
    grievance: req.body.grievanceId,
  });

  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
