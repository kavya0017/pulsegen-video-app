import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/api";

// socket connection (single instance)
const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // fetch user's videos
  const fetchVideos = async () => {
    try {
      const res = await API.get("/api/videos/my-videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos");
    }
  };

  // upload video
  const uploadVideo = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    try {
      setUploading(true);
      await API.post("/api/videos/upload", formData);
      setTitle("");
      setFile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    // listen for live status updates
    socket.on("video-status", ({ videoId, status }) => {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId ? { ...v, status } : v
        )
      );
    });

    return () => socket.off("video-status");
  }, []);

  return (
    <div style={container}>
      <h1>Dashboard</h1>

      {/* Upload Section */}
      <form onSubmit={uploadVideo} style={uploadBox}>
        <input
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={uploading} style={button}>
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {/* Video List */}
      <h2>My Videos</h2>

      {videos.length === 0 && <p>No videos uploaded yet.</p>}

      {videos.map((v) => (
        <div key={v._id} style={videoCard}>
          <strong>{v.title}</strong>

          <p>
            Status:{" "}
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "14px",
                background:
                  v.status === "safe"
                    ? "#d1fae5"
                    : v.status === "flagged"
                    ? "#fee2e2"
                    : "#fef3c7",
              }}
            >
              {v.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

/* ======================
   SIMPLE STYLES
====================== */
const container = {
  padding: 40,
  maxWidth: 600,
  margin: "auto",
};

const uploadBox = {
  marginBottom: 30,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const input = {
  padding: 8,
};

const button = {
  padding: 10,
  cursor: "pointer",
};

const videoCard = {
  border: "1px solid #ddd",
  padding: 12,
  marginBottom: 10,
  borderRadius: 6,
};


