import express from "express";
import http from "http";
import cors from "cors";
import { initSocket } from "./config/socket.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Init Socket
initSocket(server);

app.get("/", (req, res) => {
  res.send("Cosmos Backend Running 🚀");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});