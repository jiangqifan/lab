
var width = 600;  //画布的宽度
var height = 300;   //画布的高度

var svg = d3.select("body")     //选择文档中的body元素
    .append("svg")          //添加一个svg元素
    .attr("width", width)       //设定宽度
    .attr("height", height);    //设定高度
var padding = { left: 30, right: 30, top: 20, bottom: 20 };

var dataset = [250, 210, 170, 130, 90];  //数据（表示矩形的宽度）

console.log(d3)

const max = width - padding.left - padding.right
const rangeBand = max / dataset.length
//x轴的比例尺
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, max])
// .interpolate(d3.interpolateRound)

//y轴的比例尺
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0]);

//定义x轴
var xAxis = d3.axisBottom(xScale)

//定义y轴
var yAxis = d3.axisLeft(yScale)
//矩形之间的空白
var rectPadding = 4;

var rects = svg.selectAll(".MyRect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "MyRect")   //把类里的 fill 属性清空
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function (d, i) {
        return xScale(i) + rectPadding / 2;
    })
    .attr("y", function (d) {
        return yScale(d);
    })
    // .attr("width", xScale.rangeBand() - rectPadding )
    .attr("width", rangeBand - rectPadding)
    .attr("height", function (d) {
        return height - padding.top - padding.bottom - yScale(d);
    })
    .attr("fill", "steelblue")       //填充颜色不要写在CSS里
    .on("mouseover", function (d, i) {
        d3.select(this)
            .attr("fill", "yellow");
    })
    .on("mouseout", function (d, i) {
        d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "steelblue");
    });


// 添加文字元素
var texts = svg.selectAll(".MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "MyText")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function (d, i) {
        return xScale(i) + rectPadding / 2;
    })
    .attr("y", function (d) {
        return yScale(d);
    })
    .attr("dx", function () {
        // return (xScale.bandwidth() - rectPadding)/2;
        return (rangeBand - rectPadding) / 2;
    })
    .attr("dy", function (d) {
        return 20;
    })
    .text(function (d) {
        return d;
    });

//添加x轴
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

//添加y轴
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis);