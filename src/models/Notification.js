const mongoose = require("mongoose");
const { Schema } = mongoose;


const NotificationTypes = ["sms", "email", "push", "whatsapp", "all"];
const EventTypes = ["transactional", "promotional"];
const NotificationStatus = {
  PENDING: "pending",
  SENT: "sent",
  FAILED: "failed",
};

// Define the Notification schema
const NotificationSchema = new Schema(
  {
    userId: {
      type: Number,
      required: false,
    },
    orderId: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    smsTemplateCategory: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    emailTemplateId: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    deliveryDate: { 
      type: Date, 
      required: false
     }, 
     newDeliveryDate: { 
      type: Date, 
      required: false
     }, 
     pickupDate: { 
      type: Date, 
      required: false
     }, 
    fcmToken: {
      type: String,
      required: false
    },
    sentBy: {
      type: Number,
      required: false,
    },
    notificationType: {
      type: String,
      enum: Object.values(NotificationTypes),
      required: true,
    },
    eventType: {
      type: String,
      enum: Object.values(EventTypes),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      default: NotificationStatus.PENDING,
      required: true,
    },
    moreInfo: {
      type: Schema.Types.Mixed,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    attachments: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Notification model
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
