const express = require("express");
const router = express.Router();
const UserController = require("./controller/userController");
const authMiddleware = require("./middleware/auth.middleware");

module.exports = router;

const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/index");
const userRoutes = require("./routes/index");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/info", (req, res) => {
  res.json({
    data: {
      fullName: "Đỗ Quốc Khánh",
      studentCode: "QE170058",
    },
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
