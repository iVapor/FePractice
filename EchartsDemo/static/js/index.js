var positionObject = {}
var areaObject = {
    "0~30平方米": 0,
    "30~60平方米": 0,
    "60~90平方米": 0,
    "90~120平方米": 0,
    "120~150平方米": 0,
    "超过150平方米": 0,
}

var priceObject = {
    "500元以下": 0,
    "500-800元": 0,
    "800-1200元": 0,
    "1200-1800元": 0,
    "1800-2500元": 0,
    "2500-3500元": 0,
    "3500元以上": 0,
}

var initCircleTable = (postionObject) => {
    var postionArray = []
    var keys = Object.keys(postionObject)
    for (var i = 0; i < keys.length; i++) {
        var newPosition = {}
        var keyName = keys[i]
        newPosition.name = keyName
        newPosition.value = postionObject[keyName]
        postionArray.push(newPosition)
    }
    var option = cirCleTableOptions(keys, postionArray)
    var divElement = document.querySelector(".circleTable")
    var circleTable = echarts.init(divElement)
    circleTable.setOption(option)
}

var initAreaTable = (areaObject) => {
    var keys = Object.keys(areaObject)
    var values = Object.values(areaObject)
    var option = columnTableOption(keys, values)
    var divElement = document.querySelector(".columnTable")
    var columnTable = echarts.init(divElement)
    columnTable.setOption(option)
}

var initPriceTable = (priceObject) => {
    var keys = Object.keys(priceObject)
    var data = []
    for (var i = 0; i < keys.length; i++) {
        var newItem = {}
        var keyName = keys[i]
        newItem.name = keyName
        newItem.value = priceObject[keyName]
        data.push(newItem)
    }
    var option = priceOption(keys, data)
    var priceDiv = document.querySelector(".priceTable")
    var priceTable = echarts.init(priceDiv)
    priceTable.setOption(option)
}

var calculatePosition = (item) => {
    var position = item.position
    if (positionObject[position] == undefined) {
        positionObject[position] = 1
    } else {
        positionObject[position] += 1
    }
}

var calculateArea = (item) => {
    var area = item.area
    if (area <= 30) {
        areaObject["0~30平方米"]++
    }
    else if (area <= 60) {
        areaObject["30~60平方米"]++
    }
    else if (area <= 90) {
        areaObject["60~90平方米"]++
    }
    else if (area <= 120) {
        areaObject["90~120平方米"]++
    }
    else if (area <= 150) {
        areaObject["120~150平方米"]++
    }
    else {
        areaObject["超过150平方米"]++
    }
}

var calculatePrice = (item) => {
    var price = item.price
    if (price <= 500) {
        priceObject["500元以下"]++
    }
    else if (price <= 800) {
        priceObject["500-800元"]++
    }
    else if (price <= 1200) {
        priceObject["800-1200元"]++
    }
    else if (price <= 1800) {
        priceObject["1200-1800元"]++
    }
    else if (price <= 2500) {
        priceObject["1800-2500元"]++
    }
    else if (price <= 3500) {
        priceObject["2500-3500元"]++
    }
    else {
        priceObject["3500元以上"]++
    }
}

var handleData = (dataArray) => {
    for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i]
        calculatePosition(item)
        calculateArea(item)
        calculatePrice(item)
    }
    initCircleTable(positionObject)
    initAreaTable(areaObject)
    initPriceTable(priceObject)
}

var getAllHouseData = () => {
    var request = {
        method: "GET",
        url: "/api/house/all",
        contentType: "application/json",
        callback: (response) => {
            var dataArray = response
            handleData(dataArray)
        }
    }
    ajax(request)
}

var __main = () => {
    getAllHouseData()
}

__main()