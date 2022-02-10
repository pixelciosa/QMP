const mongoose = require('mongoose');

const ProSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: String,
    fabric: String,
    color: String,
    tags: Array,
    dateAdded: {
        type: Date,
        default: Date.now
    },
    imgUrl: String
});

module.exports = mongoose.model('Prop', ProSchema);
