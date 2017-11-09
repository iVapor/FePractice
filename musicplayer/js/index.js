var switchPlayButtonIcon = (isPlaying) => {
    var playButton = e(".class-span-play")
    var classList = playButton.classList
    if (isPlaying) {
        classList.add("icon-zanting")
        classList.remove("icon-bofang")
        return
    }
    classList.add("icon-bofang")
    classList.remove("icon-zanting")
}

var musicPlayEvent = (audioPlayer) => {
    audioPlayer.play()
    switchPlayButtonIcon(true)
}

var musicPauseEvent = (audioPlayer) => {
    audioPlayer.pause()
    switchPlayButtonIcon(false)
}

var bindPlayButtonEvent = () => {
    var playButton = e(".class-span-play")
    bindEvent(playButton, "click", function(event) {
        var audioPlayer = e("audio")
        var isPausing = audioPlayer.paused
        if (isPausing) {
            musicPlayEvent(audioPlayer)
            return
        }
        musicPauseEvent(audioPlayer)
    })
}

var getRandomChannel = (response) => {
    var channelArray = response.channels
    var randomChannel = Math.floor(Math.random() * channelArray.length)
    var item = channelArray[randomChannel]
    var channelName = item.name
    var channelId = item.channel_id
    return {
        name: channelName,
        id: channelId,
    }
}

var setMusicPlayer = (song) => {
    var url = song.url
    var audioPlayer = e("audio")
    var musicName = e(".class-p-musicName")
    var musicAuthor = e(".class-p-author")
    var musicDiv = e(".class-div-picture")
    audioPlayer.src = url
    musicName.innerHTML = song.title
    musicAuthor.innerHTML = song.artist
    musicDiv.style.backgroundImage = `url(${song.picture})`
    musicPlayEvent(audioPlayer)
}

var getChannelIdFromDataSet = () => {
    var musicInfoDiv = e(".class-div-musicInfo")
    var id = musicInfoDiv.dataset.channelId
    return id
}

var requestMusic = (channelId) => {
    var musicRequest = {
        url: `http://api.jirengu.com/fm/getSong.php?channel=${channelId}`,
        method: "GET",
        callback: (response) => {
            var song = response.song[0]
            setMusicPlayer(song)
        }
    }
    ajax(musicRequest)
}

var getMusicSource = () => {
    var channelRequest = {
        url: "http://api.jirengu.com/fm/getChannels.php",
        method: "GET",
        callback: (response) => {
            var singleChannel = getRandomChannel(response)
            var musicInfoDiv = e(".class-div-musicInfo")
            musicInfoDiv.dataset.channelId = singleChannel.id
            requestMusic(singleChannel.id)
        }
    }
    ajax(channelRequest)
}

var autoEvent = (musicPlayer, inProgressBar) => {
    setInterval(() => {
        var length = musicPlayer.currentTime / musicPlayer.duration * 100
        inProgressBar.style.width = `${length}%`
    }, 500)
}

var barMouseDownEvent = (musicPlayer, outProgressBar, inProgressBar) => {
    bindEvent(outProgressBar, "mousedown", function(event) {
        var offset = event.offsetX
        var rangeX = offset / 400
        musicPlayer.currentTime = musicPlayer.duration * rangeX
    })
}

var bindProgressBarEvent = () => {
    var musicPlayer = e("audio")
    var inProgressBar = e(".class-span-inProgressbar")
    var outProgressBar = e(".class-span-outProgressbar")
    autoEvent(musicPlayer, inProgressBar)
    barMouseDownEvent(musicPlayer, outProgressBar, inProgressBar)
}

var bindPlayerEndEvent = () => {
    var audioPlayer = e("audio")
    bindEvent(audioPlayer, "ended", function(event) {
        var state = e(".class-span-loop").dataset.state
        if (state == "open") {
            audioPlayer.currentTime = 0
            musicPlayEvent(audioPlayer)
            return
        }
        var id = getChannelIdFromDataSet()
        requestMusic(id)
        switchPlayButtonIcon(false)
    })
}

var bindNextSongEvent = () => {
    var nextSongButton = e(".class-span-next")
    bindEvent(nextSongButton, "click", function(event) {
        var id = getChannelIdFromDataSet()
        requestMusic(id)
    })
}

var changePlayerSound = (isSound) => {
    var musicPlayer = e("audio")
    if (isSound) {
        var barSelector = e(".class-span-inSoundbar")
        var volumeNum = Number(barSelector.dataset.volume)
        musicPlayer.volume = volumeNum
        return
    }
    musicPlayer.volume = 0
}

var switchSoundIcon = (element) => {
    var state = element.dataset.state
    if (state == "open") {
        element.classList.remove("icon-yinliang")
        element.classList.add("icon-jinying")
        element.dataset.state = "close"
        changePlayerSound(false)
        return
    }
    element.classList.remove("icon-jinying")
    element.classList.add("icon-yinliang")
    changePlayerSound(true)
    element.dataset.state = "open"
}

var bindSoundButtonEvent = () => {
    var soundButton = e(".class-span-sound")
    bindEvent(soundButton, "click", function(event) {
        var self = event.target
        switchSoundIcon(self)
    })
}

var bindSoundBarEvent = () => {
    var inSoundBar = e(".class-span-inSoundbar")
    var outSoundBar = e(".class-span-outSoundbar")
    bindEvent(outSoundBar, "mousedown", function(event) {
        var offset = event.offsetX
        inSoundBar.style.width = `${offset}.px`
        var soundButton = e(".class-span-sound")
        var soundState = soundButton.dataset.state
        if (soundState == "open") {
            var musicPlayer = e("audio")
            var num = offset / 80
            musicPlayer.volume = num
            inSoundBar.dataset.volume = num
        }
    })
}

var changeLoopButtonState = (loopButton) => {
    var state = loopButton.dataset.state
    if (state == "close") {
        loopButton.classList.add("class-span-loop-start")
        loopButton.dataset.state = "open"
        return
    }
    loopButton.classList.remove("class-span-loop-start")
    loopButton.dataset.state = "close"
}

var bindLoopButtonEvent = () => {
    var loopButton = e(".class-span-loop")
    bindEvent(loopButton, "click", function(event) {
        var self = event.target
        changeLoopButtonState(self)
    })
}

var bindEvents = () => {
    bindPlayButtonEvent()
    bindProgressBarEvent()
    bindPlayerEndEvent()
    bindNextSongEvent()
    bindSoundButtonEvent()
    bindSoundBarEvent()
    bindLoopButtonEvent()
}

var __main = () => {
    getMusicSource()
    bindEvents()
}

__main()
