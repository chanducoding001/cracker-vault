require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const uploadCsvRoutes = require("./routes/uploadCsvRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// Database Connection
connectDB();

// Trust proxy (important for Render, Railway, Nginx, etc.)
app.set("trust proxy", 1);

// // Allowed Origins
// const allowedOrigins = [
//   "http://localhost:5173",
//   ...(process.env.CLIENT_URL?.split(",") || []),
// ];

// // CORS
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow Postman, mobile apps, server-to-server requests
//       if (!origin) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error(`CORS blocked for origin: ${origin}`));
//     },
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CLIENT_URL?.split(",").map(url => url.trim()) || []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS Origin:", origin);

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(process.env.AUTH_MAIN_URL || "/api/auth",authRoutes);
app.use(process.env.UPLOAD_CSV_MAIN_URL || "/api/csv", uploadCsvRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV || "development",
    message: "Server is running successfully",
  });
});



// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} [${
      process.env.NODE_ENV || "development"
    }]`
  );
});

