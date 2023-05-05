const User = require("../models/user");
const Grievance = require("../models/grievance");

const { getHandlerEmail } = require("../escalation");
const { sendMail } = require("../email/sender");
const {
  getPostedMailSubject,
  getPostedMailBody,
} = require("../email/mailFormats");

async function fetchAllGrievances(req, res) {
  try {
    const grievances = await Grievance.find(
      { visibility: "public" },
      { _id: 1, title: 1, status: 1, user: 1, category: 1, createdAt: 1 }
    )
      .sort({ createdAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function fetchMyGrievances(req, res) {
  try {
    const userId = req.params.userId;
    const grievances = await Grievance.find(
      { user: userId },
      {
        _id: 1,
        title: 1,
        status: 1,
        user: 1,
        category: 1,
        createdAt: 1,
        visibility: 1,
      }
    )
      .sort({ createdAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function fetchAssignedGrievances(req, res) {
  try {
    const assignedToId = req.params.userId;
    const grievances = await Grievance.find(
      { assignedTo: assignedToId },
      {
        _id: 1,
        title: 1,
        status: 1,
        user: 1,
        category: 1,
        deadline: 1,
        visibility: 1,
      }
    )
      .sort({ deadline: "asc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json(error.msg);
  }
}

async function postGrievance(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const grievance = new Grievance({
      category: req.body.category,
      title: req.body.title,
      body: req.body.body,
      visibility: req.body.visibility,
    });
    grievance.user = user;
    const details = await getHandlerEmail(
      grievance.category,
      grievance.escalationLevel
    );
    const handler = await User.findOne({ email: details.email });
    grievance.assignedTo = handler;
    grievance.deadline.setDate(grievance.deadline.getDate() + 7);
    grievance.markModified("deadline");
    await grievance.save();
    const mailBody = getPostedMailBody({
      handlerName: handler.name,
      grievanceTitle: grievance.title,
      userName: user.name,
    });
    await sendMail({
      to: ["pnhteja@gmail.com"],
      subject: getPostedMailSubject(),
      text: mailBody,
      htmlBody: mailBody,
    });
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  fetchAllGrievances,
  fetchMyGrievances,
  fetchAssignedGrievances,
  postGrievance,
};
