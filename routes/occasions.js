const express = require('express');

const { protect, authorize } = require('../middleware/auth');

const { createOccasion, getOccasions } = require('../controllers/occasions');
const router = express.Router();

router.route('/').post(protect, authorize('admin'), createOccasion);
router.route('/:id').get(protect, authorize('admin'), getOccasions);

module.exports = router;
