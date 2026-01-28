const express = require("express");
const cors = require("cors");

const app = express();

/* CORS */
app.use(
  cors({
    origin: "https://fanta-world-gamma.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

/* test api */
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});
//lấy vị trí
const players = {}; // tạm thời (sau này thay bằng DB)
app.get("/api/player/:playerId", (req, res) => {
  const { playerId } = req.params;

  if (!players[playerId]) {
    players[playerId] = {
      x: 100,
      y: 100,
    };
  }
  playerPosition = players[playerId];
  console.log("Player position:", playerPosition);

  res.json(players[playerId]);
});
/* lưu vị trí */
app.post("/api/player/:playerId", (req, res) => {
  const { playerId } = req.params;
  const { x, y } = req.body;

  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Invalid position" });
  }
  playerPosition = { x, y };
  players[playerId] = playerPosition;
  console.log("Player position:", playerPosition);

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
