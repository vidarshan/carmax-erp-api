const { sequelize, Supplier } = require('../models');

/**
 * @Description : Create a Supplier
 * @Route       : POST /api/v1/suppliers
 * @Access      : Private
 */
exports.createSupplier = async (req, res, next) => {

    try {

        const {email, address, name, contact} = req.body;

        const newSupplier = await Supplier.create({
            email,
            address,
            name,
            contact,
        });

        res.status(200).json(newSupplier);

    } catch (err) {
    
        res.status(400).json({ success: false, error: 'An error occurred.' });
   
    }
};

/**
 * @Description : Get all suppliers
 * @Route       : GET /api/v1/suppliers
 * @Access      : Private
 */
 exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.findAll();

        res.status(200).json(suppliers);
    } catch (err) {
          res.status(400).json({ success: false, error: 'An error occurred.' });
    }
};


/**
 * @Description : Get a supplier
 * @Route       : GET /api/v1/suppliers/:id
 * @Access      : Private
 */
 exports.getSupplier = async (req, res, next) => {

    try {

        const {id:supplierUuid} = req.params;

        const supplier = await Supplier.findOne({
            where:{uuid:supplierUuid}
        });

        if(supplier){

            res.status(200).json(supplier);
        
        }else{
         
            res.status(200).json({ msg: 'No supplier found'});
        
        }

    } catch (err) {
        
        res.status(400).json({ success: false, error: 'An error occurred.' });
   
    }
};