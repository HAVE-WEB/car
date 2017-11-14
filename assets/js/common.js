(function(){
	/**
	 * Created by zhan on 2016/5/26.
	 */
	 //footer
	 /*
	$('.other_page').change(function(){

		var url = $(".other_page option:selected").attr('value');
		if(url =='') return; 
		if($(this).hasClass('confirm')) {
			var $popup = $('.popup.confirm');
			$popup.show();
            $popup.find('a.btn-submit').on('click', function(event) {
                event.preventDefault();
                window.location.href=url; 
            });
            $popup.find('a.btn-close').on('click', function(event) {
                event.preventDefault();
                $popup.hide();
            });
		}else{

			window.location.href = page_href;
			
		}	
	});
	*/
	$('.other_page').change(function(){//只有class是other_page的元素对象，发生change事件的时候，才会执行change括号里的匿名函数
		var page_href = $(".other_page option:selected").attr('value');
		if(page_href!=''){
			window.location.href = page_href;
			//window.location.href = "http://vw.faw-vw.com/events/2015/crc/m/";
		}	
	});

	//导航中搜索框初始值切换
	$('.searchformtext').each(function() {
		var default_value = this.value;
		$(this).focus(function(){
			if(this.value == default_value) {
				this.value = '';
			}
		});
		$(this).blur(function(){
			if(this.value == '') {
				this.value = default_value;
			}
		});
	});

	function resz(){
	    //$(".top_link").css({"width":$(window).width()-96 +"px"});
	    if($(window).width() > 768){
	        //$("#main_nav_more").css({"left": "96px"});
	        $(".fullscreenbox").css({"height":$(window).height()});
	    }else{
	        //$("#main_nav_more").css({"left": "100%"});
	        $(".fullscreenbox").removeAttr("style");
	    }
		if($(window).width() < 640){
			$(".fullscreenbox").css({"height":"240px"});
			$('#main_nav li').show();
		}else{
			if($(window).height() < 680){
				$('#main_nav li:nth-child(6)').hide();
				$('#main_nav_more li:nth-child(5)').show();
			}else{
				$('#main_nav li:nth-child(6)').show();
				$('#main_nav_more li:nth-child(5)').hide();
			}
			if($(window).height() < 580){
				$('#main_nav li:nth-child(5)').hide();
				$('#main_nav_more li:nth-child(4)').show();
			}else{
				$('#main_nav li:nth-child(5)').show();
				$('#main_nav_more li:nth-child(4)').hide();
			}
			if($(window).height() < 480){
				$('#main_nav li:nth-child(4)').hide();
				$('#main_nav_more li:nth-child(3)').show();
			}else{
				$('#main_nav li:nth-child(4)').show();	
				$('#main_nav_more li:nth-child(3)').hide();
			}
			if($(window).height() < 380){
				$('#main_nav li:nth-child(3)').hide();
				$('#main_nav_more li:nth-child(2)').show();
			}else{
				$('#main_nav li:nth-child(3)').show();
				$('#main_nav_more li:nth-child(2)').hide();
			}
			if($(window).height() < 280){
				$('#main_nav li:nth-child(2)').hide();
				$('#main_nav_more li:nth-child(1)').show();
			}else{
				$('#main_nav li:nth-child(2)').show();
				$('#main_nav_more li:nth-child(1)').hide();
			}
		}
	}
	resz();
	$(window).resize(function(){
	    resz();
	});
	
	/* pc 端主导航点击更多 */
	/* pc 端主导航点击更多 */
	var MenuMore = $("#main_nav_more");
	$("#main_nav li").last().click(function(event){
		event.preventDefault();
        MenuMore.css({"left":"96px"});
        if(MenuMore.attr("data-count") == 1){
            MenuMore.stop().animate({"width":"250px"});
            MenuMore.attr({"data-count":0})
            $(".mask").fadeIn();
        }else{
            MenuMore.stop().animate({"width":"0"});
            MenuMore.attr({"data-count":1})
            $(".mask").fadeOut();
        }
	})


	$(".mask").click(function(event){
		event.preventDefault();
	    if(MenuMore.attr("data-count") == 0) {
	        $("#main_nav li").last().click();
	    }
	})

	//if($(window).width() < 640){
	    var menu_flag = true;
	    $(".burger_menu").click(function(){//发生点击事件的时候出发函数
	        if(MenuMore.attr("data-count") == 1 && menu_flag == true) {
	            MenuMore.stop().animate({left: "0"},500,function(){
					menu_flag = false;
					$('.mainbody').hide();
					$('#container').height('700px');
				});
	            MenuMore.attr({"data-count":0});
	            $(this).children("div").eq(1).addClass("hideline");
	            $(this).children("div").eq(0).addClass("rotate");
	            $(this).children("div").eq(2).addClass("re_rotate");
						
				
	        }
			if(MenuMore.attr("data-count") == 0 && menu_flag == false){
	            MenuMore.stop().animate({left: "100%"},500,function(){
					menu_flag = true;
				})
	            MenuMore.attr({"data-count":1})
	            $(this).children("div").eq(1).removeClass("hideline");
	            $(this).children("div").eq(0).removeClass("rotate");
	            $(this).children("div").eq(2).removeClass("re_rotate");
				
				$('.mainbody').show();
				$('#container').removeAttr('style');
	        }
			
	    })

	//}

})();

