const express = require("express");
const router = express.Router();
const {
  getGrievanceInfo,
  handleGrievance,
  escalateGrievance,
  deleteGrievance,
} = require("../controllers/grievance");

router.get("/info/:grievanceId", getGrievanceInfo);
router.post("/handle", handleGrievance);
router.post("/escalate", escalateGrievance);
router.delete("/delete", deleteGrievance);

module.exports = router;
