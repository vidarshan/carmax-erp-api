const { sequelize, Vehicle, WorkHistory, Invoice } = require('../models');

/**
 * @Description : Create a work history record
 * @Route       : POST /api/v1/workHistory
 * @Access      : Private
 */
exports.createWorkHistoryRecord = async (req, res, next) => {
    try{

        const {vehicle:vehicleId, invoice:invoiceId, workHistory} = req.body;

        if(!vehicleId){

            res.status(200).json({msg: 'No Vehicle Found'})
      
        }else if(!invoiceId){
          
            res.status(200).json({ msg: 'No Invoice found'})   
       
        }else if(vehicleId && invoiceId){

           const {date, remark } = workHistory;
        
           const vehicleDetails = await Vehicle.findOne({where:{uuid: vehicleId}});
           const invoiceDetails = await Invoice.findOne({where: {uuid: invoiceId}});

            const newWorkHistory = await WorkHistory.create({
                    date,
                    remark,
                    invoiceId: invoiceDetails.id,
                    vehicleId: vehicleDetails.id
            });

            res.status(200).json(newWorkHistory);
    
        }


    }catch(err){

          res.status(400).json({ success: false, error: 'An error occurred.' });
          
    }

}