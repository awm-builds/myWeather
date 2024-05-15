const express = require('express');
const router = express.Router();
const weatherCtrl = require('../../controllers/api/weather');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/weather'

// GET /api/weather/lat/:lat/lon/:lon
router.get('/lat/:lat/lon/:lon', weatherCtrl.getForLoc);

module.exports = router;