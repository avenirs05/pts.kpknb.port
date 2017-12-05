
var tvVal = [{
	"did": "1",
	"pop": "#popup-calc",
	"min_summa": 1000,
	"max_summa": 15000000,
	"procent": 14.9,
	"srok_ot": 1,
	"srok_do": 60
},
{
	"did": "2",
	"pop": "#popup-calc-2",
	"min_summa": 1000,
	"max_summa": 3000000,
	"procent": 42.8,
	"srok_ot": 1,
	"srok_do": 120
},
{
	"did": "3",
	"pop": "#popup-calc-3",
	"min_summa": 1000,
	"max_summa": 3000000,
	"procent": 42.8,
	"srok_ot": 1,
	"srok_do": 120
},
{
	"did": "4",
	"pop": "#popup-calc-4",
	"min_summa": 3000,
	"max_summa": 60000,
	"procent": 20.7,
	"srok_ot": 1,
	"srok_do": 12
},
{
	"did": "5",
	"pop": "#popup-calc-5",
	"min_summa": 30000,
	"max_summa": 3000000,
	"procent": 27.9,
	"srok_ot": 1,
	"srok_do": 84
},
{
	"did": "6",
	"pop": "#popup-calc-6",
	"min_summa": 1000,
	"max_summa": 5000000,
	"procent": 16.9,
	"srok_ot": 12,
	"srok_do": 240
},
{
	"did": "7",
	"pop": "#popup-calc-7",
	"min_summa": 70000,
	"max_summa": 500000,
	"procent": 45,
	"srok_ot": 2,
	"srok_do": 6
},
{
	"did": "8",
	"pop": "#popup-calc-8",
	"min_summa": 10000,
	"max_summa": 100000,
	"procent": 23.9,
	"srok_ot": 1,
	"srok_do": 12
}];

// init
tvVal[5]['procent2'] ={}
tvVal[0]['procent2'] ={}
tvVal[6]['procent2'] ={}
tvVal[7]['procent2'] ={}

tvVal[3]['free'] = 1; // льготный период
tvVal[1]['free'] = 0;
tvVal[2]['free'] = 0;
tvVal[4]['free'] = 0;
tvVal[5]['free'] = 0;
tvVal[6]['free'] = 0;
tvVal[7]['free'] = 0;
tvVal[0]['free'] = 0;

tvVal[1]['procent2'] = {0: 42.8, 61000: 37,121000:34.9, 251000:29.9, 601000: 27.9, 1501000: 24.9, 2501000: 19.9, 2801000: 14.9}; // конструкт
tvVal[2]['procent2'] = {60000: 42.8, 120000: 37,250000:34.9, 600000:29.9, 1500000: 27.9, 2500000: 24.9, 2800000: 19.9, 3000000: 14.9}; // авто
tvVal[3]['procent2'] = {3000: 251.85, 6000: 98.55,11000:69.35, 31000:42.8}; // экспресс
tvVal[4]['procent2'] = {300000: 27.9, 900000: 24.9,2000000:23.6, 2800000:19.9, 3000000: 14.9}; // пенсионный 


function rangeInit(blockId, min, max, percent, data) {
	/*
	var range = document.querySelector(blockId + ' .calculator_slider calculator_slider-max');
	noUiSlider.create(range, {
		animate: true,
		step: 1,
		start: 1,
		range: {
			'min': min,
			'max': max,
		},
		connect: 'lower',
		'serialization': {
			'format': {'decimals': 0 }
		},
	});
	
	range.noUiSlider.on('update', function(values, handle) {
		if (handle == 0) {
			$(blockId + ' #range-value').val(parseFloat(values[handle]));
			calcPay(blockId, percent, data); 
		}
	});
	
	$(blockId + ' #summ, ' + blockId + ' #range-value').on('input', function(event) {
		calcPay(blockId, percent, data); 
	});
	
	$(blockId + ' #summ').on('keyup', function(event) {
		this.value = this.value.replace(/[^0-9\.]/g, '');
	});
	*/
	
}

