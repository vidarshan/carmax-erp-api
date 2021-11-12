const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const {createSupplier, getSuppliers, getSupplier} = require('../controllers/supplier');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createSupplier).get(protect, authorize('admin'), getSuppliers);
router.route('/:id').get(protect, authorize('admin'), getSupplier);


module.exports = router;