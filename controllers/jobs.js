const { sequelize, Job, JobCard, WorkHistory, Employee, Vehicle, Invoice } = require('../models');

/**
 * @Description : Get all pending Jobs
 * @Route       : GET /api/v1/jobs/pending
 * @Access      : Private
 */
exports.getPendingJobs = async (req, res, next) => {

  try {

    const pendingJobs = await JobCard.findAll({
      where: { completed: false }
    });

    res.status(200).json(pendingJobs);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};


/**
 * @Description : Get all completed Jobs
 * @Route       : GET /api/v1/jobs/completed
 * @Access      : Private
 */
exports.getCompletedJobs = async (req, res, next) => {

  try {

    const completedJobs = await JobCard.findAll({
      where: { completed: true }
    });

    res.status(200).json(completedJobs);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};


/**
 * @Description : Create a new Job
 * @Route       : POST /api/v1/jobs
 * @Access      : Private
 */
exports.createJob = async (req, res, next) => {


  try {

    const { standardTariff, description, vehicleType, make, model } = req.body.job;
    const { jobCard, vehicle } = req.body;

    const jobCardDetails = await JobCard.findOne({
      where: { uuid: jobCard }
    });

    const vehicleDetails = await Vehicle.findOne({
      where: { uuid: vehicle }
    })

    const newJob = await Job.create({
      standardTariff,
      description,
      vehicleType,
      make,
      model,
      jobCardId: jobCardDetails.id
    });

    const newWorkHistory = await WorkHistory.create({
      date: new Date(),
      remark: description,
      vehicleId: vehicleDetails.id
    })

    res.status(200).json({
      newJob,
      newWorkHistory
    })


  } catch (err) {

    res.status(400).json({ success: false, msg: 'An error Occurred' });

  }
};


/**
 * @Description : Create a Job Card : Start
 * @Route       : POST /api/v1/jobs/card/start
 * @Access      : Private
 */
exports.createJobCard = async (req, res, next) => {

  try {

    const { completed, jobType, currentMileage } = req.body.jobCard;
    const { employee, vehicle } = req.body;

    const employeeDetails = await Employee.findOne({
      where: { uuid: employee }
    });

    const vehicleDetails = await Vehicle.findOne({
      where: { uuid: vehicle }
    })


    const newJobCard = await JobCard.create({
      startTimeAndDate: new Date(),
      completed: false,
      jobType,
      currentMileage,
      employeeId: employeeDetails.id,
      vehicleId: vehicleDetails.id
    });


    res.status(200).json(newJobCard);


  } catch (err) {

    res.status(400).json({ success: false, error: 'An error Occurred' });

  }
};


/**
 * @Description : Update a Job Card : End
 * @Route       : PUT /api/v1/jobs/card/complete/:id
 * @Access      : Private
 */
exports.completeJobCard = async (req, res, next) => {

  try {

    const { id } = req.params;

    const jobCardDetails = await JobCard.findOne({ where: { uuid: id } });

    (jobCardDetails.startTimeAndDate = jobCardDetails.startTimeAndDate),
      (jobCardDetails.endTimeAndDate = new Date()),
      (jobCardDetails.completedTimeAndDate = new Date()),
      (jobCardDetails.completed = true),
      (jobCardDetails.jobType = jobCardDetails.jobType),
      (jobCardDetails.currentMileage = jobCardDetails.currentMileage),
      (jobCardDetails.employeeId = jobCardDetails.employeeId),
      (jobCardDetails.vehicleId = jobCardDetails.vehicleId)

    await jobCardDetails.save();

    res.status(200).json(jobCardDetails);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error Occurred' });

  }
};


/**
 * @Description : Get all jobs under a Job Card
 * @Route       : GET /api/v1/jobs/:id
 * @Access      : Private
 */
exports.getJobCard = async (req, res, next) => {

  try {

    const { id: jobCardUuid } = req.params;

    const jobCardDetails = await JobCard.findOne({
      where: { uuid: jobCardUuid }
    });

    if (jobCardDetails) {

      const allJobs = await Job.findAll({
        where: { jobCardId: jobCardDetails.id }
      })

      const vehicleDetails = await Vehicle.findOne({ where: { id: jobCardDetails.vehicleId } });
      const employeeDetails = await Employee.findOne({ where: { id: jobCardDetails.employeeId } })

      if (allJobs.length) {

        res.status(200).json({
          "jobCard": jobCardDetails,
          "allJobs": allJobs,
          "vehicle": vehicleDetails,
          "employee": employeeDetails
        });
      } else {
        res.status(200).json({
          "jobCard": jobCardDetails,
          "allJobs": allJobs,
          "vehicle": vehicleDetails,
          "employee": employeeDetails
        });
      }

    }

  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

