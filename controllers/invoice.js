const { sequelize, Vehicle, Customer, Invoice, User, RevenueAccount } = require('../models');

/**
 * @Description : Create an invoice
 * @Route       : POST /api/v1/invoice
 * @Access      : Private
 */
exports.createInvoice = async (req, res, next) => {

    try{

        const {invoiceInfo, vehicle: vehicleId, customer: customerId, depositAmount, salesDescription } = req.body; 
        const {uuid: userId} = req.user;
        
       const vehicleDetails = await Vehicle.findOne({where:{uuid: vehicleId}});
       const userDetails = await User.findOne({where: {uuid: userId}});
       const customerDetails = await Customer.findOne({where:{uuid: customerId}});

        if(userDetails && customerDetails && vehicleDetails && depositAmount){

        const {mileageAtInvoice, date } = invoiceInfo;

        (vehicleDetails.vehicleNo),
        (vehicleDetails.chassisNo),
        (vehicleDetails.make),
        (vehicleDetails.model),
        (vehicleDetails.YOM),
        (vehicleDetails.lastMileage = mileageAtInvoice),
        (vehicleDetails.customerId),
        await vehicleDetails.save();

        const newInvoice = await Invoice.create({
            mileageAtInvoice,
            createdBy: userDetails.id,
            date,
            customerId: customerDetails.id,
            vehicleId: vehicleDetails.id
        });

        
        const newRevenueItem = await RevenueAccount.create({
            description: req.body.salesDescription,
            depositAmount: req.body.depositAmount,
            date: new Date()
        })

        
        res.status(200).json({
            newInvoice,
            newRevenueItem
        });
   
       }else{

           res.status(200).json({msg: 'No Information found'})

       }

    }catch(err){

        res.status(400).json({ success: false, error: 'An error occurred.' });
    
    }

}