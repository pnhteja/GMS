const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Suppressing the warning
mongoose.set("strictQuery", true);

/*---------- Connecting to Database ----------*/
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/gms";

mongoose.connect(dbUrl);

// Error Handling
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to Database...");
});

const app = express();
const port = 5000;

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/*---------- Requiring Routes ----------*/
const authRoutes = require("./routes/auth");
const grievancesRoutes = require("./routes/grievances");
const grievanceRoutes = require("./routes/grievance");
const voteRoutes = require("./routes/vote");
const commentsRoutes = require("./routes/comments");

app.use("/auth", authRoutes);
app.use("/grievances", grievancesRoutes);
app.use("/grievance/info", grievanceRoutes);
app.use("/grievance/vote", voteRoutes);
app.use("/grievance/comments", commentsRoutes);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
