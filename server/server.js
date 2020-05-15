const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

require("dotenv").config();

// Setup Express
const app = express();
const port = process.env.PORT || 5000;

// Setup cors
app.use(cors());
app.use(express.json());

// Connect to Mongoose
const uri = process.env.mongoURI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Setup App Routes
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build/")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "client/build/index.html"));
  });
}

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
