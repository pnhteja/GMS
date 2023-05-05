const Grievance = require("../models/grievance");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");

async function getVoteStatus(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function upVote(req, res) {
  try {
    const grievance = await Grievance.findById(req.body.grievanceId);
    ++grievance.upvotesCount;
    await grievance.save();

    const upvote = new Upvote({
      user: req.body.userId,
      grievance: req.body.grievanceId,
    });
    await upvote.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function downVote(req, res) {
  try {
    const grievance = await Grievance.findById(req.body.grievanceId);
    ++grievance.downvotesCount;
    await grievance.save();

    const downvote = new Downvote({
      user: req.body.userId,
      grievance: req.body.grievanceId,
    });
    await downvote.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function undoUpVote(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function undoDownVote(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

module.exports = {
  getVoteStatus,
  upVote,
  downVote,
  undoUpVote,
  undoDownVote,
};
