var fileSystem = require("fs")

var sendHtmlToBrowser = (path, response) => {
    var options = {
        encoding: "utf-8"
    }
    path = "template/" + path
    fileSystem.readFile(path, options, (error, data) => {
        response.send(data)
    })
}

var sendJSONToBrowser = (data, response) => {
    data = JSON.stringify(data, null, 2)
    response.send(data)
}

var registerRoutes = (routes, app) => {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

var routeUtil = {
    sendHtmlToBrowser,
    registerRoutes,
    sendJSONToBrowser,
}

module.exports = routeUtil