var fileSystem = require("fs")

var sendHTML = (path, response) => {
    var options = {
        encoding: "utf-8",
    }
    fileSystem.readFile(path, options, (error, data) => {
        response.send(data)
    })
}

var returnDataToBrowser = (data, response) => {
    data = JSON.stringify(data)
    response.send(data)
}

var apiUtil = {
    sendHTML,
    returnDataToBrowser,
}

module.exports = apiUtil