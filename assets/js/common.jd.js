//手机端导航
function showList() {
    console.log("showList");
    $('.mobile_nav_list').animate(
        {left:0},
        500,
        function () {
            $('.mobile_nav .btn .btn_icon').one('click',hiddenList);
        }
    )
    $('.mobile_nav .btn .btn_icon').attr('src','../../assets/i/car/mobile/close.png')
}
function hiddenList() {
    $('.mobile_nav_list').animate(
        {left:100+"%"},
        500,
        function () {
            $('.mobile_nav .btn .btn_icon').one('click',showList);
        }
    )
    $('.mobile_nav .btn .btn_icon').attr('src','../../assets/i/car/mobile/list.png')
}
$('.mobile_nav .btn .btn_icon').one('click',showList);
//手机端点击快速入口
var fixedTop = 0;
var pl = $('.entrance').css('padding-left');
var content_pl = 0;
if(content_pl) content_pl = parseFloat(content_pl.substr(0,content_pl.length-2));
// console.log("pl:"+pl+",content_pl:"+content_pl);
function showEnter() {
    $('.entrance .item').find('a').css('padding-left',pl);
    $('.entrance .item').show();
    $('.entrance .icon').attr('src','../../assets/i/car/mobile/top.png');
    $('.entrance').one('click',hideEnter);
}
function hideEnter() {
    $('.entrance .item').hide();
    $('.entrance .icon').attr('src','../../assets/i/car/mobile/bottom.png');
    $('.entrance').one('click',showEnter);
}
$('.entrance').one('click',showEnter);
//返回顶部
$('.back_top .b_lk').click(function () {
    $(window).scrollTop(0);
});
//文字图片居中对齐
var hundred = false;
var w_width = 0;
function verticalAlign() {
    // console.log("verticalAlign");
    if($('.content_box .c_item .c_row .c_left')){
        if(!hundred){
            $('.content_box .c_item .c_row .c_left').each(function (i) {
                var $left = $(this);
                $('.content_box .c_item .c_row .c_right').each(function (j) {
                    if(i == j){
                        // console.log("j:"+j+",i:"+i);
                        var l_h = $left.outerHeight();
                        var r_h = $(this).find('.c_txt').height();
                        // console.log('l_h:'+l_h+',r_h:'+r_h);
                        // if($(window).width() < 767){
                        //     $(this).css({
                        //         'padding-top': 0
                        //     })
                        // }else{
                        if(r_h < l_h){
                            $left.outerWidth("50%");
                            $(this).outerWidth("50%");
                            $(this).css({
                                'padding-top': (l_h - r_h) / 2
                            })

                        }else if(r_h == l_h && r_h == 0){

                        } else{
                            w_width = $(window).width();
                            hundred = true;
                        }
                        // return false
                    }
                });
                if(hundred){
                    return false;
                }
            });
        }
        if(hundred){
            vertical_hundred();
        }
    }
    // console.log("W:"+w_width+",hundred:"+hundred);
}
function vertical_hundred() {
    if($('.content_box .c_item .c_row .c_left')) {
        $('.content_box .c_item .c_row .c_left').each(function (i) {
            var $left = $(this)
            $('.content_box .c_item .c_row .c_right').each(function (j) {
                if (i == j) {
                    $left.outerWidth("100%");
                    $(this).outerWidth("100%");
                    $(this).css({
                        'padding-top': '1%',
                        'padding-left':0
                    });

                    return false
                }
            })
        });
    }
}
function vertical_fifty() {
    if($('.content_box .c_item .c_row .c_left')) {
        $('.content_box .c_item .c_row .c_left').each(function (i) {
            var $left = $(this)
            $('.content_box .c_item .c_row .c_right').each(function (j) {
                if (i == j) {
                    // console.log("j_fifty:"+j);
                    $left.outerWidth("50%");
                    $(this).outerWidth("50%");
                    $(this).css({
                        'padding-left':'2%'
                    });
                    return false
                }
            })
        });
        // verticalAlign();
    }
}
//自动定位
function autoFixed() {
    var t = window.pageYOffset;
    if($(window).width() < 767){//手机端
        if(t + 50 >= fixedTop){
            $('.head_sub').addClass('h_fixed');
            $('.head_sub').css({
                'padding-left':content_pl
            });
            $('.space').show();
        }else{
            $('.head_sub').removeClass('h_fixed');
            $('.head_sub').css({
                'padding-left':0
            });
            $('.space').hide();
        }

        // console.log("mobile_fixedTop:"+fixedTop+",t:"+(t+50))
    }else{//pc端或者平板电脑
        if(t >= fixedTop){
            $('.space').show();
            var h = $('.head_sub').outerHeight();
            $('.head_sub').addClass('h_fixed');
            $('.head_sub').css({
                'padding-left':content_pl
            });
        }else{
            $('.head_sub').removeClass('h_fixed');
            $('.head_sub').css({
                'padding-left':0
            });
            $('.space').hide();
        }
    }

}
//点击子头，切换tab和颜色
if(('.head_sub .h_lk')){
    $('.head_sub .h_lk').click(function () {
        var self = $(this)[0];
        var index = 0;
        $('.head_sub .h_lk').each(function (i) {
            if(self == $(this)[0]){
                index =i;
                $(this).css('color','#fff')
            }else{
                $(this).css('color','#2f3538');
            }
        });
        if($(this).hasClass('h_return')){
            return;
        };
        $('.content_box .c_item').each(function (j) {
            if(index == j){
                $(this).addClass('c_active');
            }else{
                $(this).removeClass('c_active');
            }
        })
        verticalAlign();
    });
}
if($('.content_box .c_item .c_title .c_list .c_lk')){
    $('.content_box .c_item .c_title .c_list .c_lk').click(function () {

        console.log("inner"+$('.content_box .c_item .c_title .c_list .c_lk').length);
        var self = $(this)[0];
        var index = 0;
        $('.content_box .c_item:visible .c_title .c_list .c_lk').each(function (i) {
            if(self == $(this)[0]){
                index = i;
                $(this).addClass('c_active');
            }else{
                $(this).removeClass('c_active');
            }
        });
        $('.content_box .c_item:visible .c_month').each(function (j) {
            if(index == j){
                $(this).addClass('c_show')
            }else{
                $(this).removeClass('c_show');
            }
        });
        // verticalAlign()
    });
}


