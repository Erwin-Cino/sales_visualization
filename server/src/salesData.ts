const mongoose = require('mongoose');
const faker = require('faker');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/salesDashboard', { useNewUrlParser: true, useUnifiedTopology: true })
// Define a schema
const SalesDataSchema = new mongoose.Schema({
    product: String,
    salesRevenue: Number,
    region: String
});
// Create a model using the schema
const SalesData = mongoose.model('SalesData', SalesDataSchema);
// Generate sales data
function generateSalesData() {
    const salesData = [];
    for (let i = 0; i < 100; i++) {
        salesData.push({
            product: faker.commerce.productName(),
            salesRevenue: faker.random.number({ min: 50, max: 500 }),
            region: faker.address.country()
        });
    }
    return salesData;
}
// Insert the data into MongoDB
SalesData.insertMany(generateSalesData())
    .then(() => {
        console.log('Data inserted successfully.');
        mongoose.connection.close(); // Close the connection after insertion
    })
    .catch(err => {
        console.error('Data insertion failed: ', err);
    });