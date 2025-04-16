const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require("../middlewares/jwt");
const dashboardController = require('../controllers/dashboardController');

// Dashboard stats
router.get('/overview', jwtAuthMiddleware, dashboardController.getOverviewStats);

// Dashboard charts
router.get('/charts', jwtAuthMiddleware, dashboardController.getChartData);


module.exports = router;