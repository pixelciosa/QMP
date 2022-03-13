const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(err){
        res.json({message: err});
    }
});

// POST a category
router.post('/', async (req, res) => {
    const category = new Category({
        title: req.body.title,
        subcategories: req.body.subcategories
    });
    try{
        const savedCategory = await category.save();
        res.json(savedCategory);
    }catch(err) {
        res.json({message: err});
    }
});

// GET a specific category
router.get('/:categoryId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.json(category);
    } catch (err) {
        res.json({message: err});
    }
});

// DELETE a specific category
router.delete('/:categoryId', async (req, res) => {
    // find todo by id and delete
    try {
        const removedCategory = await Category.findByIdAndDelete({_id: req.params.categoryId});
        res.json(removedCategory);
    } catch (err) {
        console.log('err en DELETE a specific category');
        res.json({message: err});
    }
});

// UPDATE a specific category
router.patch('/:categoryId', async (req, res) => {
    try {
        const updatedPost = await Category.updateOne(
            {_id: req.params.categoryId},
            {$set: req.body}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
