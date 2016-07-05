var request = require('request');
var app = angular.module('kewl', []);

app.controller('logCtrl', function ($scope, $http) {

    $scope.appNames = [dev-prom-gateway", "dev-titan-notification-management",
                       "dev-prom-entity-definition", "dev-vnx-asset-management"];
    $scope.levels = ["INFO", "DEBUG", "WARN", "ERROR", "FATAL"];

    var elasticSearchBaseUrl = 'http://10.73.66.63:9200/_all/_search';
    function updateLogs() {

        var url = elasticSearchBaseUrl;

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
            });
    }

    updateLogs();
    $scope.updateLogs = updateLogs;
});
