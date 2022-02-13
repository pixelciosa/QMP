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
    fabrics: Array,
    colors: Array,
    tags: Array,
    dateAdded: {
        type: Date,
        default: Date.now
    },
    imgUrl: String
});

module.exports = mongoose.model('Prop', ProSchema);
