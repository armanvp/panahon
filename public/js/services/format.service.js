app.service('formatService', formatService);

formatService.$inject = ['$filter'];

function formatService($filter) {

    var services = {
        formatDate: formatDate,
        formatTime: formatTime
    };

    return services;

    function formatDate(dt) {
        return $filter('date')(dt,'medium');
    }

    function formatTime(dt) {
        return $filter('date')(dt,'HH:mm');
    }

}