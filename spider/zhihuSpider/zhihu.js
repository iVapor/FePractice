var syncRequest = require("sync-request")
var configInfo = require("./config")
var cheerIo = require("cheerio")
var fileSystem = require("fs")

class Problem {
    constructor() {
        this.title = ""
        this.answer = ""
        this.url = ""
    }
}

var getHTML = () => {
    var url = "https://www.zhihu.com/"
    var options = {
        "headers": {
            "user-agent": configInfo.userAgent,
            "cookie": configInfo.cookie,
        }
    }
    var request = syncRequest("GET", url, options)
    var page = request.getBody("utf8")
    return page
}

var transHTMLToObject = (html) => {
    html = cheerIo.load(html)
    var titles = html(".ContentItem-title")
    var answers = html(".RichContent-inner")
    var problemArray = []
    for (var i = 0; i < titles.length; i++) {
        var problem = new Problem()
        var item = titles[i]
        var answer = answers[i]
        var itemSelector = cheerIo.load(item)
        problem.title = itemSelector.text()
        problem.url = "http://www.zhihu.com" + itemSelector("a").attr("href")
        problem.answer = cheerIo.load(answer).text()
        problemArray.push(problem)
    }
    return problemArray
}

var saveData = (data) => {
    var path = "problems.txt"
    var parseData = JSON.stringify(data, null, 2)
    fileSystem.writeFileSync(path, parseData)
}

var __main = () => {
    var html = getHTML()
    var problemsArray = transHTMLToObject(html)
    saveData(problemsArray)
}

__main()