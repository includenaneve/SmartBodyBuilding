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





        });
    })
})