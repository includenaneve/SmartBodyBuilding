$(function () {
    $("#main").ready(function () {
        $.ajax({
            type:"get",
            url: "php/profile.php",
            dataType:"text",
            async:false,
            data:{Id:1}
        }).success(function (msg) {
            var arr = msg.split('\n');
            var nickName = $.parseJSON(arr[0]).nickName;
            var avatar = $.parseJSON(arr[0]).avatar;
            var sex = $.parseJSON(arr[0]).sex;
            var height = $.parseJSON(arr[0]).height;
            var age = $.parseJSON(arr[0]).age;
            var weight = $.parseJSON(arr[0]).weight;
            var target = $.parseJSON(arr[0]).targetCalories;

            $("#avatar").attr("src",avatar);
            $div2 = $("<div></div>");
            $div2.css({
                "font-size":"16px",
                "color":"#bfbfbf",
                "height":"20px",
                "margin-left":"6px",
                "display":"inline-block"
            });
            $div2.html("昵称:");
            $div = $("<div></div>");
            $div.css({
                "font-size":"20px",
                "height":"20px",
                "margin-left":"6px",
                "display":"inline-block"
            });
            $div.html(nickName);
            $("#nickName").append($div2);
            $("#nickName").append($div);
            var sexPic;
            if(sex == 0)
            {
                sexPic="src/girl.png";
            }
            else
            {
                sexPic="src/boy.png";
            }
            $("#sexPic").attr("src",sexPic);


            height = height==null?0:height;
            age = age == null?0:age;
            weight = weight == null?0:weight;
            $spanHeight1 = $("<span></span>").html(height);
            $spanHeight2 = $("<span>&nbsp;&nbsp;cm</span>").css({"color":"#8d8d8d","font-size":"16px"});
            $spanAge1 = $("<span></span>").html(age);
            $spanAge2 = $("<span>&nbsp;&nbsp;岁</span>").css({"color":"#8d8d8d","font-size":"16px"});
            $spanWeight1 = $("<span></span>").html(weight);
            $spanWeight2 = $("<span>&nbsp;&nbsp;kg</span>").css({"color":"#8d8d8d","font-size":"16px"});
            $spanTarget1 = $("<span></span>").html(target);
            $spanTarget2 = $("<span>&nbsp;&nbsp;kcal</span>").css({"color":"#8d8d8d","font-size":"16px"});

            $("#height").append($spanHeight1);
            $("#height").append($spanHeight2);
            $("#age").append($spanAge1);
            $("#age").append($spanAge2);
            $("#weight").append($spanWeight1);
            $("#weight").append($spanWeight2);
            $("#target").append($spanTarget1);
            $("#target").append($spanTarget2);

            $("#btn").click(function () {
                $("#height").empty();
                $("#weight").empty();
                $("#age").empty();
                $("#target").empty();
                $("#btn").empty();

                $heightInput = $("<input type='text'>").val(height).css("width","150px");
                $ageInput = $("<input type='text'>").val(age).css("width","150px");
                $weightInput = $("<input type='text'>").val(weight).css("width","150px");
                $targetInput = $("<input type='text'>").val(target).css("width","150px");
                $btn = $("<input type='submit'>").val("保存");
                $btn.attr("id","save");

                $("#height").append($heightInput);
                $("#weight").append($weightInput);
                $("#age").append($ageInput);
                $("#target").append($targetInput);
                $("#btn").append($btn);

                $btn.click(function () {
                    var myheight = $("#height input").val();
                    var myage= $("#age input").val();
                    var myweight = $("#weight input").val();
                    var mytarget = $("#target input").val();
                    console.log(mytarget,myage,myweight,myheight);
                    if(isFinite(myheight)&&isFinite(myage)&&isFinite(myweight)&&isFinite(mytarget))
                    {
                        $.ajax({
                            type:"get",
                            url:"php/profileSave.php",
                            dataType:"text",
                            data:{
                                height:myheight,
                                age:myage,
                                weight:myweight,
                                target:mytarget
                            }
                        }).success(function (msg) {
                            $heightInput.val(null);
                            $ageInput.val(null);
                            $weightInput.val(null);
                            $targetInput.val(null);
                            if(msg == 1)
                            {
                                if(confirm("你确认保存:\n"+"身高: "+myheight+"\n年龄: "+myage+"\n体重："+myweight+"\n目标卡路里："+mytarget))
                                {
                                    alert("保存成功！");
                                    window.location.href = "profile.html";
                                }
                            }
                            else
                            {
                                alert("保存失败");
                            }
                        });
                    }
                    else
                    {
                        alert("输入有误，请输入数字");
                    }
                })




            })

        });


    })



})