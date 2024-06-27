const express = require('express');
const router = express.Router();
const watchModel = require("../Models/watchModel");
const orderModel = require('../Models/orderModel');


// Get all watches
router.get('/allWatches', async (req, res) =>{
    const allWacthes = await watchModel.find({});
    try {
        if(allWacthes.length === 0)
        {
            res.status(404);
            throw "No items found"    
        }
        else{
            res.status(200).send(allWacthes);
        }
    } catch (error) {
        res.send(error);    
    }
});

// Get watches by category
router.get('/category/:categoryName' , async (req, res) => {
    const watchesFound = await watchModel.find({categoryName: req.params.categoryName});

    try {
        if(watchesFound.length === 0)
        {
            throw "No items found";
        }
        else{
            res.status(200).send(watchesFound);
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

// Place order - id of watch, address of customer, name of customer, email of customer, contact of customer
router.post('/buy', async (req, res) =>{
    const watchFound = await watchModel.findOne({_id: req.body.watchId});

    try {
        if(!watchFound || !req.body.customerAddress || !req.body.customerName || !req.body.customerEmail|| !req.body.customerContact)
        {
            throw "Please provide with all details";
        }
        else if(watchFound.quantity === 0)
        {
            throw "Sorry we are out of stock";   
        }
        else{
            let quantityLeft = watchFound.quantity - 1;
            await watchModel.findOneAndUpdate({_id: req.body.watchId} , {quantity : quantityLeft});
            const newWatch = new orderModel({watchId: req.body.watchId , customerName: req.body.customerName, customerEmail : req.body.customerEmail, customerAddress: req.body.customerAddress , customerContact : req.body.customerContact})
            newWatch.save();
            res.status(200).send("Order placed. Our team will be in contact with you soon.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;