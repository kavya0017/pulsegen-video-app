const express = require("express");
const multer = require("multer");
const path = require("path");
const Video = require("../models/Video");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================
   MULTER CONFIG
=========================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"));
    }
  },
});

/* ===========================
   POST /api/videos/upload
=========================== */
router.post(
  "/upload",
  authMiddleware,
  upload.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }

      const video = new Video({
        title: req.body.title || "Untitled Video",
        filename: req.file.filename,
        filepath: req.file.path,
        status: "processing",
        uploadedBy: req.user.id,
      });

      await video.save();

      // 🔴 SOCKET.IO EMIT (processing started)
      const io = req.app.get("io");
      io.emit("video-status", {
        videoId: video._id,
        status: "processing",
      });

      // 🔁 Simulate sensitivity analysis
      setTimeout(async () => {
        video.status = Math.random() > 0.2 ? "safe" : "flagged";
        await video.save();

        // 🔴 SOCKET.IO EMIT (final status)
        io.emit("video-status", {
          videoId: video._id,
          status: video.status,
        });
      }, 5000);

      res.json({
        message: "Video uploaded successfully",
        video,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

/* ===========================
   GET /api/videos/my-videos
=========================== */
router.get("/my-videos", authMiddleware, async (req, res) => {
  try {
    const videos = await Video.find({
      uploadedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
