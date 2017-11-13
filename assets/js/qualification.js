$('.sub_nav a').click(function(){
	$('.sub_nav li').removeClass('active');
	$(this).parent().addClass('active');
});

(function(){
	var oRadio = $(".choosebank_item"),
		oApply = $(".apply_loan");
	oRadio.click(function(){
		index = $(this).index() - 1;
		oRadio.removeClass("current");
		$(this).addClass("current");
		oApply.hide();
		oApply.eq(index).show();
	})

	$('.clause span.check').on('click', function(event) {
		event.preventDefault();
		if($(this).hasClass('checked')){
			$(this).removeClass('checked');
			//$(this).siblings().hide();
		}else{
			$(this).addClass('checked');
			///$(this).siblings().show();
		}
	})

	$('.income-check').on('click', function(event) {
		event.preventDefault();
		$('.empty').removeClass("checked");
		if($(this).hasClass('checked')){
			$(this).siblings().hide();
		}else{
			$(this).siblings().show();
		}
	})

	$('.empty').on('click', function(event) {
		event.preventDefault();
		$(".income-check").removeClass('checked');
		$(".check-input").hide();
		$(".check-input-unit").hide();
	})


	$(".input_cue").mouseover(function(){
		$(this).next(".input_bubble").show();
	})
	$(".input_cue").mouseout(function(){
		$(this).next(".input_bubble").hide();
	});

	$('#pingan_agree').on('click', function(event) {
		event.preventDefault();
		$("#vw_popup").show();
	});
	$('#vw_agree').on('click', function(event) {
		event.preventDefault();
		$("#vw_popup").show();
	});
	$('#zhaoshang_agree').on('click', function(event) {
		event.preventDefault();
		$("#zhaoshang_popup").show();
	});
	$('.popup-close').on('click', function(event) {
		event.preventDefault();
		$(".popup").hide();
	});
	$('.close_pop_a').on('click', function(event) {
		event.preventDefault();
		$(".popup").hide();
	});
})();

(function(){
	formEvent();
	$('.select-box select').chosen({
		disable_search:true,
		width: '100%'
	});
	$('a.submit_pingan').on('click', function(event) {
		event.preventDefault();
		var objArr = [];
		$('.pingan p.warning').each(function(index, el) {
			objArr[index] = $(this).parents('.select-box').find('select');
			if(index==2 || index==7 || index==8 || index==9 || index==10 || index==11 || index==12 || index==13) {
				objArr[index] = $(this).prev('input');
			}

			if(objArr[index].val()=='') {
				$(this).parent('div').addClass('warning');
			}
			else{
				if(objArr[index].attr('type')=='tel'){
					if(!isPhoneNum(objArr[index].val())){
						$(this).parent('div').addClass('warning');
						return;
					}
				}
				$(this).parent('div').removeClass('warning');
			}
		});
		//js和红坊合并
		if($('#pingan_check').hasClass('checked')){
			$('#abc_abcCarModelDisplay').val($("#car-model").find("option:selected").text());
			$('#abc_abcCarStyleDisplay').val($("#car-style").find("option:selected").text());
				$.ajax({ 
					url:$("#hidden_path").val()+'/finance/bankCreditRealization.json',
			    dataType: "json", 
			        type: "post",  
			        data: $("#pingan").serialize(),
			     success:function(data){
			    	 if(data.success){
				    		alert("恭喜您提交成功");
				    	 }else{
				    		 alert(data.message);
				    	 }
			     }
			   });
			}else{
				alert("请先同意声明");
			}
		
	});

	$('a.submit_faw').on('click', function(event) {
		event.preventDefault();
		var objArr = [];
		$('.faw p.warning').each(function(index, el) {
			objArr[index] = $(this).parents('.select-box').find('select');
			if(index==6 || index==7 || index==10 || index==11 || index==15 || index==16) {
				objArr[index] = $(this).prev('input');
			}

			if(objArr[index].val()=='') {
				$(this).parent('div').addClass('warning');
			}
			else{
				if(objArr[index].attr('type')=='tel'){
					if(!isPhoneNum(objArr[index].val())){
						$(this).parent('div').addClass('warning');
						return;
					}
				}
				$(this).parent('div').removeClass('warning');
			}
		});
		//js和红坊合并
		if($('#yiqi_check').hasClass('checked')){
			$('#aff_afCarModelDisplay').val($("#car-model").find("option:selected").text());
			$('#aff_afCarStyleDisplay').val($("#car-style").find("option:selected").text());
				$.ajax({ 
					url:$("#hidden_path").val()+'/finance/fawFinanceRealization.json',
			    dataType: "json", 
			        type: "post",  
			        data: $("#yiqijinrong").serialize(),
			     success:function(data){
			    	 if(data.success){
			    		alert("恭喜您提交成功");
			    	 }else{
			    		 alert(data.message);
			    	 }
			     }
			   });
			}else{
				alert("请先同意声明");
			}
	});

	$('a.submit_zhaoshang').on('click', function(event) {
		event.preventDefault();
		var objArr = [];
		$('.zhaoshang p.warning').each(function(index, el) {
			objArr[index] = $(this).parents('.select-box').find('select');
			if(index==0 || index==2 || index==3 || index==5 || index==8 || index==10 || index==11) {
				objArr[index] = $(this).prev('input');
			}
			

			if(($("#asa_asaRealValue").val())==''){
				$(this).parent('div').addClass('warning');
				return;
			}
			if(objArr[index].val()=='') {
				$(this).parent('div').addClass('warning');
				return;
			}
			else{
				if(objArr[index].attr('type')=='tel'){
					if(!isPhoneNum(objArr[index].val())){
						$(this).parent('div').addClass('warning');
						return;
					}
				}
				$(this).parent('div').removeClass('warning');
			}
		});
		//js和红坊合并
		if($('#zhaoshang_check').hasClass('checked')){
			$.ajax({ 
				url:$("#hidden_path").val()+'/finance/getTjjg.json',
		    dataType: "json", 
		        type: "post",  
		        data: {queryId:$("#queryId").val(),verification:$("#dynamiccode").val()},
		     	success:function(data){
		    	 if(data.success){
		    		alert("恭喜您提交申请成功");
		    	 }else{
		    		 alert(data.message);
		    	 }
		     }
		   });
		}else{
			alert("请先同意服务协议");
		}
	});
	
	$('.noHouse').click(function(){
		$('.houseLine').hide();
	});
	$('.hasHouse').click(function(){
		$('.houseLine').show();
	});
	$('.noCar').click(function(){
		$('.carLine').hide();
	});
	$('.hasCar').click(function(){
		$('.carLine').show();
	});
	$('.mainbody input').css('color','#999999');
	$('.mainbody').each(function(index, el) {
		$(this).find('input').focus(function(event) {
			$(this).css('color','#000000')
		}).blur(function(event) {
			if($(this).val()==""){
				$(this).css('color','#999999')
			}
		});
	});
})();