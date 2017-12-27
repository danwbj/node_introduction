var requestHandlers = require('./requestHandlers')
var handler = {}
handler["/"] = requestHandlers.start;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload;
handler["/show"] = requestHandlers.showimage;
function route(pathname, response, request) { 
    console.log('router init----')
    if (typeof handler[pathname] === 'function') {
        handler[pathname](response,request)
    }
    else {
        console.log("No request handler found for " + pathname);
        return "404 Not found";
    }
}
module.exports.route = route