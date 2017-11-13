var log = console.log.bind(console)

var e = (selector) => {
    return document.querySelector(selector)
}

var bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, function(event) {
        callback(event)
    })
}

var ajax = (request) => {
    var newRequest = new XMLHttpRequest()
    newRequest.open(request.method, request.path, true)
    if (request.contentType != undefined) {
        newRequest.setRequestHeader("Content-Type", request.contentType)
    }
    newRequest.onreadystatechange = function () {
        if (newRequest.readyState == 4) {
            var response = newRequest.response
            request.callback(response)
        }
    }
    if (request.method == "POST") {
        var data = JSON.stringify(request.data)
        newRequest.send(data)
        return
    }
    newRequest.send()
}