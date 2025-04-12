const express = require('express');
const { createAlert, getAlerts } = require('../controllers/alertController');
const router = express.Router();

// Route to create an alert
router.post('/', createAlert);

// Route to get alerts for a specific user
router.get('/:userId', getAlerts);

module.exports = router;
