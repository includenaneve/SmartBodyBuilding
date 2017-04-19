
function initDataByValue(isValue) {
        $("#dataBox").empty();
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
                    $h1.html(parseInt($.parseJSON(isValue).trainTime / 60) + " min");
                    break;
                case 1 :
                    $h5.html("Calorie");
                    $h1.html($.parseJSON(isValue).calorie+ " kcal");
                    break;
                case 2 :
                    $h5.html("TotalWeight");
                    $h1.html($.parseJSON(isValue).totalWeight + " kg");
                    break;
                case 3 :
                    $h5.html("Times");
                    $h1.html($.parseJSON(isValue).times);
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
            $("#dataBox").append($div);
        }
}
$(function () {
    $("#main").ready(function () {
        var max = 500;
        $.ajax({
            type:"get",
            url: "php/profile.php",
            dataType:"text",
            async:false,
            data:{Id:1}
        }).success(function (msg) {
            var arr = msg.split('\n');
             max = parseInt($.parseJSON(arr[0]).targetCalories);
        });
        $.ajax({
            type: "post",
            url: "php/today.php",
            async:false,
            dataType: "text"
    }).success(function (msg) {
            var arr = msg.split('\n');
            var currentTime= new Date();
            var currentday = [currentTime.getFullYear(),currentTime.getMonth()+1, currentTime.getDate()].join('/');
            var mydata;

            if(msg == "")
            {
                $p = $("<h3>今天您还没运动<br/><br/>快开始您的健身之旅吧</h3>");
                $("#dataBox").empty();
                $("#mychart").empty();
                $("#dataBox").append($p);
            }
            else
            {
                for(var i=0;i<arr.length;i++)
                {
                    if(($.parseJSON(arr[i]).days) == currentday)
                    {
                        mydata = arr[i];
                    }
                }
            }
            if(mydata == null)
            {
                $p = $("<h3>今天您还没运动<br/><br/>快开始您的健身之旅吧</h3>");
                $("#dataBox").empty();
                $("#mychart").empty();
                $("#dataBox").append($p);
            }
            else
            {
                var myChart = echarts.init(document.getElementById('mychart'));
                var data=$.parseJSON(mydata).calorie;
                var labelTop = {//上层样式
                    normal : {
                        color :'#42ff0a',
                        label : {
                            show : true,
                            position : 'center',
                            // formatter : function (){return (data/max)*100 + '%'},
                            textStyle: {
                                color:'white',
                                align :'center',
                                baseline : 'top',//垂直对其方式
                                fontSize: '20',
                                fontWeight: 'bold'
                            },
                        },
                        emphasis:{
                            color :'#f8ffff',
                            label : {
                                show : true,
                                position : 'center',
                                // formatter : function (){return data + ' kcal'},
                                textStyle: {
                                    color:'white',
                                    align :'center',
                                    baseline : 'top',//垂直对其方式
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                        }

                    }
                };
                var labelFromatter = {//环内样式
                    normal : {//默认样式
                        formatter : function (){return parseInt(data/max*100) + '%'},
                        textStyle: {//标签文本样式
                            color:'white',
                            align :'center',
                            baseline : 'top',//垂直对其方式
                            fontSize: '20',
                            fontWeight: 'bold'

                        }
                    },
                    emphasis:{
                        formatter : function (){return data + ' kcal'},
                        textStyle: {//标签文本样式
                            color:'white',
                            align :'center',
                            baseline : 'top',//垂直对其方式
                            fontSize: '20',
                            fontWeight: 'bold'

                        }
                    }
                };
                var labelBottom = {//底层样式
                    normal : {
                        color: '#717171',
                        label : {
                            show : true,
                            position : 'center',
                            formatter:'已消耗卡路里'
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };

                var option = {
                    animation:true,
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,
                        hideDelay: 50,
                        transitionDuration:0,
                        borderRadius : 8,
                        borderWidth: 2,
                        padding: 10,
                    },
                    label :labelFromatter,
                    series: [
                        {
                            type:'pie',
                            radius: ['50%', '70%'],

                            data:[
                                {value:data>max?0:max-data, name:'消耗卡路里',itemStyle:labelBottom},
                                {value:data, name:'',itemStyle:labelTop},
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
                initDataByValue(mydata);

            }

        });

    })


})

