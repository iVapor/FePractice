## 所有 node 项目需要执行 yarn install 安装依赖的库后才可运行

## 音乐播放器 Demo

![](https://github.com/nbhaohao/FePractice/blob/master/musicplayer/musicPlayerDemo.gif "播放器demo")

## TodoList Demo (node版本需要执行 yarn install 安装库后才可运行)

![](https://github.com/nbhaohao/FePractice/blob/master/todolist/todoList.gif "TodoListDemo")

## CSS 一句话笔记
* `visibility: hidden` 和 `display: none` 的区别是：visibility 会占据原来的空间隐藏元素，display 不会占据原来的空间隐藏元素。
* `background-position: 50% 50%;` 搭配 `background-img` 和 `background-repeat` 使图片出现在元素的中间。
* `letter-spacing` 会增加字符间距 (字符是指英文字母、汉字及其他字符)，`word-spacing` 它只会增加单词间距 (单词是指左右两边有空白的字符或字符串)。
* CSS 不会为一个完整的单词换行，所以一个超长的 URL 可能会超出 Div 的范围，可以使用 `word-wrap: break-word` 或其他方法来解决；同样地，大图片也会引发这样的问题，可以使用 `max-width: 100%;`。多测试你的布局是否可以承受长 URL，长内容，大图片。
