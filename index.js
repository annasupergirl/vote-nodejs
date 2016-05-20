var server = require("./server"),
    router = require("./router"),
    requestHandlers = require("./requestHandlers"),
    handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/vote"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
