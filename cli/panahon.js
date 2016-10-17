var APIKey = require('../models/APIKey');
var mongoose = require('mongoose');

init();

function init() {
    
    // Check for no. of arguments
    if (process.argv.length < 3) {
        displayHelp();
        return;
    }

    // Connect to MongoDB
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://localhost/panahon');

    switch(process.argv[2]) {
        case 'register':
            
            var newAPIKey = new APIKey({
                key: process.argv[3]
            });

            var query = APIKey.findOne({key: process.argv[3]});
            query.exec()
                .then(function (result) {
                    if(result) {
                        return new Promise(function(resolve, reject) {
                            resolve(true);
                        });
                    } else {
                        return newAPIKey.save()
                    }
                })
                .then(function (result) {
                    console.log(`MAC ${process.argv[3]} was successfully registered`);
                    process.exit();
                })
                .catch(function (error) {
                    console.log(`Error: ${error}`);
                    process.exit();
                })
            
            break;

        case 'unregister':

            var query = APIKey.findOneAndRemove({key: process.argv[3]});
            query.exec()
                .then(function (result) {
                    console.log(`MAC ${process.argv[3]} was unregistered`);
                    process.exit();
                })
                .catch(function (error) {
                    console.log(`Error: ${error}`);
                    process.exit();
                });
            
            break;

        case 'list':

            var query = APIKey.find();
            query.exec()
                .then(function (result) {
                    result.forEach(function (v, i) {
                        console.log(v.key);
                    });
                    process.exit();
                })
                .catch(function (error) {
                    console.log(`Error: ${error}`);
                    process.exit();
                });

            break;
            
        default:
            displayHelp();
    }   

    return;
}

function displayHelp() {
    console.log('---------------------------------');
    console.log('panahon.js Command Line Interface');
    console.log('---------------------------------');
    console.log('');
    console.log('node panahon.js [OPTIONS] [MAC Address]');
    console.log('');
    console.log('[OPTIONS]');
    console.log('  register - registers a MAC Address allowed to post data');
    console.log('  unregister - unregisters a MAC Address');
    console.log('  help - this help documentation');
    console.log('');
    console.log('Example Usage:');
    console.log('  node panahon.js register AA:12:BB:34:CD:5F');
    console.log('  node panahon.js unregister AA:12:BB:34:CD:5F');
}