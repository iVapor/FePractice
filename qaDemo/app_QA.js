var express = require("express")
var bodyParser = require("body-parser")
var logUtil = require("./utils/logUtil")
var routeUtil = require("./utils/routeUtil")

var app = express()
app.use(express.static("static"))
app.use(bodyParser.json())

var indexRoutes = require("./route/index").routes
routeUtil.registerRoutes(indexRoutes, app)
var questionRoutes = require("./route/question").routes
routeUtil.registerRoutes(questionRoutes, app)
var answerRoutes = require("./route/answer").routes
routeUtil.registerRoutes(answerRoutes, app)

var server = app.listen(8000, () => {
    var instance = server.address()
    var address = instance.address
    var port = instance.port
    logUtil.log(`本地服务器启动: http://${address}:${port}`)
})