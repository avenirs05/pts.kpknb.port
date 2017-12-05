

function intByText(html, def){
	var html = html || '';
	var r = 0;
	r = parseFloat(html.replace(/ /g, ''));
	if(r == '' && typeof(def) != 'undefined'){
		r = def;
	};
	return r;
}


$(document).ready(function() {
	function getMoneyFormat(number) {
		var number = number.toString().replace(/ /gi, '');
		var reversed = ('' + number).split("").reverse(),
			result = '';
		reversed.forEach(function(item, i, arr) {
			if(i <= 3) {
				if (i % 2 == 0 && i != 0) {
					result += reversed[i] + ' ';
				} else {
					result += reversed[i];
				}
			} else {
				if (i % 3 == 0) {
					result += ' ' + reversed[i];
				} else {
					result += reversed[i];
				}
			}
		});
		return result.split("").reverse().join('');
	}
	
	function changeSumCost() {
		var summaryBlock = $('.calculator_summ-val'),
			carCost = $('.calculator_input-car-cost').val(),
			maxCost = $('.calculator_input-max-cost').val(),
			period = $('.calculator_input-period-cost').val(),
			summaryVal = (parseInt(carCost.replace(/ /gi, '')) + parseInt(maxCost.replace(/ /gi, ''))) / parseInt(period.replace(/ /gi, ''));

		// var result = numeral(summaryVal).format('0 000 ');
		var result = getMoneyFormat(summaryVal.toFixed(0));

		if (summaryVal == 'NaN') {
			summaryBlock.html("Введите валидное число");
		}

		//summaryBlock.html(result + ' руб.');

		// $('.calculator_input-max-cost').val(getMoneyFormat(maxCost));
		// $('.calculator_input-car-cost').val(ui.value);

		setTimeout(function() {
			var filledLine = $('.calculator_slider-car .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-car').css('width', filledLine);


			var filledLine = $('.calculator_slider-max  .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-max').css('width', filledLine);

			var filledLine = $('.calculator_slider-period .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-period').css('width', filledLine);
			
		}, 50);
		
		/*
		$.each(tvVal, function( index, value ) {
			var st = value['procent']/100;
			if(value['srok_ot'] - 0 == 0){
				rangeInit(value['pop'], 1, value['srok_do'] - 0, st.toFixed(3), value);
			}else{
				rangeInit(value['pop'], value['srok_ot'] - 0, value['srok_do'] - 0, st.toFixed(3), value);
			}
		});
		*/
		var v = calcPay('#calculator-block', (tvVal[2]['procent'] / 100).toFixed(3), tvVal[2]);
		$('.calculator_summ-val').html(getMoneyFormat(Math.round(v)) + ' руб.');
		
		var s = 'Стоимость автомобиля: ' + $('.calculator_input-car-cost').val() + " руб.\n" +
				'Сумма займа: ' + $('.calculator_input-max-cost').val() + " руб.\n" +
				'Срок займа: ' + $('.calculator_input-period-cost').val() + " мес.\n" +
				'';
		$('[name="profile_calc"]').val(s);
		
	}

	$('.calculator_slider-car').slider({
		min: intByText($('.car-from').html()),
		max: intByText($('.car-to').html()),
		value: intByText($('.calculator_input-car-cost').val()),
		step: 50000,
		slide: function(e, ui) {
			$('.calculator_input-car-cost').val(getMoneyFormat(ui.value));
			var filledLine = $('.ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-car').css('width', filledLine);
			changeSumCost();
			
		}
	});


	$('<div class="calculator_slider-filled_line-car"></div>').appendTo($('.calculator_slider-car'));

	$('.calculator_input-car-cost').on('input',function(e) {

		var value = $(this).val();

		// setTimeout(function() {

		// 	var filledLine = $('.calculator_slider-car .ui-slider-handle').position().left;
		// 	$('.calculator_slider-filled_line-car').animate({
		// 		'width': filledLine
		// 	}, 100);
				
		// }, 80);


		$('.calculator_slider-car').slider( "option", "value", parseInt(value.replace(/ /gi, '')) );
		$(this).val(getMoneyFormat(value));


		if(parseInt(value.replace(/ /gi, '')) < 1) {
			$(this).val(0);
		} else if (parseInt(value.replace(/ /gi, '')) > 1000000000) {
			$(this).val(getMoneyFormat(1000000000));
		} else if(value.length == 0) {
			 $('.calculator_summ-val').text('Введите все поля');
		} 
		changeSumCost();
	});

	// second
	$('.calculator_slider-max').slider({
		min: intByText($('.cost-from').html()),
		max: intByText($('.cost-to').html()),
		value: intByText($('.calculator_input-max-cost').val()),
		step: 1000,
		slide: function(e, ui) {
			$('.calculator_input-max-cost').val(getMoneyFormat(ui.value));
			var filledLine = $('.calculator_slider-max  .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-max').css('width', filledLine);
			changeSumCost();
		}
	});
	$('<div class="calculator_slider-filled_line-max"></div>').appendTo($('.calculator_slider-max'));

	$('.calculator_input-max-cost').on('input',function(e) {
		var value = $(this).val();
		$('.calculator_slider-max').slider( "option", "value", parseInt(value.replace(/ /gi, '')) );
		$(this).val(getMoneyFormat(value));

		if(parseInt(value.replace(/ /gi, '')) < 1) {
			$(this).val(1);
		} else if (parseInt(value.replace(/ /gi, '')) > 1000000000) {
			$(this).val(getMoneyFormat(1000000000));
		} else if(value.length == 0) {
			$('.calculator_summ-val').text('Введите все поля');
		} 
		changeSumCost();
	});

	// Third
	$('.calculator_slider-period').slider({
		min: intByText($('.range-from').html()),
		max: intByText($('.range-to').html()),
		value: intByText($('.calculator_input-period-cost').val()),
		step: 1,
		// change: function(e, ui) {
		// 	$('.calculator_input-period-cost').val(ui.value);

		// 	var filledLine = $('.calculator_slider-period .ui-slider-handle').position().left;
		// 	$('.calculator_slider-filled_line-period').css('width', filledLine);
		// 	var value = $('.calculator_input-period-cost').val();

		// 	if (value == '') {
		// 		$('.calculator_input-period-cost').val(1);
		// 	}

		// 	changeSumCost();

		// },
		slide: function(e, ui) {
			$('.calculator_input-period-cost').val(ui.value);

			var filledLine = $('.calculator_slider-period .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-period').css('width', filledLine);
			var value = $('.calculator_input-period-cost').val();

			if (value == '') {
				$('.calculator_input-period-cost').val(1);
			}

			changeSumCost();

		}
	});


	$('<div class="calculator_slider-filled_line-period"></div>').appendTo($('.calculator_slider-period'));

	$('.calculator_input-period-cost').on('input',function(e) {

		var value = $(this).val();

		if(value <= 0) {
			$(this).val(1);
		} else if( value == NaN) {
			$(this).val(1);
		}

		setTimeout(function() {

			var filledLine = $('.calculator_slider-period .ui-slider-handle').position().left;
			$('.calculator_slider-filled_line-period').animate({
				'width': filledLine
			}, 100);
				
		}, 80);

		$('.calculator_slider-period').slider( "option", "value", parseInt(value) );
		changeSumCost();
	});
	changeSumCost();
	
});

function navigation_scroll(){
    var offset = $('.section-head').height() || $(window).height() || 500;
    var scroll = $(document).scrollTop();
	if (scroll < 90) {
        $('header')
            .toggleClass('fill-fixed', false)
            .toggleClass('fill-anim', false);
    }
    else if (scroll >= offset) {
        $('header')
            .toggleClass('fill-fixed', true)
            .toggleClass('fill-anim', false);
    }
    else if (scroll < offset - 30) {
        $('header')
            .toggleClass('fill-fixed', false)
            .toggleClass('fill-anim', true);
    }
}
$(document).scroll(function(){
    navigation_scroll();
});

