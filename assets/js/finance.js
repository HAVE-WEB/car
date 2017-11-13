var str =$("#brandlist_json").val();
// console.log("str:"+str);
var json = eval('(' +str+  ')');
// console.log("json:"+json);
var arry =json.list;
// console.log("arry:"+arry);
var brandArray=new Array();
var brandIdArray=new Array();
var first=true;
for(var i=0;i<arry.length;i++){
	if(!contains(brandArray,arry[i].vb_brandName)){
		brandArray.push(arry[i].vb_brandName);
		brandIdArray.push(arry[i].vb_brandId);
	}
}
//数字千分位转化方法
function format (num) {
    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}
(function(){
	
	//贷款方案id
	var loanSchemeId;
	var vwBid = $("#bid").val();
	//不可点击的按钮
	var noChangearr = [];
	var tNoChangearr=[];
	//payline首个可点
	var nn ;
	//timeline首个可点
	var tn;
	//初始化加载车型下拉框
	//brandInit();
	
	if(vwBid != 0){
		//modelInit(vwBid)
	}else{
		//重置车款
		$("#car-style").html('<option value="">车款</option>').trigger('chosen:updated');
	}
	
	//初始加载金融机构加载
	function finaInst(){
		var bid = $("#car-model").find('option:checked').val();
		var mid = $("#car-style").find('option:checked').val();
		$.ajax({
			type: "GET",
			url: 'finaInst.json',
			async:true,
			data: {"cid":"123123","bid":bid,"mid":mid},
			dataType: "json",
			success: function(data){
				$("#finance-institution").empty();
				var isobj = typeof(data) == "object" ;
				// 非对象
				if(!isobj) {
					data = $.parseJSON(data);
				}
				var opts="";
				data = [
					{
						cd_cid:'132131',
						cd_cnname:'招商银行'
					},
                    {
                        cd_cid:'132132',
                        cd_cnname:'中国银行'
                    },
                    {
                        cd_cid:'132133',
                        cd_cnname:'建设银行'
                    }
				]
				if(data.length == 0){
					opts += '<option value="">选择金融机构</option>'
				}else{
					opts += '<option value="">选择金融机构</option>'
					$.each(data,function(){
						opts += '<option value="'+this.cd_cid +'">'+this.cd_cnname +'</option>'
					});
				}
				$("#finance-institution").append(opts);
				$("#finance-institution").trigger('chosen:updated');
			}
		});
	}
	//通过金融机构id查询加载金融产品
	function finaProducts(pid){
		var bid = $("#car-model").find('option:checked').val();
		var mid = $("#car-style").find('option:checked').val();
		$.ajax({
			type: "GET",
			url: 'finaProducts.json',
			async:true,
			data: {"pid":pid,"bid":bid,"mid":mid},
			dataType: "json",
			success: function(data){
				$("#finance-products").empty();
				var isobj = typeof(data) == "object" ;
				// 非对象
				if(!isobj) {
					data = $.parseJSON(data);
				}
				var opts="";
				if(data == null || data.length == 0){
					opts += '<option value="">选择金融产品</option>'
				}else{
					opts += '<option value="">选择金融产品</option>'
					$.each(data,function(){
						opts += '<option value="'+this.cd_cid +'">'+this.cd_cnname +'</option>'
					});
				}
				$("#finance-products").append(opts);
				$("#finance-products").trigger('chosen:updated');
			}
		});
	}
	$('#finance-institution').on('change', function() {
		//event.preventDefault();
		var pid = $(this).find('option:checked').val();
		
		if(pid=='132135'||pid=='132134'||pid=='132131'){
			$("#btn-apply").text("资质预审");
		}else{
			$("#btn-apply").text("申请贷款");
		}
		finaProducts(pid);
	    contentResult();
	});
	$('#car-model').on('change', function(event) {
		console.log("change");
		event.preventDefault();
		var bid = $(this).find('option:checked').val();
		var carStyleBefore =  $("#car-style").find('option:checked').val();
		if(bid ==''){
			$("#car-style").empty();
			$("#car-style").append("<option value=''>请选择车款</option>");
		}else{
			$("#car-style").empty();
			$("#car-style").append("<option value=''>请选择车款</option>");
			for(var i=0;i<arry.length;i++){
				if(bid==arry[i].vb_brandId){
					
					$("#car-style").append("<option value='"+arry[i].vm_modelId+"'>"+arry[i].vm_modelName+"</option>"); 
				}
			}
		}
	    
	    var carStyleAfert =  $("#car-style").find('option:checked').val();
	    //如果修改之前不为空 修改之后值为空则 清空金融产品
		if(carStyleBefore != '' && carStyleAfert == ''){
			//清空车型图片报价
			$('#price').val("");
			$("#inter").hide();
			$("#lastMonthy").hide();
			$("#titlePrice").show();
			$('#price').attr("placeholder",price).removeAttr('disabled');
			$('#price').val('');
			$('#price').val(price).focus().attr('disabled','disabled');

    		var html='<div class="car-pic"><img src="../faw/images/finance/car-bg.png" alt=""><p>请选择一款车型进行计算</p></div>';
    		$('#finance .car-model').html(html)
    		/*//重置车款
			$("#car-style").html('<option value="">车款</option>').trigger('chosen:updated');*/
			//重置金融机构
			$("#finance-institution").html('<option value="">选择金融机构</option>').trigger('chosen:updated');
			//清空金融产品
			$("#finance-products").html('<option value="">选择金融产品</option>').trigger('chosen:updated');
			//首付比例与期数按钮样式重置
			for (var i = 0; i < noChangearr.length; i++) {
				$payLine.prev('.irs-with-grid').find('.js-grid-text-'+noChangearr[i]).removeClass('noChange');
				$payLine.prev('.irs-with-grid').find('.js-grid-text-'+noChangearr[i]).find("span").remove();
	    	}
			noChangearr = [];
    		var slider1 = $payLine.data("ionRangeSlider");
    		slider1.update({
                from: 0
            });
			for (var i = 0; i < tNoChangearr.length; i++) {
				$timeLine.prev('.irs-with-grid').find('.js-grid-text-'+tNoChangearr[i]).removeClass('noChange');
				$timeLine.prev('.irs-with-grid').find('.js-grid-text-'+tNoChangearr[i]).find("span").remove();
	    	}
			tNoChangearr = [];
    		var slider2 = $timeLine.data("ionRangeSlider");
    		slider2.update({
                from: 0
            });
			//清空计算结果
			var result =['','','','',''];
			$('.content-result').find('.line').each(function(index, el) {
				$(this).find('span.showValue').text(result[index]);
			}).parents('.content-result').find('a').addClass('noClick')
		}
	    /*$('#car-style').html(data);*/
	    $("#car-style").trigger('chosen:updated');
	});
	
	$('#car-style').bind('change', function(event) {
		event.preventDefault();
		
		var val = $(this).find('option:checked').val();
		//通过车型id查询全部车款

		
		if(val == ''){
			var html='<div class="car-pic"><img src="../faw/images/finance/car-bg.png" alt=""><p>请选择一款车型进行计算</p></div>';
    		$('#finance .car-model').html(html)
			$("#finance-institution").empty();
			$("#finance-institution").append('<option value="">选择金融机构</option>');
			$("#finance-institution").trigger('chosen:updated');
		}else{
			var price,name,img;
		
			for(var i=0;i<arry.length;i++){
				if(val==arry[i].vm_modelId){
					price = arry[i].vm_modelPrice;
					name = arry[i].vm_modelName;
	 				img = arry[i].vb_brandImg;
					break;
				}
			}
				var pric = format(price);
				$('#price').val(pric);
				brand = $('#car-model option:checked').text() ;
 		var html='<div class="car-pic"><img src="'+img+'" alt="" style="max-height:72px" ></div><div class="car-name">'+brand+name+'<p>官方指导价：￥'+pric+'</p></div>';
 		$('#finance .car-model').html(html);
			
			//加载金融机构下拉框
			finaInst();
		}
		//清空金融产品
		$("#finance-products").empty();
		$("#finance-products").append('<option value="">选择金融产品</option>');
		$("#finance-products").trigger('chosen:updated');
		
		contentResult();
	});
	
	$('#price').on('change', function() {
		contentResult();
	});
	
	$('#finance-products').bind('change', function(event) {
		
		var modelId = $('#car-style').val();
		var productId = $('#finance-products').val();
		var countL=0;
		
		//查询对应金融产品的贷款方案 控制首付比例按钮能否点击
		if(productId != ""){
			noChangearr = [];
			nn = '';
			$.ajax({
	            type: "GET",
	            url: 'payLine.json',
	            async:false,
	            data: {"mid":modelId,"productId":productId},
	            dataType: "json",
	            success: function(data){
	            	var isobj = typeof(data) == "object" ;
	        		// 非对象
	        		if(!isobj) {
	        			data = $.parseJSON(data);
	        		}
	        		//比较查询出的首付比例是否存在
	        		var paylineArr =[20,30,40,50,60,70,80];
	        		var dataArr = [];
	        		var pN ;
	        		for(var x = 0 ; x <data.length; x++){
	        			dataArr.push(data[x].vls_downPaymentRatio);
	        		}
	        		for(var i = 0; i < paylineArr.length; i++){
	        		    var pla = paylineArr[i];
	        		    var isExist = false;
	        		    for(var j = 0; j < dataArr.length; j++){
	        		        var da = dataArr[j];
	        		        if(pla == da){
	        		            isExist = true;
	        		            ++countL;
	            		    	if(countL == 1){
	            		    		pN=i;
	            		    	}
	        		            break;
	        		        }
	        		    }
	        		    if(!isExist){
	        		    	noChangearr.push(i);
	        		    }
	        		}
	        		sliderEvent($payLine,noChangearr)
	        		nn = Number(pN);
	        		var slider1 = $payLine.data("ionRangeSlider");
		    		slider1.update({
		                from: nn
		            });
	           }
	        });
			timelineChange()
		}
		var _this = $timeLine.prev('.irs-with-grid').find('.js-grid-text-0');
		_this.trigger('click');
		contentResult();
	});

	//更新期限是否可点
	function timelineChange(){
		var modelId = $('#car-style').val();
		var productId = $('#finance-products').val();
		//首付比例
		var downPaymentRatio =Number($("#payline").val());
		var countT=0;
		tNoChangearr = [];
		tn = '';
		//查询对应金融产品h和首付比例的贷款方案 控制期限按钮能否点击
		$.ajax({
			type: "GET",
			url: 'timeLine.json',
			async:true,
			data: {"mid":modelId,"productId":productId,"downPaymentRatio":downPaymentRatio},
			dataType: "json",
			success: function(data){
				var isobj = typeof(data) == "object" ;
				// 非对象
				if(!isobj) {
					data = $.parseJSON(data);
				}
				//比较查询出的贷款期数是否存在
				var tdataArr =[12,18,24,36,48,60];
				var timeArr = [];
        		var tN ;
        		for(var a = 0 ; a <data.length; a++){
        			timeArr.push(data[a].vls_loanTerm);
        		}
        		for(var b = 0; b < tdataArr.length; b++){
        		    var tla = tdataArr[b];
        		    var isExist = false;
        		    for(var c = 0; c < timeArr.length; c++){
        		        var tda = timeArr[c];
        		        if(tla == tda){
        		            isExist = true;
        		            ++countT;
            		    	if(countT == 1){
            		    		tN=b;
            		    	}
        		            break;
        		        }
        		    }
        		    if(!isExist){
        		    	tNoChangearr.push(b);
        		    }
        		}
        		sliderEvent($timeLine,tNoChangearr)
        		tn = Number(tN);
        		var slider1 = $timeLine.data("ionRangeSlider");
	    		slider1.update({
	                from: tn
	            });
			}
		});
		//contentResult();
	}
	
	function contentResult() {
		if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
			//总价
			var price = Number(parseInt($('#price').val().replace(",","")));
			var $contentResult = $('.content-result');
			//支付比例
			var downPaymentRatio =Number($('#payline').val());
			
			//贷款期数
			var loanTerm =Number($('#timeline').val());
			//首付金额
			var first_payment = price*(downPaymentRatio/100);
			//贷款金额
			var loan_amount = price*(1-downPaymentRatio/100);
			//月供
			var monthly_payment =loan_amount/loanTerm;
			
			var modelId = $('#car-style').val();
			var productId = $('#finance-products').val();
			$("#audit_PlanloanAmount").val(first_payment);
			var productCode;
			$.ajax({
				type: "GET",
				url: 'findProductCode.json',
				async:true,
				data: {"productId":productId},
				dataType: "json",
				success: function(data){
					var isobj = typeof(data) == "object" ;
					// 非对象
					if(!isobj) {
						data = $.parseJSON(data);
					}
				data = data[0];
				productCode = data.cd_code;
				}
			});
			//查询对应金融产品的贷款方案
			$.ajax({
				type: "GET",
				url: 'loanScheme.json',
				async:true,
				data: {"mid":modelId,"productId":productId,"downPaymentRatio":downPaymentRatio,"loanTerm":loanTerm},
				dataType: "json",
				success: function(data){
					var isobj = typeof(data) == "object" ;
					// 非对象
					if(!isobj) {
						data = $.parseJSON(data);
					}
					data = data[0];
					//利息 = 贷款金额*（总费率-客户费率）
					//var interest = loan_amount*(data.vls_totleRate/100 - data.vls_userRate/100);
					/*if(interest.indexof('.') != -1){
						interest.toFixed(6)
					}*/
					var interest = data.vls_userInterest;
					loanSchemeId = data.vls_loanSchemeId;
					var allPay = price + interest;
					//首月付全部利息
					if(productCode == 1 && data.vls_userInterest != 0){
						$("#inter").show();
					}else{
						$("#inter").hide();
					}
					var result;
					//半台车
					if(productCode == 2){
						$("#lastMonthy").show();
						$("#titlePrice").hide();
						result = [format(first_payment),format(first_payment),loanTerm+'个月',format(data.vls_userInterest),format(data.vls_userRate)]
						/*financeresult00();*/
					}else{
						$("#lastMonthy").hide();
						$("#titlePrice").show();
						result = [format(allPay),format(first_payment),loanTerm+'个月',format(data.vls_userInterest),format(data.vls_userRate)]
						/*financeresult00();*/
					}
					financeresult00();
					$('.content-result').find('.line').each(function(index, el) {
						$(this).find('span.showValue').text(result[index]);
					}).parents('.content-result').find('a').removeClass('noClick')
				}
			});
		}else{
			/*//首付比例与期数不可选
			$('.selected').removeClass('selected').find('img').attr('src','../faw/images/financial/drag.png');
			$('.payline').find('li').addClass('no-click');
			$('.timeline').find('li').addClass('no-click');*/
			$("#lastMonthy").hide();
			$("#titlePrice").show();
			$("#inter").hide();
			//$('.selected').removeClass('selected').find('img').attr('src','../faw/images/financial/drag.png');
			
			for (var i = 0; i < noChangearr.length; i++) {
				$payLine.prev('.irs-with-grid').find('.js-grid-text-'+noChangearr[i]).removeClass('noChange');
				$payLine.prev('.irs-with-grid').find('.js-grid-text-'+noChangearr[i]).find("span").remove();
	    	}
			noChangearr = [];
    		var slider1 = $payLine.data("ionRangeSlider");
    		slider1.update({
                from: 0
            });
			for (var i = 0; i < tNoChangearr.length; i++) {
				$timeLine.prev('.irs-with-grid').find('.js-grid-text-'+tNoChangearr[i]).removeClass('noChange');
				$timeLine.prev('.irs-with-grid').find('.js-grid-text-'+tNoChangearr[i]).find("span").remove();
	    	}
			tNoChangearr = [];
    		var slider2 = $timeLine.data("ionRangeSlider");
    		slider2.update({
                from: 0
            });
			//清空计算结果
			var result =['','','','',''];
			$('.content-result').find('.line').each(function(index, el) {
				$(this).find('span.showValue').text(result[index]);
			}).parents('.content-result').find('a').addClass('noClick')
		}
		

	}

	//数据赋值
	function writeOption(val, a, b, html) {
		if(html) {
			var html = html;
		}else{
			var html = '<option value=""></option>';
		}
		
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i][a] == val || !val) {
				arr.push(data[i][b]);
			}
		};
		$.unique(arr);
		for (var i = 0; i < arr.length; i++) {
			html += '<option value="' + arr[i] + '">' + arr[i] + '</option>';
		};
		return html;
	}

	$('select').chosen({
		disable_search:true,
		width:'48%'
	});

	//select宽度自适应
	selectWidth();
	function selectWidth(){
		if($(window).width()<640) {
			$('.chosen-container ').css('width','98%')
		}else{
			$('.chosen-container ').css('width','48%')
		}
	}
	$(window).resize(function(event) {
		selectWidth()
	});


	//事件绑定 期数
	/*$('.timeline').on('click', 'ul li', function(event) {
		event.preventDefault();
		if($(this).hasClass('selected') || $(this).hasClass('no-click')) return;
		//检测代码
		if($(window).width()>640){
			ga('send','event','pc/金融贷款计算器_主视觉','选择','贷款期限_201608090041');
		}else{
			ga('send','event','m/金融贷款计算器_主视觉','选择','贷款期限_201608090087');
		}
		$(this).addClass('selected').find('img').attr('src','../faw/images/financial/drag-selected.png').parent('li').siblings('.selected').removeClass('selected').find('img').attr('src','../faw/images/financial/drag.png');
		if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
			contentResult();
		}
	});*/
	//事件绑定 首付比例
	/*$('.payline').on('click', 'ul li', function(event) {
		event.preventDefault();
		if($(this).hasClass('selected') || $(this).hasClass('no-click')) return;
		if($(window).width()>640){
			ga('send','event','pc/金融贷款计算器_主视觉','选择','首付比例_201608090040');
		}else{
			ga('send','event','m/金融贷款计算器_主视觉','选择','首付比例_201608090086');
		}
		$(this).addClass('selected').find('img').attr('src','../faw/images/financial/drag-selected.png').parent('li').siblings('.selected').removeClass('selected').find('img').attr('src','../faw/images/financial/drag.png');
		
		if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
			//重置 期数线
			$('.timeline').find('.selected').removeClass('selected').find('img').attr('src','../faw/images/financial/drag.png');
			$('.timeline').find('li').addClass('no-click');
			//首付比例
			var downPaymentRatio =Number($('.payline').find('.selected').children('p').text());
			
			var modelId = $('#car-style').val();
			var productId = $('#finance-products').val();
			var countT = 0 ;
			//查询对应 对应首付比例的 期数
			$.ajax({
				type: "GET",
				url: 'timeLineByPayLine.json',
				async:true,
				data: {"mid":modelId,"productId":productId,"downPaymentRatio":downPaymentRatio},
				dataType: "json",
				success: function(data){
					var isobj = typeof(data) == "object" ;
					// 非对象
					if(!isobj) {
						data = $.parseJSON(data);
					}
					//比较查询出的贷款期数是否存在
					var timeline ="12,18,24,36,48,60";
					for (var i = 0; i < data.length; i++) {
						var timeValue = data[i].vls_loanTerm+"";
						if(timeline.indexOf(timeValue) != -1){
							var data2 = $('.timeline').find('p');
							for(j = 0 ; j < data2.length ; j++){
								if(timeValue == data2[j].innerHTML){
									$('.timeline').find('li').eq(j).removeClass('no-click');
									if(++countT == 1){
										$('.timeline').find('li').eq(j).addClass('selected').find('img').attr('src','../faw/images/financial/drag-selected.png');
									}
								}
							}
						}
					}
				}
			});
			
			contentResult();
		}
	});*/

	$('.popup').on('click', 'a.popup-close', function(event) {
		event.preventDefault();
		$('#all-finance a.btn-apply').addClass('noClick');
		$(this).parents('.popup').hide();
	});
	
	var originalWidth  = document.documentElement.clientWidth;
	window.onresize = function () {
		var _originalWidth = document.documentElement.clientWidth;
			if($(window).width()>640){
				if (originalWidth < 640){
					$('#all-finance a.btn-apply').addClass('noClick');
					var pageNo = 1;
					//加载全部金融方案
					finaInstSche(pageNo);
				}
			}else{
				if(originalWidth  > 640){
					$('#all-finance a.btn-apply').addClass('noClick');
					finaInstSche(0);
				}
			}
			originalWidth  = _originalWidth;
	}
	$('a#btn-all-finance').on('click', function(event) {
		event.preventDefault();
		if($(this).hasClass('noClick')) return;
		//当前页数
		var pageNo = 1;
		//加载全部金融方案
		finaInstSche(pageNo);
		$('#all-finance').show();

		if($(window).width()<640){
			$('#all-finance').on('click', 'table.finance-list tr', function(event) {
				event.preventDefault();
				if($(this).find('.check').hasClass('selected')) return;
				var finorg=$(this).attr("orgid");
				if(finorg=='132135'||finorg=='132134'||finorg=='132131'){
					$("#allfinbtn").text("资质预审");
				}else{
					$("#allfinbtn").text("申请贷款");
				}
				$(this).find('.check').addClass('selected').parents('tr').siblings('tr').find('.check').removeClass('selected');
				if($(this).hasClass('Pre')){
					$('#all-finance a.btn-Pre').removeClass('noClick').siblings('a').addClass('noClick');
				}else{
					$('#all-finance a.btn-apply').removeClass('noClick').siblings('a').addClass('noClick');
				}
				
			});	
		}else{
			$('#all-finance').on('click', 'td .check', function(event) {
				event.preventDefault();
				if($(this).hasClass('selected')) return;
				var finorg=$(this).parent().parent().parent().attr("orgid");
				
				if(finorg=='132135'||finorg=='132134'||finorg=='132131'){
					$("#allfinbtn").text("资质预审");
				}else{
					$("#allfinbtn").text("申请贷款");
				}
				$(this).addClass('selected').parents('tr').siblings('tr').find('.check').removeClass('selected');

				if($(this).parents('tr').hasClass('Pre')){
					$('#all-finance a.btn-Pre').removeClass('noClick').siblings('a').addClass('noClick');
				}else{
					$('#all-finance a.btn-apply').removeClass('noClick').siblings('a').addClass('noClick');
				}
			});		
		}

	});
	//点击跳转到贷款申请页面
	$('.content-result a#btn-apply').click(function(){
		if($(this).hasClass('noClick')) return;
		if($(window).width()>640){
			// ga('send','event','pc/金融贷款计算器_主视觉','选择','申请贷款_201608090043');
		}else{
			// ga('send','event','m/金融贷款计算器_主视觉','选择','申请贷款_201608090088');
		}
		//console.log("id = "+loanSchemeId);
		//console.log("比例 = "+$('#payline').val());
		if($("#btn-apply").text()=="资质预审"){
			window.location.href="/vw/qualification.htm?loanSchemeId="+loanSchemeId;
		}else{
	    window.location.href="/finance/apply_loan.htm?loanSchemeId="+loanSchemeId;
		}
	})
	//点击跳转到贷款申请页面
	$('#all-finance a.btn-apply').click(function(){
		if($(this).hasClass('noClick')) return;
		var id = $(".finance-list td span.check.selected").parent("div").parent("td").parent("tr").find("input").val();
	    window.location.href="/finance/apply_loan.htm?loanSchemeId="+id;
	})
	$('#all-finance').on('click', '.page-list li', function(event) {
		event.preventDefault();
		if($(this).hasClass('active')) return;
		//得到当前点击的是第几个数量+1就是第几页
		var pageNo = $(this).index()+1;
		$('#all-finance a.btn-apply').addClass('noClick');
		finaInstSche(pageNo);
		$(this).addClass('active').siblings('li').removeClass('active')
		
	});
	
	//查询对应 首付比例和期数的金融方案
	function finaInstSche(pageNo){
		//车型id
		var modelId = $('#car-style').val();
		//首付比例
		var downPaymentRatio =Number($('#payline').val());
		//贷款期数
		var loanTerm =Number($('#timeline').val());
		//总价
		var price = Number(parseInt($('#price').val().replace(",","")));
		//首付金额
		var first_payment = price*(downPaymentRatio/100);
		//贷款金额
		var loan_amount = price*(1-downPaymentRatio/100);
		//月供
		var monthly_payment =loan_amount/loanTerm;
		
		$(".content").find(".note").find("span").eq(0).html(downPaymentRatio +"%");
		$(".content").find(".note").find("span").eq(1).html(loanTerm +"个月");
		var html = '';
		if($(window).width()<640){
			pageNo = 0;
			pageCount = 0;
		}else{
			pageNo = pageNo;
			pageCount = 5;
		}
		//查询全部金融方案
		$.ajax({
			type: "GET",
			url: 'finaInstSche.json',
			async:true,
			data: {"mid":modelId ,"loanTerm":loanTerm,"downPaymentRatio":downPaymentRatio,"pageNo":pageNo,"pageCount":pageCount},
			dataType: "json",
			success: function(data){
				var isobj = typeof(data) == "object" ;
				// 非对象
				if(!isobj) {
					data = $.parseJSON(data);
				}
				data = data.list;
				//当前页数
				//总条数
				var totalCount = data.totalCount;
				//总页数
				var totalPage = data.totalPage;
				
				data = data.list;
				if(data != null){
					for(i = 0 ; i < data.length; i++){
						//利息 
						var interest = data[i].vls_userInterest;
						var isorg=data[i].vfis_financialInstitution;
						var allPay = price + interest;
						var productCode;
						var interestMessage;
						var halfMessage;
						$.ajax({
							type: "GET",
							url: 'findProductCode.json',
							async:true,
							data: {"productId":data[i].vfis_financialProduct},
							dataType: "json",
							success: function(data){
								var isobj = typeof(data) == "object" ;
								// 非对象
								if(!isobj) {
									data = $.parseJSON(data);
								}
							data = data[0];
							productCode = data.cd_code;
							}
						});
						//首月付全部利息
						if(productCode == 1 && data[i].vls_userInterest != 0){
							interestMessage = "（初期一次性交付）";
						}else{
							interestMessage ="";
						}
						//半台车
						if(productCode == 2){
							halfMessage = "（最后一月需支付尾款:"+format(first_payment)+"元）";
						}else{
							halfMessage = "";
						}
						html += '<tr orgid="'+isorg+'" class="bg"><input name="vls_loanSchemeId" type="hidden"  value="' + data[i].vls_loanSchemeId + '"/><td>'
						html += '<div class="text1"><span class="check"></span>'+data[i].vfis_finaInstName+'-'+data[i].vfis_finaProName+'</div></td>'
						html += '<td><div class="text2">总共支付：￥'+format(allPay)+' 利息：￥'+format(data[i].vls_userInterest)+interestMessage+halfMessage+'</div></td>'
						html += '<td><div class="text3">月供：￥'+format(data[i].vls_userRate)+'</div></td></tr>'
					}
					$(".finance-list").html(html);
					//首次打开全部金融方案 拼分页的点
					if(pageNo == 1){
						var htmlPage = '';
						for(i = 0;i<totalPage;i++){
							if(i == 0){
								htmlPage += '<li class="active"></li>'
							}else{
								htmlPage += '<li></li>'
							}
						}
                        $(".page-list").html(htmlPage);
					}
				}else{
					html += '<li class="bg">没有其他金融方案</li>'
					$(".finance-list").html(html);
				}
			}
		});
	}

	$('.send-result').on('click', 'a.submit', function(event) {
		event.preventDefault();
		var text;
		if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
			if(isPhoneNum($('input#tel').val())){
				
				$.ajax({
					type: "GET",
					url: 'saveSms.json',
					async:true,
					data: {"mobile":$('input#tel').val() ,"loanSchemeId":loanSchemeId},
					dataType: "json",
					success: function(data){
						var isobj = typeof(data) == "object" ;
						// 非对象
						if(!isobj) {
							data = $.parseJSON(data);
						}
						if(data.success){
							text='信息已发送至您的手机';
						}else{
							text='请勿频繁发送';
						}
					}
				});
				/*$.post('saveSms.json', 'mobile='+$('input#tel').val()+'&loanSchemeId='+loanSchemeId, function(data){
					var isobj = typeof(data) == "object" ;
					// 非对象
					if(!isobj) {
						data = $.parseJSON(data);
					}
					if(data.success){
						text='信息已发送至您的手机';
					}else{
						text='请勿频繁发送';
					}
				});*/
				
				$("#tel").val("");
			}else{
				text='手机号码格式不正确';
			}
		}else{
			text='请选择车型、金融产品';
		}
		$('#popup-sendCode').show().find('p').text(text);
	});
	
	$('.popup').on('click', 'a.btn-close', function(event) {
		event.preventDefault();
		$(this).parents('.popup').hide()
	});
	
	
	function sliderEvent(obj,noChangearr){
		
		if(noChangearr){
			var html;
			
			for (var i = 0; i < noChangearr.length; i++) {
				if(noChangearr[i]==0){
					html = '<span class="line-start">此选项不可选</span>'
				}else if(noChangearr[i]==obj.prev('.irs-with-grid').find('.irs-grid-text').length-1){
					html = '<span class="line-end">此选项不可选</span>'
				}else{
					html = '<span>此选项不可选</span>';
				}
	    		obj.prev('.irs-with-grid').find('.js-grid-text-'+noChangearr[i]).addClass('noChange').append(html);
	    	}	
		}
		
		obj.prev('.irs-with-grid').find('.irs-grid-text').on('click', function(event) {
    		event.preventDefault();
    		if($(this).hasClass('show')) return;
    		var _this = $(this);
    		if(_this.hasClass('noChange')){
    			_this.addClass('show');
				setTimeout(function() {
					_this.removeClass('show');
				}, 1000);
    		}else{
	    		var n = $(this).attr('class');
					n = Number(n.replace('irs-grid-text js-grid-text-',''));
				var slider = obj.data("ionRangeSlider");
	    		slider.update({
                    from: n
                });
	    		if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
	    			contentResult();
	    		}
    		}
    		
    	});
	}

	$payLine = $('#payline');
	
	$payLine.ionRangeSlider({
	    hide_min_max: true,
	    keyboard: true,
	    min: 20,
	    max: 80,
	    postfix: "%",
	    grid: true,
	    values: [20, 30, 40, 50, 60, 70, 80],
	    onFinish:function(data){
	    	var slider = $payLine.data("ionRangeSlider");
	    	var n = data.from;
	    	if(noChangearr.indexOf(data.from) != -1){
	    		slider.update({
                    from: nn
                });
	    		var _this = $payLine.prev('.irs-with-grid').find('.js-grid-text-'+n);
	    		_this.trigger('click');
	    		
	    	}
	    	if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
	    		timelineChange();
	    		contentResult();
	    	}
	    	if($(window).width()>640){
				// ga('send','event','pc/金融贷款计算器_主视觉','选择','首付比例_201608090040');
			}else{
				// ga('send','event','m/金融贷款计算器_主视觉','选择','首付比例_201608090086');
			}
	    },
	    onUpdate:function(){

	    	sliderEvent($payLine,noChangearr);
	    	if($(window).width()>640){
				// ga('send','event','pc/金融贷款计算器_主视觉','选择','贷款期限_201608090041');
			}else{
				// ga('send','event','m/金融贷款计算器_主视觉','选择','贷款期限_201608090087');
			}
	    },
	    onStart:function(){
	    	
	    	sliderEvent($payLine,noChangearr);
	    	
	    }

	});
	

	$timeLine = $("#timeline");
	$timeLine.ionRangeSlider({
	    hide_min_max: true,
	    keyboard: true,
	    min: 12,
	    max: 60,
	    postfix: "个月",
	    grid: true,
	    values: [12, 18, 24, 36, 48, 60],
	    onFinish:function(data){
	    	var slider = $timeLine.data("ionRangeSlider");
	    	var n = data.from;
	    	if(tNoChangearr.indexOf(data.from) != -1){
	    		slider.update({
                    from: tn
                });
	    		var _this = $timeLine.prev('.irs-with-grid').find('.js-grid-text-'+n);
	    		_this.trigger('click');
	    		
	    	}
	    	if($('#car-model').val() != '' && $('#car-style').val() != '' && $('#finance-institution').val() != '' && $('#finance-products').val() != ''){
	    		contentResult();
	    	}
	    	if($(window).width()>640){
				// ga('send','event','pc/金融贷款计算器_主视觉','选择','贷款期限_201608090041');
			}else{
				// ga('send','event','m/金融贷款计算器_主视觉','选择','贷款期限_201608090087');
			}
	    },
	    onUpdate:function(){

	    	sliderEvent($timeLine,tNoChangearr);
	    	if($(window).width()>640){
				// ga('send','event','pc/金融贷款计算器_主视觉','选择','贷款期限_201608090041');
			}else{
				// ga('send','event','m/金融贷款计算器_主视觉','选择','贷款期限_201608090087');
			}
	    },
	    onStart:function(){
	    	
	    	sliderEvent($timeLine,tNoChangearr);
	    	
	    }

	});
})()
