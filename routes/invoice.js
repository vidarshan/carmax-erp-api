const express = require('express');

const { protect, authorize } = require('../middleware/auth');
const { createInvoice } = require('../controllers/invoice');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createInvoice);

module.exports = router; 