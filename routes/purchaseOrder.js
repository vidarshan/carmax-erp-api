const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createPurchaseOrder } = require('../controllers/purchaseOrder');
const router = express.Router();

router.route('/').post(protect, authorize('admin'),createPurchaseOrder);

module.exports = router; 