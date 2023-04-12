const express = require("express");

const User = require("../models/user");
const Grievance = require("../models/grievance");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const grievances = await Grievance.find(
      {},
      { _id: 1, title: 1, status: 1, user: 1 }
    )
      .sort({ createdAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {}
});

router.get("/my/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const grievances = await Grievance.find(
      { user: userId },
      { _id: 1, title: 1, status: 1, user: 1 }
    )
      .sort({ createdAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {}
});

router.get("/assigned/:userId", async (req, res) => {
  try {
    const assignedToId = req.params.userId;
    const grievances = await Grievance.find(
      { assignedTo: assignedToId },
      { _id: 1, title: 1, status: 1, user: 1 }
    )
      .sort({ createdAt: "desc" })
      .populate("user", { _id: 0, name: 1, email: 1 });
    res.status(200).json(grievances);
  } catch (error) {}
});

router.post("/new", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const grievance = new Grievance({
      category: req.body.category,
      title: req.body.title,
      body: req.body.body,
    });
    grievance.user = user;
    grievance.assignedTo = user;
    grievance.status = "pending";
    await grievance.save();
    res.status(201).json({
      status: "success",
      data: {
        grievance,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
});

module.exports = router;
