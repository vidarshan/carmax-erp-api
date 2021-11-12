const e = require('express');
const { sequelize, Inventory, Supplier } = require('../models');

/**
 * @Description : Create an inventory item
 * @Route       : POST /api/v1/inventory
 * @Access      : Private
 */
exports.createInventoryItem = async (req, res, next) => {

    
    try{

        const {name, inUseQuantity, availableQuantity} = req.body;
    
        const newInventoryItem = await Inventory.create({
           name,
            inUseQuantity,
            availableQuantity
        })

        res.status(200).json(newInventoryItem);

    }catch(err){

        res.status(400).json({ success: false, error: 'An error occurred.' });
    
    }

}

/**
 * @Description : Get Inventory items
 * @Route       : GET /api/v1/inventory
 * @Access      : Private
 */
 exports.getInventory = async (req, res, next) => {

    try{
    
        const inventory = await Inventory.findAll()
        res.status(200).json(inventory);

    }catch(err){

        res.status(400).json({ success: false, error: 'An error occurred.' });
    
    }

}

/**
 * @Description : Update an inventory item
 * @Route       : PUT /api/v1/inventory/:id
 * @Access      : Private
 */
 exports.updateInventory = async (req, res, next) => {

     
     try{
         
         const {id: inventoryUuid} = req.params; 
         const {inventory, supplier: supplierUuid} = req.body;
        
         const {name, availableQuantity, inUseQuantity} = inventory;
        const supplierDetails = await Supplier.findOne({ where: { uuid: supplierUuid } });
        const inventoryDetails = await Inventory.findOne({where: {uuid: inventoryUuid}});


        if(!inventoryDetails || !supplierDetails){
            
            res.status(200).json({msg: 'No Inventory or supplier found'});

        }else{

            (inventoryDetails.name = name),
            (inventoryDetails.availableQuantity = availableQuantity),
            (inventoryDetails.inUseQuantity = inUseQuantity),
            (inventoryDetails.verified = inventoryDetails.verified ? false : true),
            (inventoryDetails.userId = req.user.id),
            (inventoryDetails.supplierId = supplierDetails.id)
      
            await inventoryDetails.save();
      
            res.status(200).json(inventoryDetails);
            
        }

    }catch(err){

        res.status(400).json({ success: false, error: 'An error occurred.' });
    
    }

}