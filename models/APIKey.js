var mongoose = require('mongoose');

var APIKeySchema = new mongoose.Schema({
    timeStamp: {type: Date, default: Date.now },
    key: String
});

var APIKey = mongoose.model('APIKey', APIKeySchema);

module.exports = APIKey;