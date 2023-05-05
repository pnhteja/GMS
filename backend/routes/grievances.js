const express = require("express");
const router = express.Router();
const {
  fetchAllGrievances,
  fetchMyGrievances,
  fetchAssignedGrievances,
  postGrievance,
} = require("../controllers/grievances");

router.get("/all", fetchAllGrievances);
router.get("/my/:userId", fetchMyGrievances);
router.get("/assigned/:userId", fetchAssignedGrievances);
router.post("/new", postGrievance);

module.exports = router;
