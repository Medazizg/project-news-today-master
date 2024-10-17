const express = require("express");
const scheduleJobs = require("./schedule-jobs");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Load MongoDB URL from environment variables
const mongoUrl = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

// Connect to MongoDB with error handling
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.error("Database connection error:", err));

const database = mongoose.connection;

// Log errors on the database connection
database.on("error", (err) => {
  console.error("Database error:", err);
});

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS setup to allow all origins
app.use(cors({ origin: "*" }));

// Start schedule jobs
scheduleJobs();

// Simple route to check API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to aziz API." });
});

// Import and use routes
require("./routes/news")(app);
require("./routes/user")(app);

// Start Express server on port 5000
const PORT = process.env.PORT || 5000; // Added PORT as env variable for flexibility
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
