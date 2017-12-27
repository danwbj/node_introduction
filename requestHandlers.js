var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require('fs')
var formidable = require('formidable')
function start(response,request) {
    console.log("Request handler 'start' was called.");
    //以下代码问题：使用空循环实现等待10秒在执行，由于node是单进程，所有请求start的时候会被阻塞，再来请求只有等待start返回之后再处理
    /* function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
      }
    
    sleep(10000);
    return "Hello Start"; */

    //以下代码问题：exec（执行shell命令）是异步非阻塞的，return content代码会在content = stdout;代码之前执行，导致返回empty
    /* var content = 'empty'
    exec('ls -l', function (error, stdout, stderr) {
        content = stdout;
    })
    return content */
    //正确的做法
    // exec('ls -l', function (error, stdout, stderr) {
    //     console.log('stdout: ', stdout);
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write(stdout);
    //     response.end();
    // })

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="file" name="upload">'+    
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();


}
  
function upload(response,request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
    
}
function showimage(response, request) {
    fs.readFile('/tmp/test.png', "binary",function (error,file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file,'binary');
            response.end();
        }
    })
    
}
  
exports.start = start;
exports.upload = upload;
exports.showimage = showimage;