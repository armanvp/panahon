var util = require('util');
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Panahon = require('./models/panahon');

var port = process.env.PORT || 3001;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/panahon');

app.get('/api/:temp/:humd', function(req, res) {
    
    util.log(`Data received, saving data: T: ${req.params.temp} / H: ${req.params.humd}`);

    var newPanahon = new Panahon({
        temperature: req.params.temp,
        humidity: req.params.humd
    });
    
    newPanahon.save()
        .then(function(result) {
            res.send((new Date()) + ': ' + 'OK');
        })
        .catch(function(error) {
            res.send((new Date()) + ': ' + error);
        });
    
});

app.get('/api/get', function(req, res) {

    var query = Panahon.find();
    query.exec()
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error) {
            res.send(error);
        });

});

app.listen(port, function() {
    util.log(`Panahon IOT Server running at port ${port}`);
})