const express = require('express');
const router = express.Router();
const forecastCtrl = require('../../controllers/api/forecast');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/forecast'

// GET /api/forecast/lat/:lat/lon/:lon
router.get('/lat/:lat/lon/:lon', forecastCtrl.getForecast);

module.exports = router;