var log = console.log.bind(console)
var bindAll = (elements, eventName, eventFunction) => {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, function(event) {
            eventFunction(event)
        })
    }
}

var removeClass = (className) => {
    var elements = document.querySelectorAll("." + className)
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className)
    }
}

var bindOnlyRed = (index) => {
    removeClass("class-span-circleRed")
    var circleSelector = document.querySelector("#id-span-circle" + index)
    circleSelector.classList.add("class-span-circleRed")
}

var bindSlidePhotos = (index) => {
    var photoId = "#id-img-photo" + index
    var imgSelector = document.querySelector(photoId)
    removeClass("activePhoto")
    imgSelector.classList.add("activePhoto")
}

var bindCircleMouseOver = () => {
    var circles = document.querySelectorAll(".class-span-circle")
    bindAll(circles, "mouseover", function(event) {
        var self = event.target
        var index = self.dataset.number
        bindOnlyRed(index)
        bindSlidePhotos(index)
    })
}

var bindMainMouseOver = () => {
    var main = document.querySelector(".class-div-main")
    main.addEventListener("mouseover", function(event) {
        removeClass("class-span-buttonShow")
        var buttons = document.querySelectorAll(".class-div-Buttons")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("class-span-buttonShow")
        }
        var taskId = getIntervalId()
        clearInterval(taskId)
    })
}

var bindMainMouseOut = () => {
    var main = document.querySelector(".class-div-main")
    main.addEventListener("mouseout", function(event) {
        removeClass("class-span-buttonShow")
        autoSlide()
    })
}

var bindButtonHighLight = () => {
    var buttons = document.querySelectorAll(".class-div-Buttons")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseover", function(event) {
            var self = event.target
            removeClass("class-span-buttonHighLight")
            self.classList.add("class-span-buttonHighLight")
        })
    }
}

var bindButtonNormalLight = () => {
    var buttons = document.querySelectorAll(".class-div-Buttons")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseout", function(event) {
            removeClass("class-span-buttonHighLight")
        })
    }
}

var nextIndex = (offset) => {
    // (总数 + 现在的数字 + offset) % 总数 就是下一张图片
    var allNumber = 3
    var mainDiv = document.querySelector(".class-div-main")
    var currentNumber = Number(mainDiv.dataset.index)
    var nextNumber = (allNumber + currentNumber + offset) % allNumber
    return nextNumber
}

var slidePhotoAndCircle = (offset) => {
    var nextNumber = nextIndex(offset)
    var mainDiv = document.querySelector(".class-div-main")
    bindOnlyRed(nextNumber)
    bindSlidePhotos(nextNumber)
    mainDiv.dataset.index = nextNumber
}

var bindButtonClickEvent = () => {
    var buttons = document.querySelectorAll(".class-div-Buttons")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            var offset = Number(event.target.dataset.offset)
            slidePhotoAndCircle(offset)
        })
    }
}

var bindEvents = () => {
    bindCircleMouseOver()
    bindMainMouseOver()
    bindMainMouseOut()
    bindButtonHighLight()
    bindButtonNormalLight()
    bindButtonClickEvent()
}

var setIntervalId = (taskId) => {
    var main = document.querySelector(".class-div-main")
    main.dataset.taskid = taskId
}

var getIntervalId = () => {
    var main = document.querySelector(".class-div-main")
    return main.dataset.taskid
}

var autoSlide = () => {
    var taskId = setInterval(() => {
        slidePhotoAndCircle(1)
    }, 2000)
    setIntervalId(taskId)
}

var __main = () => {
    autoSlide()
    bindEvents()
}

__main()
