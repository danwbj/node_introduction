var http = require("http");
var url = require("url")


function start(route) { 
    let onRequest = function (request, response) {
        // var postData = ''
        var pathname = url.parse(request.url).pathname
        // request.setEncoding('utf8')
        // request.addListener('data', function (d) {
        //     console.log('d: ', d);
        //     postData += d
            
        // })
        // request.addListener('end', function () {
        //     route(pathname,handler,response,postData)
        // })
        route(pathname,response,request)
      }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
module.exports.start = start
