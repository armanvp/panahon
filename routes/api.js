var moment = require('moment');
var express = require('express');
var qs = require('querystring');
var util = require('util');
var router = express.Router();
var panahon = require('../models/panahon');
var APIKey = require('../models/APIKey');


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

        case 'post':

            var query = APIKey.find({key: req.query.key});
            util.log(`Data received: Key: ${req.query.key} / T: ${req.query.t} / H: ${req.query.h}`);

            query.exec()
                .then(function (result) {

                    // Key Found
                    if(result.length) {
                        
                        if((!req.query.t) || (!req.query.h)) {
                            return new Promise( function(res, rej) {
                                rej(new Error('Invalid parameters'));
                            });
                        }

                        var newPanahon = new panahon({
                            temperature: req.query.t,
                            humidity: req.query.h
                        });
    
                        return newPanahon.save();

                    // Key Not Found
                    } else {
                        util.log('Key not found');

                        return new Promise( function(res, rej) {
                            rej(new Error('Invalid Key'));
                        });

                    }
                })
                .then(function(result) {
                    res.send((new Date()) + ': ' + 'OK');
                })
                .catch(function (error) {
                    res.send(error.toString());
                })
            break;

        default:
            res.send('Invalid parameters');
    }
});

module.exports = router;