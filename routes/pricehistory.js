const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createPriceHistory } = require('../controllers/priceHistory');
const router = express.Router();

router.route('/').post(protect, authorize('admin'), createPriceHistory);

module.exports = router; 