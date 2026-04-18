require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { generalLimiter } = require("./middlewares/rateLimit");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

// ─── Route Imports ─────────────────────────────────────────
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const vendorRoutes = require("./routes/vendor.routes");
const certRoutes = require("./routes/certification.routes");
const produceRoutes = require("./routes/produce.routes");
const orderRoutes = require("./routes/order.routes");
const rentalRoutes = require("./routes/rental.routes");
const forumRoutes = require("./routes/forum.routes");
const plantRoutes = require("./routes/plant.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ─── Security & Global Middleware ──────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// ─── Health Check ──────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Urban Farming Platform API is running 🌱",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.get("/", (req, res) => {
  res.json({ greeting: "Welcome to the Urban Farming Platform API! 🌱" });
});

// ─── API Routes ────────────────────────────────────────────
const API = "/api/v1";

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/users`, userRoutes);
app.use(`${API}/vendors`, vendorRoutes);
app.use(`${API}/certifications`, certRoutes);
app.use(`${API}/produce`, produceRoutes);
// app.use(`${API}/orders`, orderRoutes);
app.use(`${API}/rentals`, rentalRoutes);
// app.use(`${API}/forum`, forumRoutes);
app.use(`${API}/plants`, plantRoutes);
app.use(`${API}/admin`, adminRoutes);

// ─── Error Handling ────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
