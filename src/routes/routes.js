const express = require('express');
const { createNotification, getNotification, getAllNotifications} = require('../controller/notificationController');

const router = express.Router();

router.post('/notification/create', createNotification);
router.get('/notification', getAllNotifications); 
router.get('/notification/:id', getNotification);

module.exports = router;
