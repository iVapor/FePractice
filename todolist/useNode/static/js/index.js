var todoTemplate = (text, state, id) => {
    var removeSVG =
    `<svg class="class-svg-remove" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="class-svg-remove noFill" width="22" height="22"/><g><g><path class="class-svg-remove fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="class-svg-remove fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill class-svg-remove" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="class-svg-remove fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>`
    var completeSVG =
    `<svg class="class-svg-complete" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="class-svg-complete fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>`
    var item = document.createElement('li')
    item.innerText = text
    item.dataset.state = `${state}`
    item.dataset.id = `${id}`
    var buttons = document.createElement('div');
    buttons.classList.add('class-div-todoButtons');
    var remove = document.createElement('button');
    remove.classList.add('class-button-removeTodo');
    remove.innerHTML = removeSVG;
    bindEvent(remove, "click", removeTodo)
    var complete = document.createElement('button');
    complete.classList.add('class-button-completeTodo');
    complete.innerHTML = completeSVG;
    bindEvent(complete, "click", completeTodo)
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    return item
}

var addNewTodoItem = (todoText, state, id) => {
    var html = todoTemplate(todoText, state, id)
    if (state == "unCompleted") {
        var allTodoList = document.querySelector(".class-ul-allTodo")
        allTodoList.appendChild(html)
        return
    }
    var doneTodoList = document.querySelector(".class-ul-doneTodo")
    doneTodoList.appendChild(html)
}

var bindAddButtonEvent = () => {
    var addButton = e("#id-button-addTodo")
    bindEvent(addButton, "click", function(event) {
        var todoInput = e("#id-input-todoText")
        var todoText = todoInput.value
        if (todoText) {
            var newItem = {
                text: todoText,
                state: "unCompleted",
            }
            addTodoApi(newItem, (response) => {
                response = JSON.parse(response)
                addNewTodoItem(response.text, response.state, response.id)
                todoInput.value = ""
            })
        }
    })
}

var removeTodo = (event) => {
    var self = event.target
    var parentLi = self.closest("li")
    var data = {
        id: parentLi.dataset.id,
        state: parentLi.dataset.state,
    }
    removeTodoApi(data, (response) => {
        log("删除成功", response)
        parentLi.classList.add("removeLi")
        setTimeout(function() {
            parentLi.remove()
        }, 300)
    })

}

var completeTodo = (event) => {
    var self = event.target
    var parentLi = self.closest("li")
    var baseState = parentLi.dataset.state
    var data = {
        id: parentLi.dataset.id,
        state: baseState,
    }
    log("发送的数据是", data)
    changeTodoStateApi(data, (response) => {
        log("状态更新成功", response)
        if (baseState == "unCompleted") {
            var doneList = e(".class-ul-doneTodo")
            doneList.appendChild(parentLi)
            parentLi.dataset.state = "done"
        } else {
            var unCompleteList = e(".class-ul-allTodo")
            unCompleteList.appendChild(parentLi)
            parentLi.dataset.state = "unCompleted"
        }
    })

}

var bindEvents = () => {
    bindAddButtonEvent()
}

var getTodoApi = (callback) => {
    var newRequest = {
        method: "GET",
        path: "/todo/all",
        contentType: "application/json",
        callback: callback,
    }
    ajax(newRequest)
}

var addTodoApi = (item, callback) => {
    var newRequest = {
        method: "POST",
        path: "/todo/add",
        contentType: "application/json",
        data: item,
        callback: callback,
    }
    ajax(newRequest)
}

var removeTodoApi = (data, callback) => {
    var newRequest = {
        method: "POST",
        path: "/todo/remove",
        contentType: "application/json",
        callback,
        data,
    }
    ajax(newRequest)
}

var changeTodoStateApi = (data, callback) => {
    var newRequest = {
        method: "POST",
        path: "/todo/change",
        contentType: "application/json",
        callback,
        data,
    }
    ajax(newRequest)
}

var insertTodoItems = (data) => {
    data = JSON.parse(data)
    var newTodoArray = data.newTodo
    var doneTodoArray = data.doneTodo
    for (var i = 0; i < newTodoArray.length; i++) {
        var item = newTodoArray[i]
        addNewTodoItem(item.text, item.state, item.id)
    }
    for (var j = 0; j < doneTodoArray.length; j++) {
        var item = doneTodoArray[j]
        addNewTodoItem(item.text, item.state, item.id)
    }
}

var initTodoList = () => {
    getTodoApi((response) => {
        insertTodoItems(response)
    })
}

var __main = () => {
    initTodoList()
    bindEvents()
}

__main()
