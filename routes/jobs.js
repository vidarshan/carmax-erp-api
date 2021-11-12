const express = require('express');

const { protect, authorize } = require('../middleware/auth');
const { getPendingJobs, getCompletedJobs, createJob, createJobCard, getJobCard, completeJobCard } = require('../controllers/jobs');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createJob);
router.route('/pending').get(protect, authorize('admin'), getPendingJobs);
router.route('/completed').get(protect, authorize('admin'), getCompletedJobs);
router.route('/:id').get(protect, authorize('admin'), getJobCard);
router.route('/card/start').post(protect, authorize('admin'), createJobCard);
router.route('/card/complete/:id').put(protect, authorize('admin'), completeJobCard);

module.exports = router; 