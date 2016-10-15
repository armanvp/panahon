var mongoose = require('mongoose');

var PanahonSchema = new mongoose.Schema({
    timeStamp: {type: Date, default: Date.now },
    temperature: String,
    humidity: String
});

var Panahon = mongoose.model('Panahon', PanahonSchema);

module.exports = Panahon;