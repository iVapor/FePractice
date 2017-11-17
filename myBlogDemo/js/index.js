var bindSideBarEvent = (sideBar, maskDiv) => {
    var sideBarButton = $(".class-li-sideBarButton")
    sideBarButton.on("click", function() {
        maskDiv.fadeIn()
        sideBar.css("right", 0)
    })
}

var bindMaskEvent = (sideBar, maskDiv) => {
    maskDiv.on("click", function() {
        maskDiv.fadeOut()
        var width = (sideBar.width()) * -1
        sideBar.css("right", width)
    })
}

var bindBackTopButtonEvent = (backTopButton) => {
    var htmlAnimation = {"scrollTop": 0}
    backTopButton.on("click", function() {
        $("html, body").animate(htmlAnimation, 800)
    })
}

var bindWindowScrollEvent = (backTopButton) => {
    var windowSelector = $(window)
    windowSelector.on("scroll", function() {
        var scrollTop = windowSelector.scrollTop()
        var windowHeight = windowSelector.height()
        if (scrollTop > windowHeight) {
            backTopButton.fadeIn()
        } else {
            backTopButton.fadeOut()
        }
    })
}

var bindEvents = () => {
    var sideBar = $("#id-div-sideBar")
    var maskDiv = $(".class-div-mask")
    var backTopButton = $("#id-button-backToTop")
    bindSideBarEvent(sideBar, maskDiv)
    bindMaskEvent(sideBar, maskDiv)
    bindBackTopButtonEvent(backTopButton)
    bindWindowScrollEvent(backTopButton)
}

var hideBackTopButton = () => {
    $(window).trigger("scroll")
}

var __main = () => {
    bindEvents()
    hideBackTopButton()
}

__main()
