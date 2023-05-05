function getPostedMailBody(content) {
  return (
    `<p>Respected ${content.handlerName},</p>` +
    `<p>You have been assigned an grievance titled "${content.grievanceTitle}", posted by '${content.userName}'.` +
    ` Please go through the GMS portal to know more about details of grievance.` +
    `<p>Thanks and Regards, <br/> GMS</p>`
  );
}

function getPostedMailSubject() {
  return "Update from GMS";
}

function getStatusChangeMailBody(content) {
  return (
    `<p>Respected ${content.userName},</p>` +
    `<p>There has been a change in status of your grievance titled "${content.grievanceTitle}" from pending to handled.` +
    ` Please take a look.</p>` +
    `<p>Thanks and Regards, <br/> GMS</p>`
  );
}

function getStatusChangeMailSubject() {
  return "Status Update from GMS";
}

function getDeadlineMailBody(content) {
  return (
    `<p>Respected ${content.handlerName},</p>` +
    `<p>A grievance assigned to you titled "${content.grievanceTitle}", posted by '${content.userName}',` +
    ` is approaching it's deadline. Please resolve it or escalate it to next level.</p>` +
    `<p>Thanks and Regards, <br/> GMS</p>`
  );
}

function getDeadlineMailSubject() {
  return "Deadline Reminder from GMS";
}

function getEscalationUserMailBody(content) {
  return (
    `<p>Respected ${content.userName},</p>` +
    `<p>Your grievance titled "${content.grievanceTitle}" has been escalated to '${content.handlerName}'.` +
    `<p>Thanks and Regards, <br/> GMS</p>`
  );
}

function getEscalationMailBody(content) {
  return (
    `<p>Respected ${content.handlerName},</p>` +
    `<p>You have been assigned an escalated grievance titled "${content.grievanceTitle}", posted by '${content.userName}'.` +
    ` Please go through the GMS portal to know more about details of grievance.` +
    `<p>Thanks and Regards, <br/> GMS</p>`
  );
}

function getEscalationMailSubject() {
  return "Escalation Update from GMS";
}

module.exports = {
  getStatusChangeMailBody,
  getStatusChangeMailSubject,
  getDeadlineMailBody,
  getDeadlineMailSubject,
  getEscalationMailBody,
  getEscalationMailSubject,
  getPostedMailBody,
  getPostedMailSubject,
  getEscalationUserMailBody,
};
