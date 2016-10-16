app.controller('mainController', mainController);

mainController.$inject = ['dataService', 'formatService'];

function mainController(ds, fs) {

    var vm = this;
    
    vm.loadData = loadData;
    vm.load24 = load24;
    vm.hasError = hasError;
    
    vm.data = {
        temperature: 0,
        humidity: 0,
        update: 'N/A',
        error: ''
    };

    // Initialization
    onLoad();

    function onLoad() {
        loadData();
    }

    function loadData() {
        ds.getDataNow()
            .then(function(result) {
                vm.data.temperature = result.temperature;
                vm.data.humidity = result.humidity;
                vm.data.update = fs.formatDate(result.timeStamp);
                vm.data.error = '';
            })
            .catch(function(error) {
                vm.data.error = error;
            });
    }

    function hasError() {
        if(vm.data.error === '') {
            return false;
        }
        return true;
    }

    function load2() {

    }

// Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function load24() {

          var rawData = [ ['timeStamp', 'temperature', 'humidity'] ];

          ds.getData24()
            .then(function (result) {
                result.forEach(function(value, idx) {
                    var item = [];
                    item.push(fs.formatTime(value.timeStamp));
                    item.push(parseFloat(value.temperature));
                    item.push(parseFloat(value.humidity));
                    rawData.push(item);
                });
            })
            .then(function (result) {

                // Create the data table.
                var data = google.visualization.arrayToDataTable(rawData);

                // Set chart options
                var options = {
                    title: 'Temperature & Humidity for the past 24 hours',
                    titleTextStyle: {
                        color: '#fff'
                    },
                    curveType: 'function',
                    legend: { 
                        position: 'bottom', 
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    height: '500',
                    backgroundColor: '#011622',
                    colors: ['#FFBE00','#FF7A00'],
                    fontName: 'Open Sans',
                    hAxis: {
                        textStyle: {
                            color: '#fff',
                            bold: true
                        },
                        titleTextStyle: {
                            color: '#fff'
                        }
                    },
                    vAxis: {
                        textStyle: {
                            color: '#fff',
                            bold: true
                        },
                        titleTextStyle: {
                            color: '#fff'
                        }
                    },
                    
                    series: {
                        0: {targetAxisIndex: 0},
                        1: {targetAxisIndex: 1}
                    },
                    vAxes: {
                        // Adds titles to each axis.
                        0: {title: 'Temperature (Celsius)'},
                        1: {title: 'Humidity (%)'}
                    }
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.LineChart(document.getElementById('chart24'));
                chart.draw(data, options);

            })
            .catch(function (error) {

            });

        
      }

}