const Video = require("../models/Video");

const processVideo = async (videoId, io) => {
  let progress = 0;

  const interval = setInterval(async () => {
    progress += 20;

    // emit progress
    io.emit("videoProgress", {
      videoId,
      progress,
    });

    if (progress >= 100) {
      clearInterval(interval);

      const isSafe = Math.random() > 0.3;

      await Video.findByIdAndUpdate(videoId, {
        status: isSafe ? "safe" : "flagged",
      });

      // final emit
      io.emit("videoCompleted", {
        videoId,
        status: isSafe ? "safe" : "flagged",
      });

      console.log(`Video ${videoId} processed`);
    }
  }, 1000);
};

module.exports = processVideo;
