$(function () {
    var wid = window.innerWidth;
    $("#trainChart3").css({"width":wid-35+"px"});
    $('#PageMonth').ready(function () {
        $.ajax({
            type:"get",
            url: "php/dataMonth.php",
            dataType:"text",
            async:false,
            data:{Id:1}
        }).success(function (msg) {
            var tdMonth = [];
            var twMonth = [];
            var calorieMonth = [];
            var timesMonth = [];
            var dateMonth = [];
            var arrMonth = msg.split("\n");
            for (var i in arrMonth) {
                tdMonth[i] = $.parseJSON(arrMonth[i]).trainTime; //训练时长(分钟)
                twMonth[i] = $.parseJSON(arrMonth[i]).totalWeight; //总重量
                calorieMonth[i] = $.parseJSON(arrMonth[i]).calorie; //重重量
                timesMonth[i] = $.parseJSON(arrMonth[i]).times; //总次数
                dateMonth[i] = $.parseJSON(arrMonth[i]).months;
            }
            var ydata = []; //纵坐标数据
            var xAxisData = []; //横坐标周
            //给x轴添加数据
            for (var i = 0; i < 12; i++) {
                xAxisData[i] = i+1;
                ydata[i] = 5;
            }
            //给y轴添加数据
            for(var j in dateMonth)
            {
                for(var i in xAxisData)
                {
                    if(dateMonth[j] == xAxisData[i])
                    {
                        ydata[i] = calorieMonth[j];
                    }
                }
            }
            var myChart = echarts.init(document.getElementById('trainChart3'));
            var yMax = 1000;
            var dataShadow = [];
            for (var i = 0; i < ydata.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                xAxis: {
                    data: xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: "#fff"
                        },
                        formatter: function (value, index) {
                            if (index == 3) {
                                initDataByValue(value);
                                texts=value+"月\n2017年";
                            }
                            else {
                                texts = value;
                            }
                            return texts;
                        },
                        inside: false,
                        interval: 0
                        // rotate:-45
                    },
                    axisTick: { //不显示数轴指针
                        show: false
                    },
                },
                yAxis: {
                    axisLine: { //不显示数轴
                        show: false
                    },
                    axisTick: { //不显示数轴指针
                        show: false
                    },
                    axisLabel: { //数轴文字设定
                        textStyle: {
                            color: '#999' //灰色
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside', //内嵌型组件
                        startValue: 0,
                        endValue: 6,
                        zoomLock: true
                    }
                ],
                animation:false,
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {  //默认的柱子颜色
                            normal: {color: 'rgba(0,0,0,0.2)'}
                        },
                        barGap: '-100%',
                        barCategoryGap: '5%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: ydata
                    }
                ]
            };
            myChart.setOption(option);

            function initDataByValue(value) {
                var currentIndex = -1;
                for (var i = 0; i < arrMonth.length; i++) {
                    if (value == dateMonth[i]) {
                        currentIndex = i;
                        break;
                    }
                }
                if (currentIndex != -1) {
                    $("#DayBox3").empty();
                    for (var i = 0; i < 4; i++) {
                        var $div = $("<div></div>");
                        var $h1 = $("<h3></h3>");
                        var $h5 = $("<h5></h5>");
                        $div.css({
                            "display": "inline-block",
                            "width": "49%",
                            "border": "solid 1px rgba(255,255,255,0.1)",
                            "height": "100px"
                        });
                        switch (i) {
                            case 0 :
                                $h5.html("TrainningTime");
                                $h1.html(parseInt(tdMonth[currentIndex] / 60) + " min");
                                break;
                            case 1 :
                                $h5.html("Calorie");
                                $h1.html(calorieMonth[currentIndex] + " kcal");
                                break;
                            case 2 :
                                $h5.html("TotalWeight");
                                $h1.html(twMonth[currentIndex] + " kg");
                                break;
                            case 3 :
                                $h5.html("Times");
                                $h1.html(timesMonth[currentIndex]);
                                break;
                            default:
                                break;
                        }
                        $h1.css({"display": "block", "color": "white", "margin": "10px auto"});
                        $h5.css({
                            "display": "block",
                            "color": "rgba(255,255,255,0.5)",
                            "margin": "20px auto",
                            "text-align": "center"
                        });
                        $div.append($h5);
                        $h5.append($h1);
                        $("#DayBox3").append($div);
                    }
                }
                else {
                    $("#DayBox3").empty();
                }
            }

        });
    });
})/**
 * Created by naneve on 2017/3/23.
 */
