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

/* lưu vị trí player */
let playerPosition = { x: 0, y: 0 };

/* test api */
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

/* lấy vị trí */
app.get("/api/player/position", (req, res) => {
  res.json(playerPosition);
});

/* lưu vị trí */
app.post("/api/player/position", (req, res) => {
  const { x, y } = req.body;

  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Invalid position" });
  }

  playerPosition = { x, y };
  console.log("Player position:", playerPosition);

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
