const express = require("express");
const cors = require("cors");

const app = express();

/* CORS */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

/* test api */
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});
//database
const db_password = process.env.DB_PASSWORD;
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://ikuizukidong_db_user:" +
  db_password +
  "@cluster0.5djfxz7.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let playersCollection; //chứa database

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("fanta_world"); // tên database của bạn
    playersCollection = db.collection("players"); // collection players (database)
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
}
connectDB();

//lấy vị trí
app.get("/api/player/:playerId", async (req, res) => {
  const { playerId } = req.params;
  if (!playersCollection) {
    return res.status(500).json({ error: "Database not connected" });
  }
  let player = await playersCollection.findOne({ playerId });
  if (!player) {
    player = { playerId, x: 100, y: 100 };
    await playersCollection.insertOne(player);
  }

  res.json({ x: player.x, y: player.y });
});
/* lưu vị trí */
app.post("/api/player/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { x, y } = req.body;
  if (!playersCollection) {
    return res.status(500).json({ error: "Database not connected" });
  }
  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Invalid position" });
  }
  await playersCollection.updateOne(
    { playerId },
    { $set: { x, y } },
    { upsert: true },
  );
  res.json({ status: "saved" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
