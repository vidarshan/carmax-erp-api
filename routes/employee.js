const express = require('express');

const { protect, authorize } = require('../middleware/auth');
const { createEmployee, activateDeactivateEmployee, getEmployees } = require('../controllers/employee');

const router = express.Router();

router.route('/').get(protect, authorize('admin'), getEmployees).post(protect, authorize('admin'), createEmployee)
router.route('/:id').put(protect, authorize('admin'), activateDeactivateEmployee)
module.exports = router;