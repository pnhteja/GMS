const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Suppressing the warning
mongoose.set("strictQuery", true);

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/gms";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to Database...");
});

const app = express();
const port = 5000;

// app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const authRoutes = require("./routes/auth");
const grievancesRoutes = require("./routes/grievances");
const grievanceRoutes = require("./routes/grievance");
const voteRoutes = require("./routes/vote");
const commentsRoutes = require("./routes/comments");
const feedbackRoutes = require("./routes/feedback");
const categoriesRoutes = require("./routes/categories");
const categoryRoutes = require("./routes/category");

app.use("/auth", authRoutes);
app.use("/grievances", grievancesRoutes);
app.use("/grievance", grievanceRoutes);
app.use("/grievance/vote", voteRoutes);
app.use("/grievance/comments", commentsRoutes);
app.use("/grievance/feedback", feedbackRoutes);
app.use("/categories", categoriesRoutes);
app.use("/category", categoryRoutes);

// app.all("*", (req, res) => {
//   console.log(req.originalUrl);
// });

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
