const User = require("../models/user");
const Grievance = require("../models/grievance");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");
const Comment = require("../models/comment");

const { getHandlerEscalationLevel } = require("../escalation");
const { sendMail } = require("../email/sender");
const {
  getStatusChangeMailBody,
  getStatusChangeMailSubject,
  getEscalationMailBody,
  getEscalationMailSubject,
  getEscalationUserMailBody,
} = require("../email/mailFormats");

async function getGrievanceInfo(req, res) {
  try {
    const grievanceId = req.params.grievanceId;
    const grievance = await Grievance.findOne({ _id: grievanceId }, { __v: 0 })
      .populate("user", { _id: 0, __v: 0 })
      .populate("assignedTo", { _id: 0, __v: 0 });
    res.status(200).json(grievance);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function handleGrievance(req, res) {
  try {
    const grievanceId = req.body.grievanceId;
    const grievance = await Grievance.findOne({ _id: grievanceId }).populate(
      "user",
      { _id: 0, __v: 0 }
    );
    grievance.status = "handled";
    await grievance.save();
    const mailContent = getStatusChangeMailBody({
      userName: grievance.user.name,
      grievanceTitle: grievance.title,
    });
    await sendMail({
      to: ["pnhteja@gmail.com"],
      subject: getStatusChangeMailSubject(),
      text: mailContent,
      htmlBody: mailContent,
    });
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function escalateGrievance(req, res) {
  try {
    const grievanceId = req.body.grievanceId;
    const grievance = await Grievance.findOne({ _id: grievanceId }).populate(
      "user",
      { _id: 0, __v: 0 }
    );

    // const escalation = await getHandlerEmail(
    //   grievance.category,
    //   grievance.escalationLevel + 1
    // );

    const escalation = await getHandlerEscalationLevel(
      grievance.category,
      req.body.handlerEmail
    );

    if (escalation.status === "success") {
      grievance.escalationLevel = escalation.escalationLevel;
      const handler = await User.findOne({ email: req.body.handlerEmail });
      grievance.assignedTo = handler;
      await grievance.save();
      const mailContent = getEscalationMailBody({
        userName: grievance.user.name,
        grievanceTitle: grievance.title,
        handlerName: handler.name,
      });
      await sendMail({
        to: ["pnhteja@gmail.com"],
        subject: getEscalationMailSubject(),
        text: mailContent,
        htmlBody: mailContent,
      });
      const userMailContent = getEscalationUserMailBody({
        userName: grievance.user.name,
        grievanceTitle: grievance.title,
        handlerName: handler.name,
      });
      await sendMail({
        to: ["pnhteja@gmail.com"],
        subject: getEscalationMailSubject(),
        text: userMailContent,
        htmlBody: userMailContent,
      });
      res.status(201).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Cannot escalate further",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteGrievance(req, res) {
  try {
    const grievanceId = req.body.grievanceId;
    await Grievance.findOneAndDelete({ _id: grievanceId });
    await Comment.deleteMany({ grievance: grievanceId });
    await Upvote.deleteMany({ grievance: grievanceId });
    await Downvote.deleteMany({ grievance: grievanceId });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  getGrievanceInfo,
  handleGrievance,
  escalateGrievance,
  deleteGrievance,
};
