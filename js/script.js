
function terms_init(){
	$('.note-terms [type="checkbox"]').on('change', function(e){
		var $this = $(this);
		var checked = $this.prop('checked');
		var $submit = $this.parents('form').find('[type="submit"]');
		if(checked){
			$submit.prop('disabled', false);
			return true;
		}
		if(!confirm('Без согласия на обработку данных мы не можем принять заявку. Продолжить?')){
			$this.prop('checked', true);
		}
		else{
			$submit.prop('disabled', true);
		}
	});
}
$(document).ready(function(){
	terms_init();
});


$(document).ready(function(){
	tel_init();
	scrollto_init();
	modals_init();
	mobile_init();
	navigation_scroll();
	animation_init();

	$('.ka-container-viewport_desktop').hide();
});

function inScreen(s){
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var currentEls = $(s);
    var result = [];
    currentEls.each(function(){
        var el = $(this);
        var offset = el.offset();
        if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
            result.push(this);
    });
    return $(result);
}

function mobile_init(){
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(!isMobile){
    		$('.navbar-collapse a').click(function(){
					$('.navbar-collapse').collapse('hide');
				});
        $('a[href^="tel:"]').click(function(){
            var $this = $(this);
            $('#modal-callback').modal('show');
            return false;
        });
    }
    setTimeout(
        function(){
            $('a[href^="tel:"].calltracking_phone').each(function(){
                var $this = $(this);
                $this.attr('href', 'tel:' + $this.text().trim());
            });
        },
        2000
    );
}

function scrollto_init(){
	$('a[href^="#"]:not([data-toggle], [data-slide], a[href^="#modal-"])').click(function(){
		var href = $(this).attr('href');
		$.scrollTo(href, 1500, {offset: -40});
		return false;
	});
}

function placeholder_init(){
	$('input, textarea').placeholder();
}



function navigation_scroll(){
    var offset = $('.section-head').height() || $(window).height() || 500;
    var scroll = $(document).scrollTop();
	if (scroll < 90) {
        $('.section-top')
            .toggleClass('fill-fixed', false)
            .toggleClass('fill-anim', false);
    }
    else if (scroll >= offset) {
        $('.section-top')
            .toggleClass('fill-fixed', true)
            .toggleClass('fill-anim', false);
    }
    else if (scroll < offset - 30) {
        $('.section-top')
            .toggleClass('fill-fixed', false)
            .toggleClass('fill-anim', true);
    }
}
$(document).scroll(function(){
    navigation_scroll();
});


function animation_init(){
	$('[anim], section.anim').each(function(){
		var $this = $(this);
		var anim = $this.attr('anim') || 'fade';
		if(anim != ''){
			$this.addClass("hidden_object");
			$this.viewportChecker({
				classToAdd: 'visible_object animated ' + anim + 'In',
				offset: 100
			});
		}
	});
	return true;
}



function modals_init(){
	$('a[href^="#modal-"]').each(function(){
		var $this = $(this);
		if(typeof($this.attr('data-toggle')) == 'undefined'){
			$this.attr('data-toggle', 'modal');
		}
	});
	$('.modal').on({
		'shown.bs.modal': function(e){
			var $t = $(this);
			var id = $t.attr('id') || '';
			if(id != ''){
				window.location.hash = id;
			}
		},
		'show.bs.modal': function(e){
			var $t = $(this);
			var id = $t.attr('id') || 'modal-unknown';
			//goalPing('modals', id);
		},
		'hide.bs.modal': function(e){
			window.location.hash = '/';
		}
	});
	$(document).ready(function(){
		var id = window.location.hash.substr(1) || '';
		if(id != ''){
			try{
				$('#' + id + '.modal').modal('show');
			}
			catch(er){}
		}
	});
	return true;
}

function tel_init(){
	if(!$.fn.mask){
		return false;
	}
	$('input[type="tel"], input.tel').mask("+7 (999) 999-99-99");
	return true;
}