const notificationService = require("../services/notificationService");

exports.createNotification = async (req, res) => {
  try {
    const message = await notificationService.createNotification(req.body);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const message = await notificationService.getNotification(req);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const message = await notificationService.getAllNotifications(req);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