function formEvent(){
	$('input').each(function(index, el) {
		$(this).blur(function(event) {

			if($(this).parent('.input-box').hasClass('warning') && $(this).val()!='' && $(this).attr('type') != 'tel' && !$(this).hasClass('tel') && !$(this).hasClass('mail')){

				$(this).parent('.input-box').removeClass('warning');
			}else if($(this).attr('type') == 'tel') {
				if(isPhoneNum($(this).val())){
					$(this).parent('.input-box').removeClass('warning');
				}

			}else if($(this).hasClass('tel')){
				if(!checkTel($(this).val()) && $(this).val()!=''){
					$(this).parent('.input-box').find('p.warning').text('*电话格式不正确')
				}else if($(this).val()==''){
					$(this).parent('.input-box').find('p.warning').text('*电话输入为空')
				}else{
					$(this).parent('.input-box').removeClass('warning');
				}

			}else if($(this).hasClass('mail')){
				if(!chkEmail($(this).val()) && $(this).val()!=''){
					$(this).parent('.input-box').find('p.warning').text('*邮箱格式不正确')
				}else if($(this).val()==''){
					$(this).parent('.input-box').find('p.warning').text('*邮箱输入为空')
				}else{
					$(this).parent('.input-box').removeClass('warning');
				}

			}
		});
	});

	$('select').each(function(index, el) {
		$(this).on('change', function(event) {
			event.preventDefault();
			if($(this).val() != ''){
				$(this).parent('.select-box').removeClass('warning');
			}	
		});
		
	});

	$('.input-box').each(function(index, el) {
		$(this).find('input').focus(function(event) {
			$(this).css('color','#000000')
		}).blur(function(event) {
			if($(this).val()==""){
				$(this).css('color','#999999')
			}
		});
	});
}

//校验手机号是否合法
function isPhoneNum(phonenum){
    
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(!myreg.test(phonenum)){ 
       
        return false; 
    }else{
        return true;
    }
};
//电话格式验证
function checkTel(tel){
   var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
   return mobile.test(tel) || phone.test(tel);
}

//邮箱格式验证
function chkEmail(strEmail) {
	if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(strEmail)) {
		return false;
	} else {
		return true;
	}
}

//只允许输入数字限制
function keyPress(ob) {
	if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value;
	else ob.t_value = ob.value;
	if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}

function keyUp(ob) {
	if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value;
	else ob.t_value = ob.value;
	if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}

function onBlur(ob) {
	if (!ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/)) ob.value = ob.o_value;
	else {
		if (ob.value.match(/^\.\d+$/)) ob.value = 0 + ob.value;
		if (ob.value.match(/^\.$/)) ob.value = 0;
		ob.o_value = ob.value
	};
}

//提示浮层公用
(function ($) {
    $.fn.extend({
        "popup": function (options) {//定义的函数，只有调用了函数的时候才会进入匿名函数中去
            var opts = $.extend({}, defaluts, options);  
            $(this).show().find('.content-box').html(opts.content);
			var $content = $(this).find('.popup-content');
            var w = $content.width(),
            	h = $content.height();
            	if($(window).width()<=640){
            		w=0;
            	}
            	$content.css({
	            	'margin-top': -h/2,
	            	'margin-left': -w/2
            	}).find('a.popup-close').on('click', function(event) {
	            	event.preventDefault();
	            	$(this).parents('.popup').hide();
	            });

        }
    });
    //默认参数
    var defaluts = {
        content: ''
    };
})(window.jQuery);

//css3动画
$.fn.extend({
    animateCss: function (animationName, callback) {//定义了函数，只有调用了才会进入匿名函数的内部
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(callback) callback($(this));
            return;
        });
    }
});

/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h+'px', paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();
});