var t_img; // 定时器
var isLoad = true; // 控制变量
// 判断图片加载的函数
function isImgLoad(callback){
    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $('.a_img').each(function(){
        // 找到为0就将isLoad设为false，并退出each
        if(this.height === 0){
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if(isLoad){
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
        // 为false，因为找到了没有加载完成的图，将调用定时器递归
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback); // 递归扫描
        },100); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
};
function head_sub_change() {
    if($('.head_sub')){
        // var p = $('.head_sub').css('position');
        // if(p == 'fixed'){
        //     $('.head_sub .h_lk').css({
        //         'margin-left': '8%',
        //         'padding': '3% 0'
        //     })
        // }
        var h = $('.head_sub').height();
        if($('.space').length > 0){
            $('.space').height(h);
        }else{
            $('.head_sub').before('<div class="space" style="display: none;height: '+h+'px;"></div>');
        }
    }
    if($('#content')){
        content_pl = $('#content').css('margin-left');
    }
}
$(window).scroll(function () {
    autoFixed();
    if($('.head_sub')){
        if(!imgLoad){
            isImgLoad(function(){
                fixedTop = $('.head_sub').offset().top;//隐藏元素不进行任何计算
                imgLoad = true;
            });
        }
    }
});
head_sub_change();
var imgLoad = false;
isImgLoad(function(){
    if($('.head_sub')){
        fixedTop = $('.head_sub').offset().top;//隐藏元素不进行任何计算
        imgLoad = true;
    }

});
verticalAlign();
$(window).resize(function () {
    head_sub_change();
    isImgLoad(function(){

        if($('.head_sub').hasClass('h_fixed')){
            fixedTop = $('.space').offset().top;
        }else{
            fixedTop = $('.head_sub').offset().top;
        }
        // console.log("aa222:"+fixedTop+",advertise"+$('.advertise').offset().top);
    });
    console.log('hundred:'+hundred+",w:"+w_width+",window:"+$(window).width());
    if($(window).width() >= w_width){
        hundred =false;
        vertical_fifty();
        verticalAlign();
    }else{
        hundred =true;
        vertical_hundred();
    }
    autoFixed();
});