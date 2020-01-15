const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb+srv://sfrobous:gazorninflex@cluster0-amcty.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json());
app.use(routes);
app.listen(3333);