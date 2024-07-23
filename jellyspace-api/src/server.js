const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const otpRoute = require("./routes/otpRoute");
const projectRoute = require("./routes/projectRoute");
const emailRoute = require("./routes/emailRoute");
const bidRoute = require("./routes/bidRoute");
const cors = require("cors");
const app = express();

// Load environment variables from .env file
dotenv.config();

// Define port and MongoDB connection URL from environment variables
const port = process.env.PORT || 8080;
const MongoURL = process.env.MONGO_URL;

// Configure CORS
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", userRoute);
app.use("/api", otpRoute);
app.use("/api", projectRoute);
app.use("/api", emailRoute);
app.use("/api", bidRoute);

// Connect to MongoDB
mongoose
  .connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Recommended to avoid deprecation warnings
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is active on port ${port}`);
});

module.exports = app;
