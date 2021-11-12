const {sequelize, Offer} = require('../models'); 

const createOffers = async (description, amount, date, isExpired, customerId) => {
    await Offer.create({
        description,
        amount,
        date,
        isExpired,
        customerId
    })
}

module.exports = {
    createOffers
}