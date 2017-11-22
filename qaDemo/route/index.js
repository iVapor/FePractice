var routeUtil = require("../utils/routeUtil")

var index = {
    path: "/",
    method: "get",
    func: (request, response) => {
        var path = "index.html"
        routeUtil.sendHtmlToBrowser(path, response)
    }
}

var questionDetail = {
    path: "/questionDetail",
    method: "get",
    func: (request, response) => {
        var path = "questionDetail.html"
        routeUtil.sendHtmlToBrowser(path, response)
    }
}

var answered = {
    path: "/answered.html",
    method: "get",
    func: (request, response) => {
        var path = "answered.html"
        routeUtil.sendHtmlToBrowser(path, response)
    }
}

var noAnswered = {
    path: "/noAnswered.html",
    method: "get",
    func: (request, response) => {
        var path = "noAnswered.html"
        routeUtil.sendHtmlToBrowser(path, response)
    }
}

var routes = [
    index,
    questionDetail,
    answered,
    noAnswered,
]


module.exports.routes = routes