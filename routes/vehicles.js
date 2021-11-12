const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createVehicle, getVehicleDetails, getCustomerDetailsByVehicle, getVehicles } = require('../controllers/vehicles');
const router = express.Router();

router.route('/').get(protect, authorize('admin'), getVehicles).post(protect, authorize('admin'), createVehicle);
router.route('/:vehicleNumber').get(protect, authorize('admin'), getVehicleDetails);
router.route('/owner/:id').get(protect, authorize('admin'), getCustomerDetailsByVehicle);

module.exports = router;