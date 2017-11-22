var answerModel = require("../model/answer")
var routeUtil = require("../utils/routeUtil")

var all = {
    path: "/api/answer/all",
    method: "get",
    func: (request, response) => {
        var data = answerModel.all()
        routeUtil.sendJSONToBrowser(data, response)
    }
}

var add = {
    path: "/api/answer/add",
    method: "post",
    func: (request, response) => {
        var data = request.body
        var model = answerModel.new(data)
        routeUtil.sendJSONToBrowser(model, response)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes