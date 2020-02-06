const mongoose = require('mongoose');

// Connecting to db
mongoose.connect('mongodb://localhost:27017/cakesdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to cakes DB...'))
    .catch(err => console.log(`Error connecting to db : ${err}`));

//Ex porting all models
module.exports.Cake = require('./cake');