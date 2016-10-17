var util = require('util');
var express = require('express');
var app = express();

// Routes
var api = require('./routes/api');

// MongoDb
var mongoose = require('mongoose');
var Panahon = require('./models/panahon');


var port = process.env.PORT || 3001;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/panahon');

app.use('/', express.static(`${__dirname}/public`));
app.use('/modules', express.static(`${__dirname}/node_modules`));

app.use('/api', api);

app.listen(port, function() {
    util.log(`Panahon IOT Server running at port ${port}`);
})