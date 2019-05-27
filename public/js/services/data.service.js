app.service('dataService', dataService);

dataService.$inject = ['$resource'];

function dataService($resource) {

    var services = {
        getDataNow: getDataNow,
        getData24: getData24
    };

    return services;

    function getDataNow() {
        return $resource('api/data/now').get().$promise;
    }

    function getData24() {
        return $resource('api/data/24').query().$promise;
    }

}
