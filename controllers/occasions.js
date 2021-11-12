const { sequelize, Occasion, Customer } = require('../models');

/**
 * @Description : Create an occasion
 * @Route       : POST /api/v1/occations
 * @Access      : Private
 */
exports.createOccasion = async (req, res, next) => {

  try {

    const { occasionName, occasionDate, customerId } = req.body;

    await Customer.findOne({
      where: { id: customerId },
    });

    const occasion = await Occasion.create({
      occasionName,
      occasionDate,
      customerId,
    });

    res.status(200).json({ success: true, data: occasion });

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Get all occasions of a customer
 * @Route       : GET /api/v1/occations/:id
 * @Access      : Public
 */
exports.getOccasions = async (req, res, next) => {

  try {

    const id = req.params.id;

    const occasions = await Occasion.findAll({
      where: { customerId: id },
    });

    res.status(200).json(occasions);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};
