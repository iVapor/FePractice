var getQuestionTemplate = (model) => {
    var d = new Date(model.createTime * 1000)
    var time = d.toLocaleString()
    var answersNum = model.answers.length
    var answersString
    if (answersNum > 0) {
        answersString = `查看回答(${answersNum}条)`
    } else {
        answersString = `暂无回答`
    }
    var html = `            
            <div class="class-div-questionItem">
                <p class="class-p-author"><span>提问者:</span>${model.author}</p>
                <a href="/questionDetail" class="class-a-title">${model.title}</a>
                <p class="class-p-content">${model.content}</p>
                <span class="class-span-createTime">${time}</span>
                <span class="class-span-showAnswer">${answersString}</span>
            </div>`
    return html
}

var getAnswerListTemplate = (model) => {
    var html = `
                    <div class="class-div-answers">
                    <div class="class-div-answerNum">
                        <span class="class-span-answerNum">2 条回答</span>
                    </div>
                    <div class="class-div-answerItem">
                        <p class="class-p-aAuthor">用户名</p>
                        <p class="class-p-aContent">我是评我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论论</p>
                        <span class="class-span-aCreateTime">1996/7/10</span>
                    </div>
                    <div class="class-div-answerItem">
                        <p class="class-p-aAuthor">用户名</p>
                        <p class="class-p-aContent">我是评我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论论</p>
                        <span class="class-span-aCreateTime">1996/7/10</span>
                    </div>
                    <div class="class-div-answerItem">
                        <p class="class-p-aAuthor">用户名</p>
                        <p class="class-p-aContent">我是评我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论论</p>
                        <span class="class-span-aCreateTime">1996/7/10</span>
                    </div>
                </div>`
}