const express = require("express");
const app = express();

// middleware để đọc JSON
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.send("Backend Node đang chạy OK 🚀");
});

// route test điểm số
app.get("/score", (req, res) => {
  res.json({ score: 123 });
});

// route nhận điểm (POST)
app.post("/score", (req, res) => {
  const { score } = req.body;
  console.log("Nhận điểm từ client:", score);

  res.json({
    success: true,
    message: "Đã nhận điểm",
    score: score,
  });
});

// chạy server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server chạy tại port", PORT);
});
