const Notification = require("../models/Notification"); // Mongoose model for Notification
const logger = require("../utils/logger");
const { Kafka } = require("kafkajs");
const config = require("../config/config");

// Kafka client configuration
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [config.development.kafkaDevBrokerURL1,config.development.kafkaDevBrokerURL2,config.development.kafkaDevBrokerURL3]
});

const producer = kafka.producer();

exports.createNotification = async (reqBody) => {
  try {
    // Connect the Kafka producer
    await producer.connect();

    // Step 1: Create and save the Notification
    const notification = new Notification(reqBody);
    const res = await notification.save();

    console.log("Notification created successfully");

    // Step 2: Publish the notification data to Kafka
    await producer.send({
      topic: "notification-topic", // Replace with your Kafka topic name
      messages: [
        { value: JSON.stringify(res) }, // Send the saved notification data as a JSON string
      ],
    });

    console.log("Notification data sent to Kafka successfully");

    // Disconnect the Kafka producer
    await producer.disconnect();

    return {
      message: "Notification created and sent to Kafka successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error creating notification:", error.message);

    // Ensure Kafka producer is disconnected in case of error
    try {
      await producer.disconnect();
    } catch (disconnectError) {
      console.error(
        "Error disconnecting Kafka producer:",
        disconnectError.message
      );
    }

    throw new Error("Failed to create notification and send to Kafka");
  }
};

exports.getNotification = async (req) => {
  const notification_id = req.params.id;

  if (!notification_id) {
    throw new Error("notification id is required");
  }

  try {
    const notification = await Notification.findById(notification_id);

    if (!notification) {
      console.error("notification not found:", notification_id);
      throw new Error("notification not found");
    }

    return { message: "notification details", data: notification };
  } catch (error) {
    console.error("Error in getting notification details:", error.message);
    throw new Error("Failed to get notification details");
  }
};

exports.getAllNotifications = async (req) => {
  const { page = 1, limit = 10, search = "", total, filters } = req.query;

  try {
    // Build query object
    let query = {};
    if (search) {
      query.status = new RegExp(search, "i"); // Case-insensitive search
    }
    if (total) {
      query.total = { $lte: parseFloat(total) }; // Less than or equal to total
    }
    // Handle additional filters
    if (filters) {
      filters.split(",").forEach((filter) => {
        const [key, value] = filter.split("|");
        if (key && value) {
          // Apply filter only if both key and value are present
          query[key] = value;
        }
      });
    }

    // Find notifications with pagination and filtering
    const notifications = await Notification.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    // Get total count of notifications matching the query
    const totalCount = await Notification.countDocuments(query);

    return {
      message: "notifications details list",
      data: notifications,
      totalCount: totalCount,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    throw new Error("Failed to fetch notifications");
  }
};
