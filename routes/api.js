var moment = require('moment');
var express = require('express');
var router = express.Router();
var panahon = require('../models/panahon');


router.get('/data/:type', function(req, res) {

    switch(req.params.type) {
        case 'now':
            var query = panahon.findOne().sort({timeStamp: 'desc'});
            query.exec()
                .then(function (result) {
                    res.send(result);
                })
                .catch(function (error) {
                    res.send(error);
                });
            break;

        case '24':
            var query = panahon.find({timeStamp: {$gte: moment().subtract(24,'h')}});
            query.exec()
                .then(function (result) {
                    res.send(result);
                })
                .catch(function (error) {
                    res.send(error);
                });
            break;   
    }
});

module.exports = router;