function roundPrcs(value, precision) {
	var val = Math.ceil(value * Math.pow(10, precision));
	val = val < 0 ? "" : val.toString();
	if (precision == 0) {
		val = val.substring(0, val.length - precision) + ".00";
		} else {
		val = val.substring(0, val.length - precision) + "." + val.substring(val.length - precision, val.length);
	}
	return val;
}

function IsLeapYear(year) { 
	if(year%4 == 0) { 
		if(year%100 == 0) { 
			if(year%400 == 0) { 
				return true; 
			} 
			else 
			return false; 
		} 
		else 
		return true; 
	} 
	return false; 
}

function roundPrcs(value, precision) {
	var val = Math.ceil(value * Math.pow(10, precision));
	val = val < 0 ? "" : val.toString();
	
	if (precision == 0) {
		val = val.substring(0, val.length - precision) + ".00";
		} else {
		val = val.substring(0, val.length - precision) + "." + val.substring(val.length - precision, val.length);
	}
	return val;
}

// Рассчет для вкладов
function calcPay(blockId, percent, dataIn) {
	var summ     = intByText($(blockId + ' #summ').val()) * 1;        // Сумма вклада
	var months   = intByText($(blockId + ' #range-value').val()) * 1;  // Срок вклада в месяцах
	var minSumm =  intByText($(blockId + ' .cost-from').html());
	
	/*
	if(summ < minSumm){
		$(blockId + ' span.error').show();
		$(blockId + ' span.error').html("Мин. сумма для вклада " + minSumm + " рублей");
		$(blockId + ' .calc__total').hide();
		$(blockId +' #summ').addClass('error')
		return false;
	}
	*/
	/*
	$(blockId + ' span.error').hide();
	$(blockId + ' .calc__total').show();
	$(blockId +' #summ').removeClass('error')
	*/
	var leng = 0;
	$.each(dataIn['procent2'], function(index, value) {
		//console.log( summ  + ' ' + index) ; 
		if(summ >= index){
			percent = (value/100).toFixed(3);
		}
		leng++;
	});
	
	var  months2 = months; 
	if(dataIn['free'] == 1){
		if(months2 == 1){
			months = ((months2*30 - 7)/30).toFixed(2);
		}
		if(months2 == 2){
			 months = ((months2*30 - 12)/30).toFixed(2);
		}
		 if(months2 > 2 && months2 <= 6){
			//console.log(months)
			 months = ((months2*30 - 20)/30).toFixed(2);
		}
		if(months2 > 6){
			 months = ((months2*30 - 30)/30).toFixed(2);
		}
	}
	
	//до 30 - 7 дней, до 60 -12 дней , до 180 дней - 20 , до 365 - 30 
	var curSum = summ;
	var capit =0;
	var summE =0;
	var month_rate = (percent/12) ;   //  месячная процентная ставка по кредиту (= годовая ставка / 12)
	var kkk = (month_rate * Math.pow((1 + month_rate), months)) / ( Math.pow((1 + month_rate), months) - 1  ) ; // коэффициент аннуитета
	var kkk = month_rate + (month_rate / (Math.pow((1 + month_rate), months) - 1)) ; // коэффициент аннуитета

	var payment = kkk * summ ;   // Размер ежемесячных выплат
	
	//console.log('Сумма: ' + summ);
	//console.log('%: ' + percent);
	//console.log('Срок: ' + months);
	//console.log('Размер ежемесячных выплат: ' + payment)     
	
	if(dataIn['free'] == 1 && months2 == 1){
		var payment2 = ((summ * percent)/365)  * 30;
		payment = (payment2 *months)/months2;
		payment = summ  + payment;
	}
	//$(blockId + ' .calc__total span:eq(1)').html(payment.toFixed(2));
	
	return payment;
}

$(document).ready(function(){
	$.each(tvVal, function( index, value ) {
		var st = value['procent']/100;
		 if(value['srok_ot']-0 == 0){
			rangeInit(value['pop'], 1, value['srok_do']-0, st.toFixed(3), value);
			}else{
			rangeInit(value['pop'], value['srok_ot']-0, value['srok_do']-0, st.toFixed(3), value);
		}
	});
	
	
	//$('.calculator_slider-range-to')
	
	
});













