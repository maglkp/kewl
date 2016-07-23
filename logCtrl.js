var request = require('request');
var dateFormat = require('dateformat');
var app = angular.module('kewl', []);

app.controller('logCtrl', function ($scope, $http) {

    $scope.appNames = ["", "dev-prom-gateway", "dev-titan-notification-management",
                       "dev-prom-entity-definition", "dev-vnx-asset-management", "dev-oberon-asset-management"];
    $scope.levels = ["", "INFO", "DEBUG", "WARN", "ERROR", "FATAL"];
    $scope.selectedAppName = "";
    $scope.selectedLevel = "";
    $scope.selectedDate = null;
    $scope.pageSize = 10;
    $scope.currentPage = 0;
    $scope.total = 0;

    var elasticSearchBaseUrl = 'http://:9200/';
    var searchAll = '_all/';

    function updateLogs() {

        var url = elasticSearchBaseUrl;
        if($scope.selectedDate) {
            url += "logstash-" + dateFormat($scope.selectedDate, "yyyy.mm.dd") + '/syslog/'
        } else {
            url += searchAll;
        }
        url += '_search';

        var params = "";
        if ($scope.selectedAppName)
            params += "appName:" + $scope.selectedAppName;

        if ($scope.selectedLevel) {
            if(params) {
                params += "%20AND%20" + "level:" + $scope.selectedLevel;
            } else {
                params = "level:" + $scope.selectedLevel;
            }
        }

        if (params) {
            url += "?q=" + params + "&size=" + $scope.pageSize;
        } else {
            url += "?size=" + $scope.pageSize;
        }

        url += '&from=' + $scope.currentPage;
        url += '&sort%3D%40timestamp%3Aasc';
        //url += '&sort%3Dlevel%3Adesc';

        console.log(url);
        $http.get(url)
            .then(function (response) {
                let hits = response.data.hits.hits;
                $scope.total = response.data.hits.total;
                $scope.logs = hits;
            },
            function (response) {
                $scope.logs = [];
            });
    }

    function sortByTimestampDsc(a, b) {
        if(!b || !b._source || !b._source['@timestamp'])
            return -1;
        if(!a || !a._source || !a._source['@timestamp'])
            return 1;
        return new Date(b._source['@timestamp']) - new Date(a._source['@timestamp']);
    }

    updateLogs();
    $scope.updateLogs = updateLogs;
});
