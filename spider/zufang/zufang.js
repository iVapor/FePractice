var syncRequest = require("sync-request")
var cheerIo = require("cheerio")
var fileUtil = require("./utils/fileUtil")
var stringUtil = require("./utils/stringUtil")

class House {
    constructor() {
        this.info = ""
        this.area = 0
        this.forward = ""
        this.position = ""
        this.price = 0
    }
}

var getHTML = (url) => {
    var request = syncRequest("GET", url)
    var body = request.getBody()
    return body
}

var getHouseHTML = () => {
    var baseUrl = "http://zu.nb.fang.com/house/i"
    for (var j = 30; j < 50; j++) {
        var newUrl = baseUrl + String(j)
        var body = getHTML(newUrl)
        var name = newUrl.slice(newUrl.length-3)
        var path = `houseCache/${name}.html`
        if (fileUtil.checkFileExists(path)) {
            continue
        }
        fileUtil.syncWriteFile(path, body)
    }
}

var transElementToObject = (element) => {
    var e = cheerIo.load(element)
    var house = new House()
    var priceElement = e(".mt5")
    var infoString = e(".font16").text()
    var position = e(".gray6").find("a")
    position = cheerIo.load(position[0]).text()
    infoString = stringUtil.removeSpace(infoString)
    var infoArray = infoString.split("|")
    var price = priceElement.text()
    house.info = infoArray[1]
    house.area = infoArray[2]
    house.forward = infoArray[3]
    house.price = price
    house.position = position
    return house
}

var transHTMLToObject = (html) => {
    var e = cheerIo.load(html)
    var items = e(".hiddenMap")
    var houses = []
    for (var i = 0; i < items.length; i++) {
        var p = items[i]
        var houseItem = transElementToObject(p)
        houses.push(houseItem)
    }
    return houses
}

var readHTML = () => {
    var houses = []
    for (var i = 30; i < 50; i++) {
        var path = `houseCache/i${i}.html`
        var data = fileUtil.syncReadGBKFile(path)
        var singlePageData = transHTMLToObject(data)
        houses = [...houses, ...singlePageData]
    }
    return houses
}

var createCacheDir = () => {
    fileUtil.createDir("houseCache")
}

var saveHouses = (data) => {
    var s = JSON.stringify(data, null, 2)
    var fs = require('fs')
    var path = 'ningboHouse.txt'
    fs.writeFileSync(path, s)
}

var __main = () => {
    createCacheDir()
    getHouseHTML()
    var data = readHTML()
    saveHouses(data)
}

__main()