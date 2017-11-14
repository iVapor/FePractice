var fileSystem = require("fs")
var iconvLite = require("iconv-lite")

var checkFileExists = (path) => {
    var result = fileSystem.existsSync(path)
    return result
}

var createDir = (path) => {
    var isExists = checkFileExists(path)
    if (isExists) {
        return
    }
    fileSystem.mkdirSync(path)
}

var syncWriteFile = (path, data) => {
    fileSystem.writeFileSync(path, data)
}

var syncReadGBKFile = (path) => {
    var data = fileSystem.readFileSync(path)
    var parseData = iconvLite.decode(data, "GB2312")
    return parseData
}

var fileUtil = {
    createDir,
    syncWriteFile,
    checkFileExists,
    syncReadGBKFile,
}

module.exports = fileUtil