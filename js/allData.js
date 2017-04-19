$(function () {
    var wid = window.innerWidth;
    $("#trainChart4").css({"width": wid - 35 + "px"});
    $("#PageAll").ready(function () {
        $.ajax({
            type: "get",
            url: "php/dataAll.php",
            dataType: "text",
            data: {Id:1}
        }).success(function (msg) {
            //数据整理
            var arrAll = msg.split("\n");
            var allData = [];
            allData[0] = $.parseJSON(arrAll[0]).calorie; //卡路里
            allData[1] = $.parseJSON(arrAll[0]).trainTime / 60; //训练时长(分钟)
            allData[2] = $.parseJSON(arrAll[0]).times; //总次数
            allData[3] = $.parseJSON(arrAll[0]).totalWeight; //总重量
            allData[4] = parseInt($.parseJSON(arrAll[0]).heartRate);
            allData[5] = parseInt($.parseJSON(arrAll[0]).frequency);
            maxCalorie = parseInt(allData[0])+200;
            maxTrainTime = parseInt(allData[1])+200;
            maxTimes = parseInt(allData[2])+200;
            maxTotalWeight = parseInt(allData[3])+200;
            maxHeartRate = 150;
            maxFrequency = 100;
            //创建图表
            var myChart = echarts.init(document.getElementById('trainChart4'));

            for (var i = 0; i < arrAll.length; i++) {

            }
            var option = {
                tooltip: {},
                radar: {
                    indicator: [
                        {name: '总卡路里', max: maxCalorie},
                        {name: '总训练时长', max: maxTrainTime},
                        {name: '总次数', max: maxTimes},
                        {name: '总重量', max: maxTotalWeight},
                        {name: '平均心率', max: maxHeartRate},
                        {name: '平均频率', max: maxFrequency}
                    ]
                },
                series: [{
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            color: "#000000"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#43ff00"
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: "#279200",
                        }
                    },
                    data: [
                        {
                            value: allData,
                            name: '您的训练进度'
                        }
                    ]
                }]
            };
            //图表配置结束
            myChart.setOption(option);

            //添加新的DOM
            $("#DataBox").empty();
            for (var i = 0; i < 6; i++) {
                var $div = $("<div></div>");
                var $h1 = $("<h3></h3>");
                var $h5 = $("<h5></h5>");
                $div.css({
                    "display": "block",
                    "width": "100%",
                    "border-top": "solid 1px rgba(255,255,255,0.1)",
                    "height": "40px",
                    "margin-top":"10px"
                });
                $h1.css({
                    "display": "inline-block",
                    "color": "white",
                    "margin-left":"30px"
                });
                $h5.css({
                    "display": "inline-block",
                    "color": "rgba(255,255,255,0.5)",
                    "width":"30%"
                });
                switch (i) {
                    case 0 :
                        $h5.html("总卡路里");
                        $h1.html(allData[i] + "&nbspkcal");
                        break;

                    case 1 :
                        $h5.html("训练总时长");
                        $h1.html(parseInt(allData[i]) + "&nbspmin");
                        break;
                    case 2 :
                        $h5.html("总次数");
                        $h1.html(allData[i]);
                        break;
                    case 3 :
                        $h5.html("总重量");
                        $h1.html(allData[i] + "&nbspkg");
                        break;
                    case 4:
                        $h5.html("平均心率");
                        $h1.html(allData[i]);
                        break;
                    case 5:
                        $h5.html("平均频率");
                        $h1.html(allData[i]);
                        break;
                    default:
                        break;
                }
                $div.append($h5);
                $div.append($h1);
                $("#DataBox").append($div);
            }


        });
    })
})