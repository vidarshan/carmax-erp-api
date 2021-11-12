const { sequelize, Customer, Occasion, Offer } = require('../models');

/**
 * @Description : Get all customers
 * @Route       : GET /api/v1/customers
 * @Access      : Public
 */
exports.getCustomers = async (req, res, next) => {

  try {

    const customers = await Customer.findAll();

    res.status(200).json(customers);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Get a customer
 * @Route       : GET /api/v1/customers/:id
 * @Access      : Public
 */
exports.getCustomer = async (req, res, next) => {


  try {

    const { id } = req.params;

    const customer = await Customer.findOne({
      where: { uuid: id },
    });

    if (customer) {

      res.status(200).json(customer);

    } else {

      res.status(200).json({ msg: 'No customer found' });

    }

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Add a new customer
 * @Route       : POST /api/v1/customer
 * @Access      : Private
 */
exports.createCustomer = async (req, res, next) => {

  try {

    const {
      firstname,
      lastname,
      contact,
      email,
      dob,
      houseNo,
      streetAddress,
      streetAddress2,
      city,
      weddingAnniversary,
      customerType,
    } = req.body;

    const customer = await Customer.create({
      firstname,
      lastname,
      contact,
      email,
      dob,
      houseNo,
      streetAddress,
      streetAddress2,
      city,
      weddingAnniversary,
      customerType,
    });

    await Offer.create({
      description: "Registration Offer",
      amount: 1000.00,
      date: new Date(),
      isExpired: false,
      customerId: customer.id
    });

    await Occasion.create({
      occasionName: 'Birth Day',
      occasionDate: dob,
      customerId: customer.id,
    });


    res.status(200).json(customer);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Update a customer
 * @Route       : POST /api/v1/customer
 * @Access      : Private
 */
exports.updateCustomer = async (req, res, next) => {


  try {

    const { id } = req.params;

    const {
      firstname,
      lastname,
      contact,
      email,
      dob,
      houseNo,
      streetAddress,
      streetAddress2,
      city,
      weddingAnniversary,
      customerType,
    } = req.body;

    const customer = await Customer.findOne({ where: { uuid: id } });

    (customer.firstname = firstname),
      (customer.lastname = lastname),
      (customer.contact = contact),
      (customer.email = email),
      (customer.dob = dob),
      (customer.houseNo = houseNo),
      (customer.streetAddress = streetAddress),
      (customer.streetAddress2 = streetAddress2),
      (customer.city = city),
      (customer.weddingAnniversary = weddingAnniversary),
      (customer.customerType = customerType),
      await customer.save();

    res.status(200).json(customer);

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};

/**
 * @Description : Delete a customer
 * @Route       : POST /api/v1/customer
 * @Access      : Private
 */
exports.deleteCustomer = async (req, res, next) => {


  try {

    const { id } = req.params;

    const customer = await Customer.findOne({ where: { uuid: id } });
    await customer.destroy();

    res.status(200).json({ msg: 'Customer deleted' });

  } catch (err) {

    res.status(400).json({ success: false, error: 'An error occurred.' });

  }
};
