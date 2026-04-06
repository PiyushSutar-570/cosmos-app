// index.js

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { initSocket } from "./config/socket.js";
import { connectDB } from "./config/db.js";

// ✅ Load environment variables
dotenv.config();

await connectDB();

const app = express();

// ✅ CORS setup (important for frontend + socket)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO
initSocket(server);

// ✅ Health route
app.get("/", (req, res) => {
  res.send("Cosmos Backend Running 🚀");
});

// ✅ Port config
const PORT = process.env.PORT || 5000;

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Global error handling (important)
server.on("error", (err) => {
  console.error("❌ Server Error:", err);
});