const { sequelize, PriceHistory } = require('../models');

/**
 * @Description : Create a Price Log
 * @Route       : POST /api/v1/priceHistory
 * @Access      : Private
 */
exports.createPriceHistory = async (req, res, next) => {

    try{

        const {buyingPrice, sellingPrice} = req.body;

        const newPriceLog = await PriceHistory.create({
            buyingPrice,
            sellingPrice,
            date: new Date()
        })

        res.status(200).json(newPriceLog);

    }catch(err){

        res.status(400).json({ success: false, error: 'An error occurred.' });

    }

}