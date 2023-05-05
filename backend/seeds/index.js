const mongoose = require("mongoose");

const User = require("../models/user");
const Grievance = require("../models/grievance");
const Comment = require("../models/comment");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");
const Category = require("../models/category");

const { usersData, grievancesData, categories } = require("./seedHelper");
const { getHandlerEmail } = require("../escalation");

// Suppressing the warning
mongoose.set("strictQuery", true);

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/gms";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to Database...");
});

const clearDB = async () => {
  await User.deleteMany({});
  await Grievance.deleteMany({});
  await Comment.deleteMany({});
  await Upvote.deleteMany({});
  await Downvote.deleteMany({});
  await Category.deleteMany({});
};

const insertUsers = async () => {
  for (let userData of usersData) {
    const user = new User(userData);
    await user.save();
  }
};

const insertGrievances = async () => {
  for (let grievanceData of grievancesData) {
    const grievance = new Grievance(grievanceData);
    const user = await User.findOne({ email: grievanceData.email });
    grievance.user = user;
    const details = await getHandlerEmail(
      grievance.category,
      grievance.escalationLevel
    );

    const handler = await User.findOne({ email: details.email });
    grievance.assignedTo = handler;
    grievance.deadline.setDate(grievance.deadline.getDate() + 7);
    grievance.markModified("deadline");
    await grievance.save();
  }
};

const insertCategories = async () => {
  for (categoryDetails of categories) {
    const category = new Category(categoryDetails);
    await category.save();
  }
};

const seedDB = async () => {
  await clearDB();
  await insertUsers();
  await insertCategories();
  await insertGrievances();
};

seedDB().then(() => {
  console.log("Closing the Connection...");
  db.close();
});
