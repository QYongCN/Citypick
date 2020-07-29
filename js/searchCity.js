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


    /**
     * 对回车事件进行监听，当输入完文本框后点击回车触发，得到pac或报错
     */
    oTxt.addEventListener('keydown',function (e) {
        var flag = 0;
        var cont = [];
        if (e.keyCode ==13){
            var keyword = oTxt.value;
            $('#tip').addClass('hidden');
            $.each(pacDic,function (k, v) {
                if (k.indexOf(keyword) != -1){
                    if (k.indexOf(keyword)==0){
                        flag += 1;
                        cont.push(v);
                    }
                }
            });
            if (flag==1){
                console.log(cont[0])
            }else {
                var html = '';
                var top = $('#contain').offset().top;
                var left = $('#contain').offset().left;
                $('#tip').css('top',top+35);
                $('#tip').css('left',left+65);
                $('#tip').removeClass('hidden');
                html += '<div class=\'tipinfo\'>' + "<--信息不完整或存在重名地区，请精确填写-->" +'</div>';
                document.getElementById('tip').innerHTML = html;
                setTimeout(function () {
                    $("#tip").addClass('hidden')
                },3000);
            }
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
    //     $('#tip').addClass('hidden');
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
    //         $('#tip').css('top',top+35);
    //         $('#tip').css('left',left+65);
    //         $('#tip').removeClass('hidden');
    //         html += '<div class=\'tipinfo\'>' + "<--信息不完整或存在重名地区，请精确填写-->" +'</div>';
    //         document.getElementById('tip').innerHTML = html;
    //         setTimeout(function () {
    //             $("#tip").addClass('hidden')
    //         },3000);
    //
    //     }
    // });

    /**
     * 在进行中文输入时不进行搜索
     */
    $('#dist').on('compositionstart', function () {
        console.log("不搜索")
    });

    /**
     * 汉字输入完成后进行搜索
     */
    $('#dist').on('compositionend', function (event) {
        var flag = 0;
        console.log('汉字搜索')
        var keyword = oTxt.value;

        var X = document.getElementById('positioncity').getBoundingClientRect().left;
        var Y = document.getElementById('positioncity').getBoundingClientRect().top;
        var H = document.getElementById('positioncity').getBoundingClientRect().height;

        var html = '';
        $.each(pacDic,function (k, v) {
            if (k.search(keyword) != -1){
                flag = 1;
                $('#tip').css('top',Y+H-7);
                $('#tip').css('left',X);
                $('#tip').removeClass('hidden');
                html += '<div id=\''+v+'\' data-id="'+v+'" class=\'tipinfo\'>' + k +'</div>'
            }
        });
        if (flag==0){
            $('#tip').addClass('hidden')
        }
        document.getElementById('tip').innerHTML = html
    });

    /**
     * 实时监听文本框内容
     */
    $("#dist").bind("input propertychange",function(event){
        var X = document.getElementById('positioncity').getBoundingClientRect().left;
        var Y = document.getElementById('positioncity').getBoundingClientRect().top;
        var H = document.getElementById('positioncity').getBoundingClientRect().height;
        var html = '';
        var keyword = $("#dist").val();
        var flag = 0;
        if (keyword==""){
            $('#tip').addClass('hidden');
        }else {
            $.each(pacDic,function (k, v) {
                if (k.search(keyword) != -1){
                    flag = 1;
                    $('#tip').css('top',Y+H-7);
                    $('#tip').css('left',X);
                    $('#tip').removeClass('hidden');
                    html += '<div id=\''+v+'\' data-id="'+v+'" class=\'tipinfo\'>' + k +'</div>'
                }
            });
            document.getElementById('tip').innerHTML = html
            if (flag==0){
                $('#tip').addClass('hidden');
            }
        }

    });

    /**
     * 点击搜索提示框内容后，提示框隐藏，同时传出PAC，文本框显示输入内容
     */
    $('.tip').on("click", '.tipinfo', function () {
        var ob = $(this);
        var id = ob.data('id');
        console.log(id);
        $('.tip').addClass('hidden');
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
        $('.tip').addClass('hidden');
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
