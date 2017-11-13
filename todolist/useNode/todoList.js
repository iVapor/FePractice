var express = require("express")
var logUtil = require("./utils/logUtil")
var apiUtil = require("./utils/apiUtil")
var requestBodyParser = require("body-parser")
var app = express()

var todoList = {
    newTodo: [],
    doneTodo: [],
}

var getTodoId = () => {
    var len = todoList.newTodo.length + todoList.doneTodo.length
    if (len == 0) {
        return 1
    }
    return len + 1
}

var findTodoIndex = (data) => {
    // {id: "5", state: "unCompleted"}
    var todoItem = data
    var array
    var isDone
    if (todoItem.state == "unCompleted") {
        array = todoList.newTodo
        isDone = false
    } else {
        array = todoList.doneTodo
        isDone = true
    }
    for (var i = 0; i < array.length; i++) {
        var item = array[i]
        if (item.id == todoItem.id) {
            return {
                index: i,
                isDone,
            }
        }
    }
    return undefined
}

app.use(express.static("static"))
app.use(requestBodyParser.json())

app.get("/", (request, response) => {
    var path = "index.html"
    apiUtil.sendHTML(path, response)
})

app.post("/todo/add", (request, response) => {
    var data = request.body
    data.id = getTodoId()
    todoList.newTodo.push(data)
    apiUtil.returnDataToBrowser(data, response)
})

app.post("/todo/remove", (request, response) => {
    var data = request.body
    var queryResult = findTodoIndex(data)
    var index = queryResult.index
    if (index == undefined) {
        apiUtil.returnDataToBrowser({}, response)
        return
    }
    if (queryResult.isDone) {
        todoList.doneTodo.splice(index, 1)
    } else {
        todoList.newTodo.splice(index, 1)
    }
    apiUtil.returnDataToBrowser(data, response)
})

app.post("/todo/change", (request, response) => {
    var data = request.body //{id: "5", state: "unCompleted"}
    var queryResult = findTodoIndex(data)//query { index: 4, isDone: false }
    var index = queryResult.index
    if (index == undefined) {
        apiUtil.returnDataToBrowser({}, response)
        return
    }
    if (queryResult.isDone) {
        var todoTask = todoList.doneTodo[index]
        todoTask.state = "unCompleted"
        todoList.newTodo.push(todoTask)
        todoList.doneTodo.splice(index, 1)

    } else {
        var todoTask = todoList.newTodo[index]
        todoTask.state = "done"
        todoList.doneTodo.push(todoTask)
        todoList.newTodo.splice(index, 1)
    }
    apiUtil.returnDataToBrowser(data, response)
})

app.get("/todo/all", (request, response) => {
    apiUtil.returnDataToBrowser(todoList, response)
})

var server = app.listen(8000, () => {
    var serverAddress = server.address()
    var host = serverAddress.address
    var port = serverAddress.port
    logUtil.log(`应用实例，访问地址为：http://${host}:${port}`)
})