const { sequelize, PurchaseOrder, Supplier, Employee } = require('../models');

/**
 * @Description : Create a Purchase Order
 * @Route       : POST /api/v1/purchaseOrders
 * @Access      : Private
 */
exports.createPurchaseOrder = async (req, res, next) => {
  try {

    const { purchaseOrder, supplier: supplierUuid, employee: employeeUuid } = req.body;
    const { settlementDate, item, purchaseType, supplyLeadTime } = purchaseOrder;

    const supplierDetails = await Supplier.findOne({ where: { uuid: supplierUuid } });

    const employeeDetails = await Employee.findOne({ where: { uuid: employeeUuid } });

    if (!supplierDetails || !employeeDetails) {

      res.status(200).json({ msg: 'Employee or Supplier details are incorrect.' })

    } else {

      const purchaseOrder = await PurchaseOrder.create({
        createdBy: employeeDetails.id,
        date: new Date(),
        settlementDate,
        item,
        purchaseType,
        supplierId: supplierDetails.id,
        supplyLeadTime
      });

      res.status(200).json(purchaseOrder);

    }

  } catch (err) {
    
    res.status(400).json({ success: false, error: 'An error occurred.' });
  
  }
};