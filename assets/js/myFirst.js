(function (window,$) {
    function Rem() {
        //定义属性
        this.innerWidth = 0;//屏幕宽度
        this.innerHeight = 0;//屏幕高度
        //为属性赋值
        this.innerWidth = window.screen.width;
        this.innerHeight = window.screen.height;
        this.initFontSize();
        this.weiXinBrowers();
        // this.modalDialog();
    }
    Rem.prototype = {
        initFontSize: function () {
                var self = this;
                var num = self.innerWidth;
                if(num <= 375){//iphone6的宽度一下 字体大小为14px
                    $("html").css("font-size","14px");//百分比对象的字体大小为14px，0.875em
                }else if(num <= 414){//宽度在iphone6-iphone6s之间
                    $("html").css("font-size","16px");//16px
                }else if(num <= 768){
                    $("html").css("font-size","24px");
                } else {
                    $("html").css("font-size","30px");
                }
                $("body").css("font-size","1rem");
                $("input").css("font-size","1rem");
                $("input:checkbox").parent().each(function () {
                    $(this).css("font-size","1rem")
                });
                $("input:checkbox").each(function () {
                    $(this).css({
                        width: "1rem",
                        height: "1rem",

                    }).css("margin-right","6px");
                });
                $("input:radio").each(function () {
                    $(this).css({
                        width: "1rem",
                        height: "1.5rem",
                    });
                });
                $(":submit").css("font-size","1rem");
                $(":button").css("font-size","1rem");
            },
        titleCenter: function () {
            // var self = this;
            var wWindow = screen.width;//屏幕宽度
            var $i = $(".top-div").find('img');//i图标对象
            var $div = $('.top-div .title');//标题对象
            var leftI = $i.offset().left;
            var wI = $i.outerWidth();
            var wDiv = $div.outerWidth();
            var marginLeft = wWindow/2-leftI-wI-wDiv/2;
            $div.css('margin-left',marginLeft);
        },
        weiXinBrowers: function () {//对于微信内置浏览器，得剪掉上面导航栏的高度
            var flag = false
            var pf = navigator.platform;
            if((pf === 'Win32') == false){
                flag = true;
            }
            if(flag){
                $("div.sl-navbar").css({
                    position: 'fixed',
                    left: 0,
                    bottom: 42,
                    right: 0,
                    zIndex: 1010,
                })
            }else{
                $("div.sl-navbar").css({
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 1010,
                })
            }

        },
        alertInfoByState: function (msg,state) {//state:0代表成功，1代表失败
            if(typeof state !== 'number'){
                return;
            }
            var $alert;
            if(state === 0 ){
                $alert = $('<div class="my-alert" style="display: block;background-color: green;position:fixed;z-index: 10011;color: white;padding: 0.5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"></div>');
            }else if(state === 1){
                $alert = $('<div class="my-alert" style="display: block;background-color: red;position:fixed;z-index: 10011;color: white;padding: 0.5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"></div>');
            }

            var len = $('div.my-alert').length;
            if(len){
                $('div.my-alert').remove();
                $('body').append($alert);
                $('div.my-alert').html(msg).show().css({
                    left: screen.width/2-$('div.my-alert').outerWidth()/2,
                    top: screen.height/2-$('div.my-alert').outerHeight()/2,
                });
            }else{
                $('body').append($alert);
                $alert.html(msg).show().css({
                    left: screen.width/2-$('div.my-alert').outerWidth()/2,
                    top: screen.height/2-$('div.my-alert').outerHeight()/2,
                });
            }
            setTimeout(function () {
                $('div.my-alert').hide();
            },2000);
        },
        alertInfoImgByState: function (msg,state) {//state:0代表成功，1代表失败
            if(typeof state !== 'number'){
                return;
            }
            var $alert;
            if(state === 0 ){
                $alert = $('<div class="sl-alert sl-flex-column-center-center" style="background-color: #333333;position:fixed;z-index: 10011;color: white;padding: 0.5rem 1rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"><div><img src="../assets/images/成功.png" alt="" style="width: 2rem;height: 2rem;"></div><div><span style="color: white;"></span></div></div>');
            }else if(state === 1){
                $alert = $('<div class="sl-alert sl-flex-column-center-center" style="background-color: #333333;position:fixed;z-index: 10011;color: white;padding: 0.5rem 1rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"><div><img src="../assets/images/失败.png" alt="" style="width: 2rem;height: 2rem;"></div><div><span style="color: white;"></span></div></div>');
            }

            var len = $('div.sl-alert').length;
            if(len){
                $('div.sl-alert').remove();
                $('body').append($alert);
                $('div.sl-alert').find('span').html(msg);
                $('div.sl-alert').show().css({
                    position: 'fixed',
                    zIndex: 10020,
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }else{
                $('body').append($alert);
                $('div.sl-alert').find('span').html(msg);
                $('div.sl-alert').show().css({
                    position: 'fixed',
                    zIndex: 10020,
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }
            setTimeout(function () {
                $('div.sl-alert').hide();
            },2000);
        },
        alertInfoByIcon: function (msg,iconClass) {//state:0代表成功，1代表失败

            if(iconClass == ''){
                iconClass = 'am-icon-spinner am-icon-pulse';
            }
            var $alert;
            $alert = $('<div class="sl-alert sl-flex-column-center-center" style="display: block;background-color: black;position:fixed;z-index: 10011;color: white;padding: 0.5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"><i class="'+iconClass+'"></i><span></span></div>');


            var len = $('div.sl-alert').length;
            if(len){
                $('div.sl-alert').remove();
                $('body').append($alert);
                $('div.sl-alert').find('span').html(msg);
                $('div.sl-alert').show().css({
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }else{
                $('body').append($alert);
                $('div.sl-alert').find('span').html(msg);
                $('div.sl-alert').show().css({
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }
            setTimeout(function () {
                $('div.sl-alert').hide();
            },2000);
        },
        alertInfo: function (msg) {
            var $alert = $('<div class="sl-alert" style="display: block;background-color: black;position:fixed;z-index: 10011;color: white;padding: 0.5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;border-radius: .5rem;"></div>');
            var len = $('div.sl-alert').length;
            if(len){
                $('div.sl-alert').html(msg).show().css({
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }else{
                $('body').append($alert);
                $alert.html(msg).show().css({
                    left: screen.width/2-$('div.sl-alert').outerWidth()/2,
                    top: screen.height/2-$('div.sl-alert').outerHeight()/2,
                });
            }
            setTimeout(function () {
                $('div.sl-alert').hide();
            },2000);
        },
        inputVal: function ($input) {
                var val = parseInt($.trim($input.val()));
                if(isNaN(val)){
                    this.alertInfoByState('输入的不是数字',1);
                    $input.val(1);
                    return false;
                }
                if(val <= 0){
                    this.alertInfoByState('兑换数量不能小于0',1);
                    $input.val(1);
                    return false
                }
                return true
        },
        // modalDialog: function () {
        //     var height = screen.height;
        //     var dialogH = $("div.am-modal-dialog").outerHeight();
        //     var center = (height+42)/2-dialogH/2;
        //     $("div.am-modal-dialog").css('top',center);
        // },
    };
    if(typeof module !="undefined" && module.exports){
        module.exports = Rem;
    }else {
        window.Rem = Rem;
    }
}(window, jQuery));

