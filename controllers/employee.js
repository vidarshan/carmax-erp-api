const { sequelize, Employee } = require('../models');

/**
 * @Description : Create a new Employee
 * @Route       : POST /api/v1/employees
 * @Access      : Private
 */
exports.createEmployee = async (req, res, next) => {

  try {

    const { name, contact } = req.body;

    const newEmployee = await Employee.create({
      name,
      contact,
      activated: true
    });

    res.status(200).json(newEmployee);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};


/**
 * @Description : Activate or Deactivate an Employee
 * @Route       : PUT /api/v1/employees/:id
 * @Access      : Private
 */
exports.activateDeactivateEmployee = async (req, res, next) => {


  try {

    const { id: employeeUuid } = req.params;

    const employeeDetails = await Employee.findOne({
      where: { uuid: employeeUuid }
    });

    if (employeeDetails) {

      (employeeDetails.name),
        (employeeDetails.contact),
        (employeeDetails.activated ? employeeDetails.activated = false : employeeDetails.activated = true),

        await employeeDetails.save();

      res.status(200).json(employeeDetails);

    } else {

      res.status(200).json({ msg: "No matching employee found" });

    }

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Get all Employees
 * @Route       : GET /api/v1/employees
 * @Access      : Private
 */
exports.getEmployees = async (req, res, next) => {
  try {

    const employees = await Employee.findAll();

    res.status(200).json(employees)

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
}