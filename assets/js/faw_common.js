var DEALER_IMG ="<a href='http://vw.faw-vw.com/newmagotan/' target='_blank'><img src='/faw/images/dealer-popup-img.jpg' /></a>";

function getBrandSelect(id, defval) {
	var obj = document.getElementById(id);
	var opts = obj.options;
	opts.length = 1;	
	var data = branddatas;
	//var _url = "/select/brand.json";
	//$.getJSON(_url,'',function(data){
		for(var i=0;i<data.length;i++) {
			var name = data[i].vb_brandName;
			var opt = new Option(name, data[i].vb_brandId);
			if(data[i].vb_brandId==defval){
				opt.selected=true;
			}
			opts.add(opt);
		}
		$(obj).trigger('chosen:updated');
	//});
}

function getModelSelect(id, bid, defval) {
	var obj = document.getElementById(id);
	var opts = obj.options;
	opts.length = 1;	
	var _url = "/select/model.json";
	$.getJSON(_url,'id=' + bid,function(data){
		for(var i=0;i<data.length;i++) {
			var name = data[i].vm_modelName;
			var opt = new Option(name, data[i].vm_modelId);
			if(data[i].vm_modelId==defval){
				opt.selected=true;
			}
			opts.add(opt);
		}
		$(obj).trigger('chosen:updated');
	});
}

function getProvinceSelect(id, defval) {
	var obj = document.getElementById(id);
	var opts = obj.options;
	opts.length = 1;	
	var _url = "/select/province.json";
	$.getJSON(_url,'',function(data){
		for(var i=0;i<data.length;i++) {
			var name = data[i].vp_name;
			var opt = new Option(name, data[i].vp_id);
			if(data[i].vp_id==defval){
				opt.selected=true;
			}
			opts.add(opt);
		}
		$(obj).trigger('chosen:updated');
	});
}

function getCitySelect(id, pid, defval) {
	var obj = document.getElementById(id);
	var opts = obj.options;
	opts.length = 1;	
	var _url = "/select/city.json";
	$.getJSON(_url,'id=' + pid,function(data){
		for(var i=0;i<data.length;i++) {
			var name = data[i].vc_name;
			var opt = new Option(name, data[i].vc_id);
			if(data[i].vc_id==defval){
				opt.selected=true;
			}
			opts.add(opt);
		}
		$(obj).trigger('chosen:updated');
	});
}

function getDealerSelect(id, cid, defval) {
	var obj = document.getElementById(id);
	var opts = obj.options;
	opts.length = 1;	
	var _url = "/select/dealer.json";
	$.getJSON(_url,'id='+cid,function(data){
		for(var i=0;i<data.length;i++) {
			var name = data[i].vd_dealerName;
			var opt = new Option(name, data[i].vd_id);
			if(data[i].vd_id==defval){
				opt.selected=true;
			}
			opts.add(opt);
		}
		$(obj).trigger('chosen:updated');
	});
}

(function(i,s,o,g,r,a,m){
	i['GoogleAnalyticsObject']=r;
	i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
	a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-40996388-5', 'auto');
	  ga('send', 'pageview');