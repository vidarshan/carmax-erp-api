const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const {
  getCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');
const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), getCustomers)
  .post(protect, authorize('admin'), createCustomer);
router
  .route('/:id')
  .get(protect, authorize('admin'), getCustomer)
  .put(protect, authorize('admin'), updateCustomer)
  .delete(protect, authorize('admin'), deleteCustomer);

module.exports = router;
