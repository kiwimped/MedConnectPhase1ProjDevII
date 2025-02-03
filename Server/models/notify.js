

const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const NotificationModel = mongoose.model("Notification", notificationSchema);
module.exports = NotificationModel;
