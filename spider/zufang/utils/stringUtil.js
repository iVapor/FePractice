var removeSpace = (string) => {
    var result = ""
    for (var i = 0; i < string.length; i++) {
        var letter = string[i]
        if (letter == " " || letter == "\n") {
            continue
        }
        result += letter
    }
    return result
}

var stringUtil = {
    removeSpace,
}

module.exports = stringUtil