const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const db = require('./models');
const cors = require('cors');
const { sequelize } = require('./models');

const auth = require('./routes/auth');
const jobs = require('./routes/jobs');
const offers = require('./routes/offers');
const invoice = require('./routes/invoice');
const vehicles = require('./routes/vehicles');
const inventory = require('./routes/inventory');
const customers = require('./routes/customers');
const occasions = require('./routes/occasions');
const workHistory = require('./routes/workHistory');
const employee = require('./routes/employee');
const purchaseOrder = require('./routes/purchaseOrder');
const supplier = require('./routes/supplier');
const standardTariff = require('./routes/standardTariffs');
const priceHistory = require('./routes/pricehistory');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/api/v1/users', auth);
app.use('/api/v1/jobs', jobs);
app.use('/api/v1/offers', offers);
app.use('/api/v1/invoice', invoice);
app.use('/api/v1/vehicles', vehicles);
app.use('/api/v1/customers', customers);
app.use('/api/v1/occasions', occasions);
app.use('/api/v1/workHistory', workHistory)
app.use('/api/v1/inventory', inventory);
app.use('/api/v1/employees', employee);
app.use('/api/v1/purchaseOrders', purchaseOrder);
app.use('/api/v1/suppliers', supplier);
app.use('/api/v1/standardTariffs', standardTariff);
app.use('/api/v1/priceHistory', priceHistory);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  );
  await sequelize.sync();
  // await sequelize.sync({ force: true });
  console.log('Database synced'.magenta.underline.bold);
});
