const express = require('express');
const router = express.Router();
const categoryModel = require("../Models/categoryModel");
const authAdmin = require('../Middleware/adminAuth');
const adminModel = require('../Models/adminModel');


router.get('/allCategories' , async (req, res) =>{
    const categoryFound = await categoryModel.find({});

    try
    {
        if(!categoryFound)
        {
            res.status(400);
            throw "Some error occured";    
        }
        else{
            res.status(200).send(categoryFound);
        }
    }
    catch(error){
        res.send(error);
    }
});

router.post('/addCategory' , authAdmin , async(req, res) =>{

    const adminFound = await adminModel.findById(req.header.adminId);
    const categoryFound = await categoryModel.find({categoryName : req.body.categoryName})

    try {
        if(categoryFound.length != 0)
        {
            res.status(400);
            throw "Category already exists";
        }
        else if(!adminFound)
        {
            res.status(400)
            throw "You are not authorized";
        }
        else if(!req.body.categoryName || !req.body.description)
        {
            res.status(400);
            throw "Please enter full details";
        }
        else{
            const newCategory = new categoryModel({categoryName: req.body.categoryName, description: req.body.description, img: req.body.img});
            newCategory.save();
            res.status(200).send("Category created");
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;