window.onresize = function(){
    var X = document.getElementById('contain').getBoundingClientRect().left;
    var Y = document.getElementById('contain').getBoundingClientRect().top;
    var H = document.getElementById('contain').getBoundingClientRect().height;
    $('#showcontent').css('top',Y+H-20);
    $('#showcontent').css('left',X-50);
    $('#showcontent').removeClass('hidden');

    $('#tip').css('top',Y+H);
    $('#tip').css('left',X);

}
