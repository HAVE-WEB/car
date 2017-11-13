/**
 * 
 监测代码部署文件20170817
 */

//ga
$(function(){
	//全站访客代码
	$("body").append("<script>+function(d,e){var r=d.referrer,u=location.href;var s=d.createElement('img');s.src='http://dmpMStest.faw-vw.com/adv.gif?r='+e(r)+'&u='+e(u);}(document,encodeURIComponent);</script>");

	//全站基础代码ga
	/*$("head").prepend("<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M2H3RQD');</script>");*/
	$("body").prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2H3RQD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>');



	//众里寻车页面优惠活动板块按钮
	$(".zlxchuibtn00").children().eq(2).click(function(){
		var txt=$(this).find("div[class='title']").children().text();
		 ga('send', 'event', 'C03_众里寻车页面', 'C03A02优惠活动', 'C03A02L01_'+txt);
	});
	$(".zlxchuibtn00").children().eq(3).click(function(){
		var txt=$(this).find("div[class='title']").children().text();
		 ga('send', 'event', 'C03_众里寻车页面', 'C03A02优惠活动', 'C03A02L02_'+txt);
	});
	$(".zlxchuibtn00").children().eq(4).click(function(){
		var txt=$(this).find("div[class='title']").children().text();
		 ga('send', 'event', 'C03_众里寻车页面', 'C03A02优惠活动', 'C03A02L03_'+txt);
	});
	
});

//众里寻车页面顶部导航按钮
function zlxctopnav01(){
	ga('send', 'event', 'C03_众里寻车页面', 'C03A01顶部导航', 'C03A01L01_优惠活动');
}
function zlxctopnav02(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A01顶部导航', 'C03A01L02_城市站');
}
function zlxctopnav03(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A01顶部导航', 'C03A01L03_购车工具');
}
function zlxctopnav04(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A01顶部导航', 'C03A01L04_留学生购车');
}
function zlxctopnav05(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A01顶部导航', 'C03A01L05_前往电商平台');
}

//众里寻车页面城市站板块立即进入按钮
function zlxccitybtn(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A03城市站', 'C03A03L01_立即进入');
}

//众里寻车页面购车工具板块按钮
function zlxcgcgjbtn01(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A04购车工具', 'C03A04L01_预约试驾');
}
function zlxcgcgjbtn02(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A04购车工具', 'C03A04L02_查找经销商');
}
function zlxcgcgjbtn03(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A04购车工具', 'C03A04L03_车型对比');
}
function zlxcgcgjbtn04(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A04购车工具', 'C03A04L04_车型筛选');
}
function zlxcgcgjbtn05(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A04购车工具', 'C03A04L05_金融贷款计算器');
}

//众里寻车页面前往电商平台板块按钮
function zlxconlinebtn01(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A05前往电商平台', 'C03A05L01_易车旗舰店');
}
function zlxconlinebtn02(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A05前往电商平台', 'C03A05L02_天猫旗舰店');
}
function zlxconlinebtn03(){
	 ga('send', 'event', 'C03_众里寻车页面', 'C03A05前往电商平台', 'C03A05L03_腾讯商城旗舰店');
}



//点击预约试驾页面预约试驾提交按钮
function yysjybtn00(){
	ga('send', 'event', 'C04_预约试驾页面', 'C04A01提交按钮', 'C04A01L01_提交按钮');
}

//金融贷款计算器页面计算结果显示时触发 finance.js-426
function financeresult00(){
	ga('send', 'pageview', '/vp/calculate-finished', {'dimension3': $('#car-model option:checked').text()+ '_'  + $('#car-style option:checked').text()+ '_'  +  $('#finance-institution option:checked').text()+ '_'  +$('#finance-products option:checked').text()});	
}

//点击预约试驾页面预约试驾提交按钮成功后触发 testdrive.js-361
function yysjsubmit00(){
	ga('send', 'pageview', '/vp/testdrive-finished', {'dimension1': $("#name").val()+ '_'  + '/'+ '_'  +  $("#phone").val().substr(3,8) + '_'  +'/'+ '_'  + $("#province option:checked").text() + '_' + $("#city option:checked").text() + '_' + $("#dealer option:checked").text()+ '_'  +$("#car-model option:checked").text() + '_'  +'/'+ '_'  +$("#time option:checked").text()});
}

//点击预约试驾页面预约试驾提交按钮失败后触发
function yysjsubmitfail00(){
	var errormsg=[];
	// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请选择车款'+ '请选择经销商' + '请填写姓名' + '请填写手机号' + '请选择预计购车时间' });
	if($("#car-model").val()==""){
		// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请选择经销商'});
		errormsg.push("请选择车款");
		
	}
	if($("#dealer").val()==""){
		// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请选择经销商'});
		errormsg.push("请选择经销商");
		
	}
	if($("#name").val()==""){
		// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请填写姓名'});
		errormsg.push("请填写姓名");
		
	}
	if($("#phone").val()==""){
		// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请填写手机号'});
		errormsg.push("请填写手机号");
		
	}
	// if($("#time").val()==""){
	// 	// ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': '请选择预计购车时间'});
	// 	errormsg.push("请选择预计购车时间");
		
	// }
	var errormsgcon=errormsg.join("_");
	// console.log(errormsg.join("_"))
	ga('send', 'pageview', '/vp/testdrive-failed', {'dimension2': errormsgcon});
}	


