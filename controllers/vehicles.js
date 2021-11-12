const { sequelize, Vehicle, Customer, Invoice, WorkHistory } = require('../models');

/**
 * @Description : Create a vehicle
 * @Route       : POST /api/v1/vehicles
 * @Access      : Private
 */
exports.createVehicle = async (req, res, next) => {

    try {

        const { customer: customerId, vehicleInfo } = req.body;
        const customerDetails = await Customer.findOne({ where: { uuid: customerId } });

        if (customerDetails) {

            const { vehicleNo, chassisNo, make, model, YOM, lastMileage } = vehicleInfo;

            const vehicle = await Vehicle.create({
                vehicleNo,
                chassisNo,
                make,
                model,
                YOM,
                lastMileage,
                customerId: customerDetails.id
            });

            res.status(200).json(vehicle);

        } else {

            res.status(200).json({ msg: 'No customer found' });

        }

    } catch (err) {

        res.status(400).json({ success: false, error: 'An error occurred.' });

    }

}

/**
 * @Description : Get details of a vehicle
 * @Route       : GET /api/v1/vehicles/:id
 * @Access      : Private
 */
exports.getVehicleDetails = async (req, res, next) => {
    try {

        const { vehicleNumber } = req.params;

        const vehicleDetails = await Vehicle.findOne({ where: { vehicleNo: vehicleNumber } });



        const vehicleInvoices = await Invoice.findAll({
            where: {
                vehicleId: vehicleDetails.id
            }
        })

        const vehicleWorkHistory = await WorkHistory.findAll({
            where: {
                vehicleId: vehicleDetails.id
            }
        })

        res.status(200).json({
            vehicle: vehicleDetails,
            invoices: vehicleInvoices,
            workHistory: vehicleWorkHistory
        });


    } catch (err) {

        res.status(400).json({ success: false, error: 'An error occurred.' });

    }

}



/**
 * @Description : Get a customer of a given vehicle
 * @Route       : GET /api/v1/vehicles/owner/:customer
 * @Access      : Private
 */
exports.getCustomerDetailsByVehicle = async (req, res, next) => {
    try {

        const { id } = req.params;

        const vehicleDetails = await Vehicle.findOne({ where: { vehicleNo: id } });


        if (vehicleDetails) {
            const ownerDetails = await Customer.findOne({ where: { id: vehicleDetails.customerId } })

            res.status(200).json(ownerDetails)
        } else {
            res.status(400).json({ error: 'No owner found' })
        }

    } catch (err) {

        res.status(400).json({ success: false, error: 'An error occurred.' });

    }

}


/**
 * @Description : Get all vehicles
 * @Route       : GET /api/v1/vehicles
 * @Access      : Private
 */
exports.getVehicles = async (req, res, next) => {
    try {

        const vehicles = await Vehicle.findAll();

        res.status(200).json(vehicles);


    } catch (err) {

        res.status(400).json({ success: false, error: 'An error occurred.' });

    }

}