const express = require("express");

const {
  getVoteStatus,
  upVote,
  downVote,
  undoUpVote,
  undoDownVote,
} = require("../controllers/vote");

const router = express.Router();

router.post("/", getVoteStatus);
router.post("/up", upVote);
router.post("/down", downVote);
router.delete("/up", undoUpVote);
router.delete("/down", undoDownVote);

module.exports = router;
