const express = require("express");

const Grievance = require("../models/grievance");

const router = express.Router();

router.get("/:grievanceId", async (req, res) => {
  const grievanceId = req.params.grievanceId;
  const grievance = await Grievance.findOne({ _id: grievanceId }, { __v: 0 })
    .populate("user", { _id: 0, __v: 0 })
    .populate("assignedTo", { _id: 0, __v: 0 });
  console.log(grievance);
  res.status(200).json(grievance);
});

module.exports = router;
