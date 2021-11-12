const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createWorkHistoryRecord } = require('../controllers/workHistory');
const router = express.Router();

router.route('/').post(protect, authorize('admin'), createWorkHistoryRecord);

module.exports = router; 