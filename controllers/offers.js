const {sequelize, Offer, Customer, Occasion} = require('../models');
const moment = require('moment');
const map = require('lodash.map');
const {createOffers} = require('../util/utils');

/**
 * @Description : Create a reference for a recommendation of an old customer to a new customer
 * @Route       : POST /api/v1/offers/reference
 * @Access      : Private
 */
 exports.createReferenceOffer = async (req, res, next) => {

  try {

    const {existingCustomer: existingCustomerId, newCustomer: newCustomerId} = req.body;


    if(!existingCustomerId || !newCustomerId){

        res.status(200).json({ msg: 'Please Provide all the details' });
    
    }else{

        const existingCustomerDetails = await Customer.findOne({
            where: {uuid: existingCustomerId}
        });
            
            const newCustomerDetails = await Customer.findOne({
                where:{uuid:newCustomerId}
            });
           
            if(existingCustomerDetails && newCustomerDetails){
        
                let newReferrerOffer = await Offer.create({
                    description: 'Referrer Offer',
                    amount: 500.00,
                    date: new Date(),
                    isExpired: false,
                    expirationDate: moment(new Date()).add(7,'days'), 
                    customerId: existingCustomerDetails.id
                })
        
                res.status(200).json(newReferrerOffer);
        
            }else{
                res.status(200).json({ msg: 'No customer details found'});
            }
    }

  } catch (err) { 

    res.status(400).json({ success: false, error: 'An error occurred.' });

   }
};

/**
 * @Description : Get offers of a customer
 * @Route       : GET /api/v1/:customer/offer
 * @Access      : Private
 */
exports.getOffersOfACustomer = async (req, res, next) => {
    
    try{

        const { id:customerUuid } = req.params;

        const customerDetails = await Customer.findOne({where:{uuid: customerUuid}});

        if(!customerDetails){

            res.status(200).json({ msg: 'No Customer Found'});

        }else{
            
            const memorableOccasions = await Occasion.findAll({where: {customerId: customerDetails.id}});
            
            
                map(memorableOccasions,(occasion) =>{
                    let currentDate = moment();
                    let occasionDate = moment(occasion.occasionDate);
              
                    if(currentDate.date() === occasionDate.date() && currentDate.month() === occasionDate.month()){

                    }
                    createOffers(occasion.occasionName + " Anniversary", 1000, new Date(), false, customerDetails.id);
                    
                })
            
            res.status(200).json(memorableOccasions)
            
        }
        
    }catch(err){
        
        res.status(400).json({ success: false, error: 'An error occurred.' });
    
    }

}