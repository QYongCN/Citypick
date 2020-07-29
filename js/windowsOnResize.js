window.onresize = function(){
    var X = document.getElementById('positioncity').getBoundingClientRect().left;
    var Y = document.getElementById('positioncity').getBoundingClientRect().top;
    var H = document.getElementById('positioncity').getBoundingClientRect().height;
    $('#showcontent').css('top',Y+H-20);
    $('#showcontent').css('left',X-50);
    $('#showcontent').removeClass('hidden');

    $('#tip').css('top',Y+H-7);
    $('#tip').css('left',X);

}