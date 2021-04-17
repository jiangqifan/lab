

var dataset = [3];

//选择body中的p元素
var p = d3.select("#container").selectAll("p");

//获取update部分
var update = p.data(dataset);

//获取enter部分
var enter = update.enter();

//update部分的处理：更新属性值
update.text(function (d) {
    return "update " + d;
});

//enter部分的处理：添加元素后赋予属性值
enter.append("p")
    .text(function (d) {
        return "enter " + d;
    });
update.exit().text(function (d) {
    return "exit";
});
// update.exit().remove()