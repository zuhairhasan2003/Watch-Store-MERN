const express = require('express');
const authAdmin = require('../Middleware/adminAuth');
const orderModel = require('../Models/orderModel');
const adminModel = require('../Models/adminModel');
const watchModel = require('../Models/watchModel');
var jwt = require('jsonwebtoken');
const router = express.Router();

// Create admin
router.post('/newAdmin' , async (req, res) =>{
    const adminFound = await adminModel.findOne({email : req.body.email});
    try {
        if(req.body.secret === process.env.ADMIN_SECRET && !adminFound)
        {
            const newAdmin = new adminModel({email: req.body.email, password: req.body.password});
            newAdmin.save();
            var token = jwt.sign({ adminId: newAdmin._id }, process.env.ADMIN_SECRET);
            res.status(200).send(token);
        }
        else{
            res.status(400);
            throw "Some error occured";
        }
    } catch (error) {
        res.send(error);
    }
})

// Get all the orders that were ever made
router.get('/allOrders' , authAdmin, async (req, res) =>{

    const adminFound = await adminModel.findById(req.header.adminId);

    try {
        
        if(adminFound)
        {
            const ordersFound = await orderModel.find({});
            if(ordersFound.length === 0){
                res.status(200);
            }
            else{
                res.status(200).send(ordersFound);
            }
        }
        else{
            throw "Some error occured";
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


// Get the orders that are not fulfilled
router.get('/unfulfilledOrders' , authAdmin, async (req, res) =>{

    const adminFound = await adminModel.findById(req.header.adminId);

    try {
        
        if(adminFound)
        {
            const ordersFound = await orderModel.find({fulfilled: false});
            if(ordersFound.length === 0){
                res.status(200);
            }
            else{
                res.status(200).send(ordersFound);
            }
        }
        else{
            throw "Some error occured";
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add a watch in the online store
router.post('/addWatch', authAdmin , async (req , res) =>{

    try {
        const watchFound = await watchModel.findOne({modelNumber: req.body.modelNumber});
        const adminFound = await adminModel.findById(req.header.adminId);
        if(!adminFound){
            res.status(400);
            throw "you are not authorized";
        }
        else if(!req.body.price || !req.body.modelNumber || !req.body.description || !req.body.categoryName || !req.body.quantity){
            res.status(400);
            throw "Enter all the details of the product please";
        }
        else if(watchFound)
        {
            res.status(400);
            throw "This watch is already listed on the website";
        }
        else{
            let newWatch = new watchModel({price: req.body.price , img: req.body.img , modelNumber: req.body.modelNumber , description: req.body.description , categoryName: req.body.categoryName , quantity: req.body.quantity });
            newWatch.save();
            res.status(200).send("Item added succesfully");
        }
    } catch (error) {
        res.send(error);
    }
});

router.post('/login' , async (req, res) => {

    const adminFound = await adminModel.findOne({email : req.body.email});
    try {
        if(!adminFound){
            res.status(400);
            throw "Admin not found";
        }
        else if(req.body.secret !== process.env.ADMIN_SECRET || adminFound.email !== req.body.email || adminFound.password !== req.body.password){
            res.status(400);
            throw "Invalid details";
        }
        else{
            var token = jwt.sign({ adminId: adminFound._id }, process.env.ADMIN_SECRET);
            res.status(200).send(token);
        }
    } catch (error) {
        res.send(error);
    }

});

router.get('/getAdmin', authAdmin , async (req, res) => {
    const adminFound = await adminModel.findOne({_id: req.header.adminId});

    try {
        if(!adminFound){
            res.status(400);
            throw "Admin not found";
        }
        else{
            res.status(200).send(adminFound);
        }
    } catch (error) {
        res.send(error);
    }
})

router.post('/fulfillOrder' , authAdmin, async (req, res) =>{
    try {
        const adminFound = await adminModel.findById(req.header.adminId);
        const orderFound = await orderModel.findById(req.body.orderId);
        if(!adminFound){
            res.status(400);
            throw "you are not authorized";
        }
        else if (!orderFound){
            res.status(400)
            throw "Invalid order id";
        }
        else{
            await orderFound.updateOne({fulfilled : true})
            res.status(200).send("Order marked as fulfilled")
        }
    }
    catch(error) {
        res.send(error);
    }
})

module.exports = router;