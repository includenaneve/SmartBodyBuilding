$(function () {
    var wid = window.innerWidth;
    $("#trainChart2").css({"width":wid-35+"px"});
    $('#PageWeek').ready(function () {
        $.ajax({
            type:"get",
            url: "php/dataWeek.php",
            async:false,
            dataType:"text",
            data:{Id:1}
        }).success(function (msg) {
            var tdWeek = [];
            var twWeek = [];
            var calorieWeek = [];
            var timesWeek = [];
            var dateWeek = [];
            var arrWeek = msg.split("\n");
            for (var i in arrWeek) {
                tdWeek[i] = $.parseJSON(arrWeek[i]).trainTime; //训练时长(分钟)
                twWeek[i] = $.parseJSON(arrWeek[i]).totalWeight; //总重量
                calorieWeek[i] = $.parseJSON(arrWeek[i]).calorie; //重重量
                timesWeek[i] = $.parseJSON(arrWeek[i]).times; //总次数
                dateWeek[i] = $.parseJSON(arrWeek[i]).weeks;
            }
            var ydata = []; //纵坐标数据
            var xAxisData = []; //横坐标周
            //给x轴添加数据
            for (var i = 0; i < 52; i++) {
                var tem = i+1;
                if(tem<10)
                {
                    xAxisData[i] = "20160"+tem;
                }
                else
                {
                    xAxisData[i] = "2016"+tem;
                }
                ydata[i] = 5;
            }
            xAxisData[0] = "201650";
            xAxisData[1] = "201651";
            xAxisData[2] = "201652";

            for(var i=3;i<55;i++)
            {
                var tem = i - 2;
                if(tem < 10)
                {
                    xAxisData[i] ="20170"+tem;
                }
                else
                {
                    xAxisData[i] = "2017"+tem;
                }
            }

            console.log(Array.toString(xAxisData));
            //给y轴添加数据
            for(var j in dateWeek)
            {
                for(var i in xAxisData)
                {
                    if(dateWeek[j] == xAxisData[i])
                    {
                        ydata[i] = calorieWeek[j];
                    }
                }
            }
            var myChart = echarts.init(document.getElementById('trainChart2'));
            var yMax = 800;
            var dataShadow = [];
            for (var i = 0; i < ydata.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                xAxis: {
                    data: xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: "#f9ffff",
                            fontSize:10
                        },
                        formatter: function (value, index) {
                            if (index == 3) {
                                initDataByValue(value);
                                    texts= "第"+parseInt(value)%100+"周"+"\n"+parseInt(parseInt(value)/100)+"年";
                            }
                            else {
                                    texts= parseInt(value) %100;
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
                animation:false,
                dataZoom: [
                    {
                        type: 'inside', //内嵌型组件
                        startValue: 0,
                        endValue: 6,
                        zoomLock: true
                    }
                ],
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
                    for (var i = 0; i < arrWeek.length; i++) {
                        if (value == dateWeek[i]) {
                            currentIndex = i;
                            break;
                        }
                    }
                    if (currentIndex != -1) {
                        $("#DayBox2").empty();
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
                                    $h1.html(parseInt(tdWeek[currentIndex] / 60) + " min");
                                    break;
                                case 1 :
                                    $h5.html("Calorie");
                                    $h1.html(calorieWeek[currentIndex] + " kcal");
                                    break;
                                case 2 :
                                    $h5.html("TotalWeight");
                                    $h1.html(twWeek[currentIndex] + " kg");
                                    break;
                                case 3 :
                                    $h5.html("Times");
                                    $h1.html(timesWeek[currentIndex]);
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
                            $("#DayBox2").append($div);
                        }
                    }
                    else {
                        $("#DayBox2").empty();
                    }
            }

        });
    });
})/**
 * Created by naneve on 2017/3/23.
 */
