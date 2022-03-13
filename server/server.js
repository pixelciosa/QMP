const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const propsRoute = require('./routes/props');
const categoriesRoute = require('./routes/categories');

app.use('/props', propsRoute);
app.use('/categories', categoriesRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Initiate MongoDB and start server
app.listen(PORT, () => {
    mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/qmp', { useNewUrlParser: true }).then((response) => {
        console.log(`Connected to MongoDB and server started on PORT ${PORT}`);
    }).catch((err) => {
        console.log(err);
    })
});