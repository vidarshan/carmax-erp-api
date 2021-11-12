const { sequelize, StandardTariff } = require('../models');

/**
 * @Description : Add a Standard Tariff
 * @Route       : GET /api/v1/standardTariff
 * @Access      : Private
 */
exports.createStandardTariff = async (req, res, next) => {

    try{

        const {vehicleClass, standardTariffAmount } = req.body;

        const newStandardTariff = await StandardTariff.create({
            vehicleClass,
            standardTariff: standardTariffAmount
        })

        res.status(200).json(newStandardTariff)

    }catch(err){

        res.status(400).json({success:false, error: 'An error occurred.'});

    }

}