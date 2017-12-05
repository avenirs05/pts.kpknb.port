
var ___geoip = null;
var ___geoipRetry = 0;
window.geoip_callbacks = window.geoip_callbacks || [];

function geoip_data(data){
	if(typeof(data) === 'undefined'){
		return ___geoip;
	}
	if(typeof(data) != 'object'){
		data = {country: null, region: null, city: null};
	}
	if(data['country'] == null){
		data['country'] = {name_ru: '', name_en: ''};
	}
	if(data['region'] == null){
		data['region'] = {name_ru: '', name_en: ''};
	}
	if(data['city'] == null){
		data['city'] = {name_ru: '', name_en: ''};
	}
	___geoip = data;
	return true;
}

function geoip_init(){
	if(___geoip == null && ___geoipRetry < 3000){
		___geoipRetry += 50;
		setTimeout(function() { geoip_init(); }, 50);
		return false;
	}
	geoip_apply();
	return true;
}

function geoip_ip_get(){
	var ip = '';
	var m = window.location.href.match(/geoip=([\d\.]+)/);
	if(m != null){
		ip = m[1];
	}
	return ip;
}

function geoip_request(ip){
	var ip = ip || geoip_ip_get() || '';
	jQuery.ajax({
		url: 'http://api.sypexgeo.net/jsonp/' + ip + '&callback=geoip_data',
		dataType: "script",
		cache: true,
		success: function( data, textStatus, jqxhr ) {  }
	});
	return true;
}
geoip_request();

jQuery(document).ready(function(){
	geoip_init();
});

function geoip_callback(d, geo){
	var d = d || null;
	var geo = geo || {};
	for(i in geoip_callbacks){
		var r_function = geoip_callbacks[i];
		if(typeof(r_function) == 'string'){
			var r_function = new Function(r_function);
		}
		if(typeof(r_function) == 'function'){
			r_function(d, geo);
		}
	}
	return true;
}

function geoip_apply(){
	var geo = geoip_data();
	var t = {
		'city': geo['city']['name_ru'],
		'region': geo['region']['name_ru'],
		'country': geo['country']['name_ru']
	};
	
	if(t['city'] == 'Маунтин-Вью'){
		t['city'] = '';
		t['region'] = '';
		t['country'] = '';
	}
	
	geoip_callback(t, geo);
	
	$('.t_city').html(t['city']);
	$('.t_region').html(t['region']);
	$('.t_country').html(t['country']);
	
	$('input[name="profile_city"]').val(t['city']);
	$('input[name="profile_region"]').val(t['region']);
	$('input[name="profile_country"]').val(t['country']);
	
	var city = t['city'] || '';
	switch(city){
		case 'Москва': city = 'Москве'; break;
		case 'Вологда': city = 'Вологде'; break;
		case 'Санкт-Петербург': city = 'Санкт-Петербурге'; break;
		case 'Череповец': city = 'Череповце'; break;
		case 'Ярославль': city = 'Ярославле'; break;
		case 'Казань': city = 'Казани'; break;
	}
	
	if(city != ''){
		$('.geo_city').html('в городе ' + city);
	}
	
	if(t['country'] == 'Россия'){
		if(t['region'] != 'Москва' && t['region'] != 'Московская область'){
		//	$('.section-top .phone-span').html('Бесплатный звонок по России. Круглосуточно.');
		}
	}
	/*
	var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	if(isMobile && t['city'] != 'Москва'){
		$('.title-main-33').html('Организуем <span class="selected">трансфер в Москву и обратно</span>');
	}
	*/
	return true;
}


