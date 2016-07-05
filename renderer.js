// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//var express = require('express');
var request = require('request');

//http://10.73.66.63:9200/_all/_search?query:user=anonymous&size=20

//request('http://10.73.66.63:9200/_cat/indices?v', function (error, response, body) {
    //console.log(response.statusCode);
    // if (!error && response.statusCode == 200) {
    //     console.log(body);
    // }
//});


// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });