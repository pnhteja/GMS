const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const schedule = require("node-schedule");
const mongoose = require("mongoose");
const Grievance = require("../models/grievance");
const User = require("../models/user");
const { getHandlerEmail } = require("../escalation");
const { sendMail } = require("./sender");
const {
  getDeadlineMailBody,
  getDeadlineMailSubject,
  getEscalationMailBody,
  getEscalationMailSubject,
  getEscalationUserMailBody,
} = require("./mailFormats");

const dbUrl = process.env.DB_URL;

schedule.scheduleJob("1 * * * *", async function () {
  mongoose.connect(dbUrl);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", () => {
    console.log("Connected to Database...");
  });

  const grievances = await Grievance.find({}, { __v: 0 })
    .populate("user", { _id: 0, __v: 0 })
    .populate("assignedTo", { _id: 0, __v: 0 });

  const currentDate = new Date();

  // let count = 0;
  for (let grievance of grievances) {
    // if (count === 1) {
    //   break;
    // }

    if (grievance.status !== "handled") {
      const deadlineDate = new Date(grievance.deadline);
      const remainingTime = 1;

      // Deadline Email
      if ((deadlineDate - currentDate) / (1000 * 3600 * 24) < remainingTime) {
        // ++count;
        const mailContent = getDeadlineMailBody({
          userName: grievance.user.name,
          grievanceTitle: grievance.title,
          handlerName: grievance.assignedTo.name,
        });
        await sendMail({
          to: ["pnhteja@gmail.com"],
          subject: getDeadlineMailSubject(),
          text: mailContent,
          htmlBody: mailContent,
        });
      }

      // Automatic Escalation
      else {
        const escalation = await getHandlerEmail(
          grievance.category,
          grievance.escalationLevel + 1
        );

        if (escalation.status === "success") {
          // ++count;
          ++grievance.escalationLevel;
          const handler = await User.findOne({ email: escalation.email });
          grievance.assignedTo = handler;
          await grievance.save();
          const mailContent = getEscalationMailBody({
            userName: grievance.user.name,
            grievanceTitle: grievance.title,
            handlerName: grievance.assignedTo.name,
          });
          await sendMail({
            to: ["pnhteja@gmail.com"],
            subject: getEscalationMailSubject(),
            text: mailContent,
            htmlBody: mailContent,
          });
          const userMailContent = getEscalationUserMailBody({
            userName: grievance.user.name,
            grievanceTitle: grievance.title,
            handlerName: handler.name,
          });
          await sendMail({
            to: ["pnhteja@gmail.com"],
            subject: getEscalationMailSubject(),
            text: userMailContent,
            htmlBody: userMailContent,
          });
        }
      }
    }
  }

  await db.close();
});
