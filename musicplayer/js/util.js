var log = console.log.bind(console)

var e = (selector) => {
    var element = document.querySelector(selector)
    return element
}

var bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, function(event) {
        callback(event)
    })
}

var ajax = (request) => {
    var newRequest = new XMLHttpRequest()
    var method = request.method
    newRequest.open(method, request.url, true)
    var contentType = request.contentType
    if (contentType != undefined) {
        newRequest.setRequestHeader("Content-Type", contentType)
    }
    newRequest.onreadystatechange = function () {
        if (newRequest.readyState == 4) {
            var parseData = JSON.parse(newRequest.response)
            request.callback(parseData)
        }
    }
    if (method == "GET") {
        newRequest.send()
        return
    }
    newRequest.send(request.data)
}
