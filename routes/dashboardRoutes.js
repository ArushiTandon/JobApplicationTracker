const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const dashboardController = require('../controller/dashboardController');

// Dashboard stats
router.get('/overview', jwtAuthMiddleware, dashboardController.getOverviewStats);

// Dashboard charts
router.get('/charts', jwtAuthMiddleware, dashboardController.getChartData);


module.exports = router;