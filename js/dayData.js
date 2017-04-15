$(function () {
    var wid = window.innerWidth;
    $("#trainChart").css({"width":wid-35+"px"});
    $("#PageDay").ready(function () {
        $.ajax({
            type:"get",
            url: "php/dataDay.php",
            dataType:"text",
            async:false,
            data:{Id:1}
        }).success(function (msg) {
            var dayTd = [];
            var dayTw = [];
            var dayCalorie = [];
            var dayTimes = [];
            var dayDays = [];
            var arr2 = msg.split('\n');
            for (var i = 0; i < arr2.length; i++) {
                dayTd[i] = $.parseJSON(arr2[i]).trainTime; //训练时长(分钟)
                dayTw[i] = $.parseJSON(arr2[i]).totalWeight; //总重量
                dayCalorie[i] = $.parseJSON(arr2[i]).calorie; //卡路里
                dayTimes[i] = $.parseJSON(arr2[i]).times; //总次数
                dayDays[i] = $.parseJSON(arr2[i]).days;
            }
            var mydate = new Date(2017, 0, 1);
            var ydata = []; //纵坐标数据
            var xAxisData = []; //横坐标日期2017/1/1 - 2018/1/1
            for (var i = 0; i < 365; i++) {
                xAxisData[i] = [(mydate.getMonth() + 1), mydate.getDate()].join('/');
                mydate.setDate(mydate.getDate() + 1); //日期加一天
                ydata[i] = 5;
            }
            for (var j in dayDays) {
                for (var i in xAxisData) {
                    if (dayDays[j] == xAxisData[i]) {
                        ydata[i] = dayCalorie[j];
                    }
                }
            }

            var myChart = echarts.init(document.getElementById('trainChart'));
            var yMax = 1000;
            var dataShadow = [];
            for (var i = 0; i < ydata.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                xAxis: {
                    data: xAxisData,
                    type:"category",
                    axisLabel: {
                        textStyle: {
                            color: "#ffffff"
                        },
                        formatter: function (value, index) {
                            if (index == 3) {
                                var date = new Date(value);
                                var texts = [(date.getMonth() + 1), date.getDate()].join('/');
                                initDataByValue(value);
                            }
                            else {
                                var date = new Date(value);
                                var texts = [(date.getMonth() + 1), date.getDate()].join('/');
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
                        startValue: 60,
                        endValue: 66,
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
                var val = "2017/" + value;
                //找索引
                var currentIndex = -1;
                for (var i = 0; i < dayDays.length; i++) {
                    if (value == dayDays[i]) {
                        currentIndex = i;
                        break;
                    }
                }
                if (currentIndex != -1) {
                    $("#DayBox").empty();
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
                                $h1.html(parseInt(dayTd[currentIndex] / 60) + " min");
                                break;
                            case 1 :
                                $h5.html("Calorie");
                                $h1.html(dayCalorie[currentIndex] + " kcal");
                                break;
                            case 2 :
                                $h5.html("TotalWeight");
                                $h1.html(dayTw[currentIndex] + " kg");
                                break;
                            case 3 :
                                $h5.html("Times");
                                $h1.html(dayTimes[currentIndex]);
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
                        $("#DayBox").append($div);
                    }
                }
                else {
                    $("#DayBox").empty();
                }
            }
        })
    })
})
