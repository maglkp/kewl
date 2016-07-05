var request = require('request');
var app = angular.module('kewl', []);

app.controller('logCtrl', function ($scope, $http) {

    //var data = {"took":3,"timed_out":false,"_shards":{"total":15,"successful":15,"failed":0},"hits":{"total":13045,"max_score":1.0,"hits":[{"_index":"logstash-2016.07.05","_type":"syslog","_id":"AVW6rL-0q5bl6XxRKp_b","_score":1.0,"_source":{"@timestamp":"2016-07-05T10:47:43.536Z","message":"120 <14>1 2016-07-05T10:54:09.639307+00:00 loggregator 1b58a63a-e2a1-4b45-9c9d-d6aa803997eb [HEALTH] - - healthcheck passed\n","@version":"1","host":"172.16.4.122:37934","type":"syslog","syslog5424_proc":"[HEALTH]","@source_host":"%{syslog_hostname}","@message":"%{syslog_message}","healthcheck passed":null}},{"_index":"logstash-2016.07.05","_type":"syslog","_id":"AVW6rMSBq5bl6XxRKp_g","_score":1.0,"_source":{"@timestamp":"2016-07-05T10:47:44.711Z","message":"213 <14>1 2016-07-05T10:54:10.814485+00:00 loggregator b764c705-3d45-41ad-90df-01738413cff8 [APP] - - 10:54:10.813 [http-nio-8080-exec-9] DEBUG c.e.g.t.g.filters.UserZuulFilter - Setting headers for auth user: 152945\n194 <14>1 2016-07-05T10:54:10.815112+00:00 loggregator b764c705-3d45-41ad-90df-01738413cff8 [APP] - - 10:54:10.814 [http-nio-8080-exec-9] DEBUG c.e.g.t.g.f.TermsOfUseZuulFilter - Whitelisted: false\n236 <14>1 2016-07-05T10:54:10.815179+00:00 loggregator b764c705-3d45-41ad-90df-01738413cff8 [APP] - - 10:54:10.814 [http-nio-8080-exec-9] DEBUG c.e.g.t.g.f.TermsOfUseZuulFilter - User: 261d61ae-868a-4ac8-81d9-4aaccc9f9888 - Accepted - true\n","@version":"1","host":"172.16.4.122:37933","type":"syslog","syslog5424_proc":"[APP]","@source_host":"%{syslog_hostname}","@message":"%{syslog_message}","10:54:10.813 ":{"http-nio-8080-exec-9":{" DEBUG c.e.g.t.g.filters.UserZuulFilter - Setting headers for auth user: 152945":null}}}}]}};
    //$scope.logs = data.hits.hits;
    //$scope.logs = [{"_index": "logstash-2016.07.05", "_type": "syslog", "_id": "AVW6rL-0q5bl6XxRKp_b", "_score": 1.0}];

    //http://10.73.66.63:9200/_all/_search?query:user=anonymous&size=1

    $http.get('http://10.73.66.63:9200/_all/_search?query:user=anonymous&size=2')
        .then(function(response) {
            console.log(response.data);
            $scope.logs = response.data.hits.hits;
        });

    // request('http://10.73.66.63:9200/_all/_search?query:user=anonymous&size=2', function (error, response, body) {
    //     console.log(body.hits);
    //     if (!error && response.statusCode == 200) {
    //         //$scope.logs = body.hits.hits;
    //     }
    // });
});
