const express = require('express');
const router = express.Router();
const Prop = require('../models/Prop');

// GET all props
router.get('/', async (req, res) => {
    try{
        const props = await Prop.find();
        res.json(props);
    }catch(err){
        res.json({message: err});
    }
});

// POST a prop
router.post('/', async (req, res) => {
    const prop = new Prop({
        title: req.body.title,
        category: req.body.category,
        subcategory: req.body.subcategory,
        fabric: req.body.fabric,
        color: req.body.color,
        tags: req.body.tags,
        imgUrl: req.body.imgUrl,
        dateAdded: req.body.dateAdded        
    });
    try{
        const savedProp = await prop.save();
        res.json(savedProp);
    }catch(err) {
        res.json({message: err});
    }
});

// GET a specific prop
router.get('/:propId', async (req, res) => {
    try {
        const prop = await Prop.findById(req.params.propId);
        res.json(prop);
    } catch (err) {
        res.json({message: err});
    }
});

// DELETE a specific prop
router.delete('/:propId', async (req, res) => {
    // find todo by id and delete
    try {
        const removedProp = await Prop.findByIdAndDelete({_id: req.params.propId});
        res.json(removedProp);
    } catch (err) {
        console.log('err en DELETE a specific prop');
        res.json({message: err});
    }
});

// UPDATE a specific prop
router.patch('/:propId', async (req, res) => {
    try {
        const updatedPost = await Prop.updateOne(
            {_id: req.params.propId},
            {$set: req.body}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
