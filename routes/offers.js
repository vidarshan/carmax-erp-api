const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { getOffersOfACustomer, createReferenceOffer } = require('../controllers/offers');
const router = express.Router();

router.route('/customer/:id').get(protect, authorize('admin'), getOffersOfACustomer);
router.route('/reference').post(protect, authorize('admin'), createReferenceOffer);

module.exports = router;