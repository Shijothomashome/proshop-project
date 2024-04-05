import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!' .red.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
};

// console.log(process.argv)
// if you run 
// PS D:\proshop project> node backend/seeder.js then you get this
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'D:\\proshop project\\backend\\seeder.js'
// ]
// And if you run this 
// PS D:\proshop project> node backend/seeder.js -d
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'D:\\proshop project\\backend\\seeder.js',
//   '-d'
// ] 
// what ever you provide as the argument next to seeder.js then it will come at the 2th index
// So using this feature we can select the required function with the help of if block which is
// shown below


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}

// in the package.json file we put this
// "scripts": {
//     "data:import": "node backend/seeder.js",
//     "data:destroy": "node backend/seeder.js -d"
//   }

// Now you can select the functions like
// "npm run data:import   OR    npm run data:destroy"