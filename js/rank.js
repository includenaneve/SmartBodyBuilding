$(function () {
        $("#main").ready(function () {
            $.ajax({
                type:"post",
                url: "php/rank.php",
                dataType:"text",
                async:false
            }).success(function (msg) {
                var arr = msg.split('\n');
                for(var i=0;i<arr.length;i++)
                {
                    for(var j = 0;j<arr.length;j++)
                    {
                        if($.parseJSON(arr[i]).calorie > $.parseJSON(arr[j]).calorie)
                        {
                            var temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                var num;
                for(var i=0;i<arr.length;i++)
                {
                    var nickname = $.parseJSON(arr[i]).nickName;
                    var calorie = $.parseJSON(arr[i]).calorie;
                    var avaurl = $.parseJSON(arr[i]).avatar;
                    switch (i)
                    {
                        case 0: num = "src/rank1.png";break;
                        case 1: num = "src/rank2.png";break;
                        case 2: num = "src/rank3.png";break;
                        default:num = i+1;break;
                    }
                    if(i < 3)
                    {
                        $table = $("<table></table>");
                        $table.attr("width","100%");
                        $table.css({"box-shadow":"0 0 10px #000000","margin-top":"5px"});
                        $tr1 = $("<tr></tr>");
                        $td1 = $("<td></td>");
                        $td1.attr("rowspan","2");
                        $td1.css({"height":"50px","width":"50px"});
                        $img1 = $("<img>");
                        $img1.attr("src",num);
                        $img1.css({"height":"50px","width":"50px"});
                        $td2 = $("<td></td>");
                        $td2.attr("rowspan","2");
                        $td2.css({"height":"50px","width":"50px"});
                        $img2 = $("<img>");
                        $img2.attr("src",avaurl);
                        $img2.css({"height":"50px","width":"50px"});
                        $td3 = $("<td></td>");
                        $td3.css({"font-size": "15px","border-bottom":"solid 1px #515151"});
                        $td3.html(nickname);
                        $tr2 = $("<tr></tr>");
                        $td4 = $("<td></td>");
                        $td4.css({"font-size": "16px","text-align": "center","color":"#ffcd01"});
                        $td4.html(calorie+"kcal");
                        $td1.append($img1);
                        $td2.append($img2);
                        $tr1.append($td1).append($td2).append($td3);
                        $tr2.append($td4);
                        $table.append($tr1).append($tr2);
                        $("#rankBox").append($table);
                    }
                    else
                    {
                        $table = $("<table></table>");
                        $table.attr("width","100%");
                        $table.css({"box-shadow":"0 0 10px #000000","margin-top":"5px"});
                        $tr1 = $("<tr></tr>");
                        $td1 = $("<td></td>");
                        $td1.attr("rowspan","2");
                        $td1.css({"height":"50px","width":"50px","text-align":"center","font-size":"20px"});
                        $td1.html(num);
                        $td2 = $("<td></td>");
                        $td2.attr("rowspan","2");
                        $td2.css({"height":"50px","width":"50px"});
                        $img2 = $("<img>");
                        $img2.attr("src",avaurl);
                        $img2.css({"height":"50px","width":"50px"});
                        $td3 = $("<td></td>");
                        $td3.css({"font-size": "15px","border-bottom":"solid 1px #515151"});
                        $td3.html(nickname);
                        $tr2 = $("<tr></tr>");
                        $td4 = $("<td></td>");
                        $td4.css({"font-size": "16px","text-align": "center","color":"#ffcd01"});
                        $td4.html(calorie+"kcal");
                        $td2.append($img2);
                        $tr1.append($td1).append($td2).append($td3);
                        $tr2.append($td4);
                        $table.append($tr1).append($tr2);
                        $("#rankBox").append($table);
                    }

                }




            });
        })


    })