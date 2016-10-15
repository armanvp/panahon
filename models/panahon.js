var mongoose = require('mongoose');

var PanahonSchema = new mongoose.Schema({
    timeStamp: {type: Date, default: new Date()},
    temperature: String,
    humidity: String
});

var Panahon = mongoose.model('Panahon', PanahonSchema);

module.exports = Panahon;