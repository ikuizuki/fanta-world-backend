const express = require("express");
const app = express();

app.use(express.json());

// API test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
