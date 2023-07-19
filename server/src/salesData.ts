import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
// Connect to MongoDB
mongoose.connect('mongodb+srv://erwincino0812:tNk7PqtOquMN8dFw@cluster0.vpdiwqm.mongodb.net/')
// Define a schema
const SalesDataSchema = new mongoose.Schema({
    product: String,
    salesRevenue: Number,
    region: String
});
// Create a model using the schema
export const SalesData = mongoose.model('SalesData', SalesDataSchema);
// Generate sales data
function generateSalesData() {
    const salesData = [];
    for (let i = 0; i < 100; i++) {
        salesData.push({
            product: faker.commerce.productName(),
            salesRevenue: faker.number.int({ min: 50, max: 500 }),
            region: faker.location.country()
        });
    }
    return salesData;
}
// Insert the data into MongoDB

export const insertDummySalesData = async () => {
    try {
        await SalesData.insertMany(generateSalesData())
            .then(() => {
                console.log('Data inserted successfully.');
                mongoose.connection.close(); // Close the connection after insertion
            })
            .catch(err => {
                console.error('Data insertion failed: ', err);
            });
    } catch (error) {
        console.log("error inserting data", error?.message)
    }
}

export const deleteDummyData = async () => {
    try {
        await SalesData.deleteMany({})
    } catch (error) {
        console.log("error deleting data", error?.message)
    }
}

export const findTopSellingProduct = async () => {
    try {
        return await SalesData.find().sort("-salesRevenue")
    } catch (error) {
        console.log("error finding top revenue", error?.message)
    }
}