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
    path: "/questionDetail/:id",
    method: "get",
    func: (request, response) => {
        var questionId = request.params.id
        console.log("参数传过来的 id", request.params.id)
        var path = "questionDetail.html"
        routeUtil.sendDetailHtmlToBrowser((data) => {
            console.log("原来的 html 文件", data)
            var result = data.replace("##question_id##", questionId)
            console.log("返回的 html 文件", result)
            return result
        }, path, response)
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