const mongoose = require('mongoose');

const ProSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subcategories: {
        type: Array
    },
    graphics: {
        type: String
    }
});

module.exports = mongoose.model('Category', ProSchema);
