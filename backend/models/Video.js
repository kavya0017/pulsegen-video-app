const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    filename: String,
    filepath: String,
    status: {
      type: String,
      enum: ["processing", "safe", "flagged"],
      default: "processing",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
