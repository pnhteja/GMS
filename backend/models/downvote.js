const mongoose = require("mongoose");

const downvoteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    grievance: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Grievance",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Downvote", downvoteSchema);
