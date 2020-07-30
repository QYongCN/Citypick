;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery', 'DISTRICTS'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'), require('DISTRICTS'));
    } else {
        // Browser globals.
        factory(jQuery, DISTRICTS);
    }
})(function ($, DISTRICTS) {


    'use strict';

    if (typeof DISTRICTS === 'undefined') {
        throw new Error('The file "dist.js" must be included first!');
    }

    var myDistpicker = function (options) {
        var settings = $.extend(true, {
            stopBy: '#animateModelBox',
            province: "",
            city: "",
            dist: "",
            provinceId: "",
            cityId: "",
            distId: ""
        }, options);
        var _this = this,
            $this = $(_this);
        // 判断绑定元素
        if (!$this.is('input')) {
            throw new Error('The trigger element must be input');
        }

        // 省市区
        var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
        var reg1 = /^[A]$/i,
            reg2 = /^[B]$/i,
            reg3 = /^[C]$/i,
            reg4 = /^[D]$/i,
            reg5 = /^[E]$/i,
            reg6 = /^[F]$/i,
            reg7 = /^[G]$/i,
            reg8 = /^[H]$/i,
            reg9 = /^[I]$/i,
            reg10 = /^[J]$/i,
            reg11 = /^[K]$/i,
            reg12 = /^[L]$/i,
            reg13 = /^[M]$/i,
            reg14 = /^[N]$/i,
            reg15 = /^[O]$/i,
            reg16 = /^[P]$/i,
            reg17 = /^[Q]$/i,
            reg18 = /^[R]$/i,
            reg19 = /^[S]$/i,
            reg20 = /^[T]$/i,
            reg21 = /^[U]$/i,
            reg22 = /^[V]$/i,
            reg23 = /^[W]$/i,
            reg24 = /^[X]$/i,
            reg25 = /^[Y]$/i,
            reg26 = /^[Z]$/i;

        var regSet = {
            'A': reg1,
            'B': reg2,
            'C': reg3,
            'D': reg4,
            'E': reg5,
            'F': reg6,
            'G': reg7,
            'H': reg8,
            'I': reg9,
            'J': reg10,
            'K': reg11,
            'L': reg12,
            'M': reg13,
            'N': reg14,
            'O': reg15,
            'P': reg16,
            'Q': reg17,
            'R': reg18,
            'S': reg19,
            'T': reg20,
            'U': reg21,
            'V': reg22,
            'W': reg23,
            'X': reg24,
            'Y': reg25,
            'Z': reg26
        };

        var result = result || {};
        var match, letter, label;
        var temp, fallName;

        var init = function () {
            // 默认值
            var inputVal = $this.val();
            var inputArr = new Array();
            if (inputVal != '') {
                inputArr = inputVal.split("-");
            }
            settings.province = (!inputArr[0]) ? settings.province : inputArr[0];
            settings.city = (!inputArr[1]) ? settings.city : inputArr[1];
            settings.dist = (!inputArr[2]) ? settings.dist : inputArr[2];

            // 获取默认地址ID
            if (settings.province && !settings.provinceId) {
                $.each(DISTRICTS[100000], function (i, l) {
                    if (l == settings.province) {
                        settings.provinceId = i;
                    }
                })
            }
            if (settings.city && settings.provinceId != '' && !settings.cityId) {
                $.each(DISTRICTS[settings.provinceId], function (i, l) {
                    if (l == settings.city) {
                        settings.cityId = i;
                    }
                })
            }
            if (settings.dist && settings.cityId != '' && !settings.distId) {
                $.each(DISTRICTS[settings.cityId], function (i, l) {
                    if (l == settings.dist) {
                        settings.distId = i;
                    }
                })
            }

            // 给绑定元素添加附加元素
            var extra = '<span class="dist-title" style="display: none;">' +
                '<span data-label="province" data-code="' + settings.provinceId + '">' + settings.province + '</span>' +
                '<span data-label="city" data-code="' + settings.cityId + '">' + settings.city + '</span>' +
                '<span data-label="dist" data-code="' + settings.distId + '">' + settings.dist + '</span>' +
                '</span>';
            $this.after(extra);

            // 初始化选区
            $(settings.stopBy).append(
                '<div class=\'add_content hidden\' id=\'add_content\'>' +
                '<div class=\'add_body col-xs-12\'>' +
                '</div>'+'</div>'
            );

            showTitle();
        };

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
            $this.val(showName);
        };

        // 初始化
        init();

        // 根据拼音分组
        var groupCity = function (id) {
            if (!DISTRICTS[id]) {
                return;
            }

            $.each(DISTRICTS[id], function (i, v) {
                if (!v) {
                    return false;
                }
                if (v == "重庆市"){
                    temp = "chongqingshi";
                }else{
                    temp = $.pinYin.toPinYin(v);
                }

                // DISTRICTS[id][i]
                fallName = v + "|" + temp + "|" + temp.substr(0, 1);

                match = regEx.exec(fallName); //exec
                if (!match[3]) {
                    return false;
                }
                letter = match[3].toUpperCase(); //转换字母为大写


                $.each(regSet, function (la, reg) {
                    if (reg.test(letter)) {
                        label = la;

                        if (!result[id]) {
                            result[id] = {};
                        }
                        if (!result[id][label]) {
                            result[id][label] = {};
                        }
                        if (!result[id][label][i]) {
                            result[id][label][i] = {};
                        }
                        result[id][label][i] = v;

                    }
                })
            });
        };


        // 默认展示省份
        groupCity(100000);
        var X = document.getElementById('contain').getBoundingClientRect().left;
        var Y = document.getElementById('contain').getBoundingClientRect().top;
        var H = document.getElementById('contain').getBoundingClientRect().height;

        // 绑定元素事件，展示地区
        $this.off("click").on("click", function () {
            if (!$('#add_content').hasClass("hidden")) {
                return false;
            }

            showCity();


            $('#showcontent').css('top',Y + H-20);
            $('#showcontent').css('left',X-50);
            $('#showcontent').removeClass('hidden');
            $('#add_content').removeClass('hidden');
            var tipTimer = setTimeout(function () {
                $('#cityChooseTip').addClass('hidden');
            },2000);

            $('body').on('mouseenter', '.cityChooseTip', function () {
                clearTimeout(tipTimer);
            });

            var keyword = $("#dist").val();
            var html = '';
            var flag = 0;
            if(keyword == ""){
                $('#cityChooseTip').removeClass('hidden');
            }else {
                $.each(pacDic,function (k, v) {
                    if (k.search(keyword) != -1){
                        flag = 1;
                        $('#cityChooseTip').removeClass('hidden');
                        html += '<div id=\''+v+'\' data-id="'+v+'" class=\'tipinfo\'>' + k +'</div>'
                    }
                });
                document.getElementById('cityChooseTip').innerHTML = html;
                if (flag==0){
                    $('#cityChooseTip').css('top',Y+H-7);
                    $('#cityChooseTip').css('left',X);
                    $('#cityChooseTip').addClass('hidden');
                }else {
                    $('#cityChooseTip').removeClass('hidden');
                }
            }



            var outtimer = setTimeout(function () {
                $('#showcontent').addClass('hidden');
                $('#add_content').addClass('hidden');
            }, 3000);

            $('body').on('mouseenter', '.showcontent', function () {
               clearTimeout(outtimer);
                $('#cityChooseTip').addClass('hidden');
            });

            clickProvince();
            clickCity();
            clickDist();
        });

        /**
         *字典根据首字母排序
         * @param arys
         */
        function objKeySort(arys) {
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newkey = Object.keys(arys).sort();
            //console.log('newkey='+newkey);
            var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for(var i = 0; i < newkey.length; i++) {
                //遍历newkey数组
                newObj[newkey[i]] = arys[newkey[i]];
                //向新创建的对象中按照排好的顺序依次增加键值对

            }
            return newObj; //返回排好序的新对象
        }


        /**
         * 省市区展示
         *
         * @param id      {int}     父级ID
         * @param label   {string}  标识   province|city|dist
         * @param thisId  {int}     当前城市ID
         */
        var showCity = function (id, label, thisId) {
            var html = '';
            var empty = false;
            id = id || 100000;
            // var cityArr = result[id];
            var cityArr = objKeySort(result[id]);
            label = label || 'province';
            thisId = thisId || settings.provinceId;
            $.each(cityArr, function (letter, val) {
                if (val) {
                    html += '<div class=\'col-xs-12 pad-0\'>' +
                        '<div class=\'col-xs-2 pad-0 add_alphabet\'>' + letter + '</div>';
                        ' <div class=\'col-xs-10 pad-0 add_name\'>';

                    $.each(val, function (i, v) {
                        html += ' <div class=\'col-xs-10 pad-0 add_name\'>';
                        var localcity = DISTRICTS[i];
                        if (i == id) {
                            empty = true;
                            return false;
                        }
                        html += '<div data-id="' + i + '" data-label="' + label + '" class=\'add_value';
                        if (i == thisId) {
                            html += ' \'>' + v + '</div>';
                        } else {
                            html += '\'>' + v + '</div>';
                        }
                        html += '<div class=\'add_city\'>';
                        if (localcity){
                            $.each(localcity, function (key, value) {
                                html += '<div data-id="' + key + '" data-label="city" class=\'city\' >' + value + '</div>';
                            });
                        }
                        html += '</div>';

                    });
                    html += '</div>';
                }
            });
            html = empty ? "" : html;
            $(".add_body").html(html);
            mouseCity();
            wheelContent();
            autoClose();
        };


        /**
         * 点击选择省份
         */
        var clickProvince = function () {
            // 点击
            $(".add_body").off("click").on("click", '.add_value', function () {
                $('#cityChooseTip').addClass('hidden');
                var ob = $(this);
                var id = ob.data('id')
                    label = ob.data("label");
                if (label == 'province') {
                    settings.provinceId = id;
                }
                console.log(id);


                // 隐藏信息
                var titleObj = $(".dist-title").find("[data-label=" + label + "]");
                titleObj.text(ob.text());
                titleObj.attr("data-code", id);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");

                showTitle();

            })
        };

        /**
         * 点击选择地级市
         */
        var clickCity = function () {
            // 点击
            $(".add_city").off("click").on("click", '.city', function () {
                $('#cityChooseTip').addClass('hidden');
                var ob = $(this);
                var id = ob.data('id');
                console.log(id);

                var provinceid = parseInt(id/10000)*10000;

                label = ob.data("label");
                ob.siblings().removeClass('active');
                ob.addClass("active");
                if (label == 'city') {
                    settings.cityId = id;
                }
                // 隐藏信息

                var titleObj = $(".dist-title").find("[data-label=" + "province" + "]");
                titleObj.text(DISTRICTS[100000][provinceid]);
                titleObj.attr("data-code", provinceid);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");

                var titleObj = $(".dist-title").find("[data-label=" + label + "]");
                titleObj.text(ob.text());
                titleObj.attr("data-code", id);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");


                showTitle();

            })
        };

        /**
         * 点击选择区县
         */
        var clickDist = function () {
            // 点击
            $(".rec").off("click").on("click", '.dist', function () {
                $('#cityChooseTip').addClass('hidden');
                var ob = $(this);
                var id = ob.data('id');
                console.log(id);

                var provinceid = parseInt(id/10000)*10000;
                var cityid = parseInt(id/100)*100;

                label = ob.data("label");
                ob.siblings().removeClass('active');
                ob.addClass("active");
                if (label == 'city') {
                    settings.cityId = id;
                }
                // 隐藏信息
                var titleObj = $(".dist-title").find("[data-label=" + "province" + "]");
                titleObj.text(DISTRICTS[100000][provinceid]);
                titleObj.attr("data-code", provinceid);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");

                var titleObj = $(".dist-title").find("[data-label=" + "city" + "]");
                titleObj.text(DISTRICTS[provinceid][cityid]);
                titleObj.attr("data-code", cityid);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");

                var titleObj = $(".dist-title").find("[data-label=" + label + "]");
                titleObj.text(ob.text());
                titleObj.attr("data-code", id);
                titleObj.nextAll('span').text("");
                titleObj.nextAll('span').attr("data-code", "");

                showTitle();

            })
        };


        /**
         * 鼠标滑动事件
         */

        var mouseCity = function () {
            var outTimer;
            var obj = $('.add_city');

            obj.on('mouseenter', '.city', function () {
                var ob = $(this);
                var id = ob.data('id');

                var html = '';
                var distArr = DISTRICTS[id];
                html += '<div class=\'add_dist\'>';
                $.each(distArr, function (k, v) {
                    html += '<div id="' +k+ '" data-id="' + k + '" data-label="dist" class=\'dist\' >' + v + '</div>';
                });
                html += '</div>';
                var divtop = $(this).offset().top;
                var divleft = $(this).offset().left;

                $("#rec").css("top",divtop);
                $("#rec").css("left",divleft+55);
                document.getElementById('rec').innerHTML = html;
                $("#rec").css("display","block");
            });

            obj.on('mouseleave', '.city', function () {
                // var outTimerCity = setTimeout(function () {
                //     $("#rec").css("display","none");
                // }, 2000);
                $('body').on('mouseenter', '.add_dist', function () {
                    // clearTimeout(outTimerCity)
                    $("#rec").css("display","block");
                });


            });
            $('body').on('mouseleave', '.add_dist', function () {
                outTimer = setTimeout(function () {
                    $("#rec").css("display","none");
                }, 100)

                $('.add_city').on('mouseenter', '.city', function () {
                    clearTimeout(outTimer);
                    $("#rec").css("display","block");
                })
            });

            $('.add_content').on('mouseenter', '.add_value', function () {
                $("#rec").css("display","none");
            })


        };

        /**
         * 鼠标滚轮监听
         */
        var wheelContent = function () {
            var wheel = document.getElementById('add_content');
            wheel.addEventListener('mousewheel', function (event) {
                $("#rec").css("display","none");
            });
        };






        /**
         * 选区自动关闭
         */
        var autoClose = function () {
            // var mouseX;
            // var mouseY;
            // var X = document.getElementById('positioncity').getBoundingClientRect().left;
            // var Y = document.getElementById('positioncity').getBoundingClientRect().top;
            // var H = document.getElementById('positioncity').getBoundingClientRect().height;
            // var W = document.getElementById('positioncity').getBoundingClientRect().width;

            // $('body').mousemove(function (event) {
            //     mouseX = event.pageX;
            //     mouseY = event.pageY;
            //     if (mouseX>X && mouseX<X+W && mouseY>Y && mouseY< Y+H){
            //         var Timer = setTimeout(function () {
            //             $('.showcontent').addClass("hidden");
            //             $('.add_content').addClass("hidden");
            //             $('.rec').css("display", "none");
            //         },3000)
            //         $('body').on('mouseenter', '.showcontent', function () {
            //             clearTimeout(Timer);
            //         })
            //     }
            //
            // })

            $('body').on('mouseleave', '.showcontent', function () {
                var timer = setTimeout(function () {
                    $('.showcontent').addClass("hidden");
                    $('.add_content').addClass("hidden");
                    $('.rec').css("display", "none");
                },500)
                $('body').on('mouseenter', '.rec', function () {
                    clearTimeout(timer);
                })
            })

        };



    };

    $.fn.myDistpicker = myDistpicker;
});
