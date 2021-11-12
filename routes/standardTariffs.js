const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createStandardTariff } = require('../controllers/standardTariff'); 
const router = express.Router();

router.route('/').post(protect, authorize('admin'),createStandardTariff);

module.exports = router; 