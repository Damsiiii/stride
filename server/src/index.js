require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contacts");
const memberRoutes = require("./routes/members");
const eventRoutes = require("./routes/events");
const galleryRoutes = require("./routes/gallery");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, health checks)
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin) || process.env.CLIENT_URL === "*") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ── Routes ─────────────────────────────────────────────────
app.use("/api/contacts", contactRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Server Start & Optional MongoDB Connection ─────────────
app.listen(PORT, () => {
  console.log(`🚀  thestrideclub API running on http://localhost:${PORT}`);
});

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("✅  Connected to MongoDB Database");
    })
    .catch((err) => {
      console.warn("⚠️  MongoDB connection warning:", err.message);
    });
} else {
  console.log("ℹ️  Running in standalone mode (No MONGODB_URI configured)");
}
