
//假数据，正常应该网络获取
var arr = [
    { url: './src/imgs/9.jpg' },
    { url: './src/imgs/2.jpg' },
    { url: './src/imgs/3.jpg' },
    { url: './src/imgs/4.jpg' },
    { url: './src/imgs/5.jpg' },
    { url: './src/imgs/6.jpg' },
    { url: './src/imgs/7.jpg' },
    { url: './src/imgs/8.jpg' },
    { url: './src/imgs/1.jpg' },
    { url: './src/imgs/10.jpg' },
    { url: './src/imgs/11.jpg' },
    { url: './src/imgs/12.jpg' },
    { url: './src/imgs/13.jpg' },
    { url: './src/imgs/14.jpg' },
    { url: './src/imgs/15.jpg' },
    { url: './src/imgs/16.jpg' },
    { url: './src/imgs/17.jpg' },
    { url: './src/imgs/18.jpg' },
    { url: './src/imgs/19.jpg' }
]


//设备宽高比
var deviceW_H  = $(window).width()/$(window).height(),
	activeIndex;

//入口函数
function init() {
    renderPage(arr);
    //设置图片高度
    $('li').css('height', $('li').width());
}
init();

//动态插入图片
function renderPage(arr) {
    var str = '';
    arr.forEach(function(ele, index) {
        str += '<li><img src = "' + ele.url + '"/></li>'
    });
    $('.wrapper').append($(str));
}

//通过事件委托（ul）给li绑定点击事件
$('ul').on('tap', 'li', function() {
	var index = activeIndex = $(this).index();
	loadImg(index);
})

function loadImg(index) {
	$('.show').html('').css('display','block');
	var img = new Image();
	img.src = arr[index].url;
	img.onload = function () {
		var imgW_H = this.width/this.height;
		if(imgW_H < deviceW_H) {//竖图
			$(this).appendTo($('.show')).css('height','100%').animate({opacity:1},300);
		}else{ //横图
			$(this).appendTo($('.show')).css('width','100%').animate({opacity:1},300);
		}
	}
}
//再次点击时 图片消失
$('.show')
	.on('tap',function () {
		$(this).css('display','none');
})
//向左滑
	.on('swipeLeft',function (){
		activeIndex ++;
		if(activeIndex > arr.length - 1) {
			activeIndex  =  arr.length - 1;
		}else{
			loadImg(activeIndex);
		}
		
	})

//向右滑
	.on('swipeRight',function (){
		activeIndex --;
		if(activeIndex < 0) {
			activeIndex = 0;
		}else{
		loadImg(activeIndex);
		}
	})