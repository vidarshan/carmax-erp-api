const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const {
  createInventoryItem, getInventory, updateInventory
} = require('../controllers/inventory');

const router = express.Router();

router
  .route('/').post(protect, authorize('admin'), createInventoryItem).get(protect, authorize('admin'), getInventory);

router.route('/:id').put(protect, authorize('admin'), updateInventory);

module.exports = router;