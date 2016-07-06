var request = require('request');
var dateFormat = require('dateformat');
var app = angular.module('kewl', []);

app.controller('logCtrl', function ($scope, $http) {

    $scope.appNames = ["", "dev-prom-gateway", "dev-titan-notification-management",
                       "dev-prom-entity-definition", "dev-vnx-asset-management"];
    $scope.levels = ["", "INFO", "DEBUG", "WARN", "ERROR", "FATAL"];
    $scope.selectedAppName = "";
    $scope.selectedLevel = "";
    $scope.selectedDate = null;

    var elasticSearchBaseUrl = 'http://10.73.66.63:9200/';
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
            url += "?q=" + "%2B" + params + "%2B" + "&size=200";
        } else {
            url += "?size=200";
        }

        console.log(url);
        $http.get(url)
            .then(function (response) {
                $scope.logs = response.data.hits.hits;
            },
            function (response) {
                $scope.logs = [];
            });
    }

    updateLogs();
    $scope.updateLogs = updateLogs;
});
