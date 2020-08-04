;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery', 'pacDic'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'), require('pacDic'));
    } else {
        // Browser globals.
        factory(jQuery, pacDic);
    }
})(function ($, pacDic) {

    'use strict';

    if (typeof pacDic === 'undefined') {
        throw new Error('The file "namepacdic.js" must be included first!');
    }

    /**
     * 获取文本框对象
     * @type {HTMLElement}
     */
    var oTxt = document.getElementById('dist');

    var searchContent = [];
    var num = 0;
    var gundong = document.getElementById('cityChooseTip');

    /**
     * 对回车事件进行监听，当输入完文本框后点击回车触发，得到pac或报错
     */
    oTxt.addEventListener('keydown',function (e) {
        var flag = 0;
        var cont = [];
        // 回车
        if (e.keyCode ==13){
            var keyword = oTxt.value;
            $('#cityChooseTip').addClass('hidden');
            $.each(pacDic,function (k, v) {
                if (k.indexOf(keyword) != -1){
                    if (k.indexOf(keyword)==0){
                        flag += 1;
                        cont.push(v);
                    }
                }
            });
            $('.cityChooseTip').empty();
            if (flag==1){
                console.log(cont[0])
            }else {
                var html = '';
                var X = document.getElementById('contain').getBoundingClientRect().left;
                var Y = document.getElementById('contain').getBoundingClientRect().top;
                var H = document.getElementById('contain').getBoundingClientRect().height;
                $('#cityChooseTip').css('top',Y+H);
                $('#cityChooseTip').css('left',X);
                $('#cityChooseTip').removeClass('hidden');
                html += '<div class=\'tipinfo\'>' + "<--信息不完整或存在重名地区，请精确填写-->" +'</div>';
                document.getElementById('cityChooseTip').innerHTML = html;
                setTimeout(function () {
                    $("#cityChooseTip").addClass('hidden')
                },3000);
            }
        }

        //方向上键
        if (e.keyCode == 38){
            if (e&&e.preventDefault)
            {
                e.preventDefault();
            }
            else
            {
                window.event.returnValue = false;
            }

            num --;
            if (num < 0){
                num = searchContent.length-1;
                document.getElementById(searchContent[num]).style.background= '#00B7FF';
                document.getElementById(searchContent[0]).style.background= '#ffffff';

            }else {
                document.getElementById(searchContent[num]).style.background= '#00B7FF';
                document.getElementById(searchContent[num+1]).style.background= '#ffffff';
                gundong.scrollTop -= 8;
            }
            $.each(pacDic, function (k, v) {
                if (v == searchContent[num]){
                    $('#dist').val(k);
                    return false;
                }
            });


        }

        //方向下键
        if (e.keyCode == 40){
            if (e&&e.preventDefault)
            {
                e.preventDefault();
            }
            else
            {
                window.event.returnValue = false;
            }

            if (num == 0){
                document.getElementById(searchContent[num]).style.background= '#00B7FF';
            }else if (num > searchContent.length-1){
                document.getElementById(searchContent[num-1]).style.background= '#ffffff';
                num = 0;
                document.getElementById(searchContent[num]).style.background= '#00B7FF';

            }else {
                document.getElementById(searchContent[num-1]).style.background= '#ffffff';
                document.getElementById(searchContent[num]).style.background= '#00B7FF';
                gundong.scrollTop += 8;
            }
            $.each(pacDic, function (k, v) {
               if (v == searchContent[num]){
                   $('#dist').val(k);
                   return false;
               }
            });

            num ++;

        }


    });


    /**
     * 获取搜索按钮对象
     * @type {HTMLElement}
     */
    // var searchBtn = document.getElementById('bt');

    /**
     * 监听搜索按钮点击事件，得到pac或报错
     */
    // searchBtn.addEventListener('click',function () {
    //     var flag = 0;
    //     var cont = [];
    //     $('#cityChooseTip').addClass('hidden');
    //     var keyword = oTxt.value;
    //     $.each(pacDic,function (k, v) {
    //         if (k.indexOf(keyword) != -1){
    //             if (k.indexOf(keyword)==0){
    //                 flag += 1;
    //                 cont.push(v);
    //             }
    //         }
    //     });
    //     if (flag==1){
    //         console.log(cont[0])
    //     }else {
    //         var html = '';
    //         var top = $('#contain').offset().top;
    //         var left = $('#contain').offset().left;
    //         $('#cityChooseTip').css('top',top+35);
    //         $('#cityChooseTip').css('left',left+65);
    //         $('#cityChooseTip').removeClass('hidden');
    //         html += '<div class=\'tipinfo\'>' + "<--信息不完整或存在重名地区，请精确填写-->" +'</div>';
    //         document.getElementById('cityChooseTip').innerHTML = html;
    //         setTimeout(function () {
    //             $("#cityChooseTip").addClass('hidden')
    //         },3000);
    //
    //     }
    // });

    // /**
    //  * 在进行中文输入时不进行搜索
    //  */
    // $('#dist').on('compositionstart', function () {
    //     console.log("不搜索")
    // });
    //
    // /**
    //  * 汉字输入完成后进行搜索
    //  */
    // $('#dist').on('compositionend', function (event) {
    //     num = 0;
    //     var flag = 0;
    //     console.log('汉字搜索')
    //     var keyword = oTxt.value;
    //
    //     var X = document.getElementById('contain').getBoundingClientRect().left;
    //     var Y = document.getElementById('contain').getBoundingClientRect().top;
    //     var H = document.getElementById('contain').getBoundingClientRect().height;
    //
    //     var html = '';
    //     $.each(pacDic,function (k, v) {
    //         if (k.search(keyword) != -1){
    //             flag = 1;
    //             $('#cityChooseTip').css('top',Y+H);
    //             $('#cityChooseTip').css('left',X);
    //             $('#cityChooseTip').removeClass('hidden');
    //             html += '<div id=\''+v+'\' data-id="'+v+'" class=\'tipinfo\'>' + k +'</div>';
    //             searchContent.push(v);
    //         }
    //     });
    //     if (flag==0){
    //         $('#cityChooseTip').addClass('hidden')
    //     }
    //     document.getElementById('cityChooseTip').innerHTML = html
    // });

    /**
     * 实时监听文本框内容
     */
    $("#dist").bind("input propertychange",function(event){
        num = 0;
        var X = document.getElementById('contain').getBoundingClientRect().left;
        var Y = document.getElementById('contain').getBoundingClientRect().top;
        var H = document.getElementById('contain').getBoundingClientRect().height;
        var html = '';
        var keyword = $("#dist").val();
        var flag = 0;
        searchContent.splice(0, searchContent.length);
        if (keyword==""){
            $('#cityChooseTip').addClass('hidden');
        }else {
            $.each(pacDic,function (k, v) {
                if (k.search(keyword) != -1){
                    flag = 1;
                    $('#cityChooseTip').css('top',Y+H);
                    $('#cityChooseTip').css('left',X);
                    $('#cityChooseTip').removeClass('hidden');
                    html += '<div id=\''+v+'\' data-id="'+v+'" class=\'tipinfo\'>' + k +'</div>'
                    searchContent.push(v)
                }
            });
            document.getElementById('cityChooseTip').innerHTML = html;
            if (flag==0){
                $('#cityChooseTip').addClass('hidden');
            }
        }

    });

    /**
     * 点击搜索提示框内容后，提示框隐藏，同时传出PAC，文本框显示输入内容
     */
    $('.cityChooseTip').on("click", '.tipinfo', function () {
        var ob = $(this);
        var id = ob.data('id');
        console.log(id);
        $('.cityChooseTip').addClass('hidden');
        // 隐藏信息
        var titleObj = $(".dist-title").find("[data-label=" + "province" + "]");
        titleObj.text(ob.text());
        titleObj.attr("data-code", id);
        titleObj.nextAll('span').text("");
        titleObj.nextAll('span').attr("data-code", "");

        showTitle();
    });


    /**
     * 点击页面任意点，搜索提示框隐藏
     */
    $('body').on("click", ".fullsize", function () {
        $('.cityChooseTip').addClass('hidden');
    });

    /**
     * 回显选区选中内容
     */
    var showTitle = function () {
        // 显示信息
        var showName = '', thisName;
        $(".dist-title").children("span").each(function () {
            thisName = $(this).text();
            if (thisName != '' && thisName != 'undefined') {
                showName += !showName ? thisName : "-" + thisName;
            }
        });
        $('#dist').val(showName);
    };



});
