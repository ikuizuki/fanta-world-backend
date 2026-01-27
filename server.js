const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json()); // QUAN TRỌNG

app.use(
  cors({
    origin: "https://fanta-world-gamma.vercel.app",
  }),
);

// test api
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});
//trả về vị trí
app.get("/api/player/position", (req, res) => {
  res.json(playerPosition);
});
// lưu vị trí player (tạm thời)
let playerPosition = { x: 0, y: 0 };

app.post("/api/player/position", (req, res) => {
  const { x, y } = req.body;

  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Invalid position" });
  }

  playerPosition.x = x;
  playerPosition.y = y;

  console.log("Player position:", playerPosition);

  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
