$(document).ready(function(){
	$('.carousel__inner').slick({
		infinite: true,
		speed: 1200,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/prev.svg"></button>',
		nextArrow:'<button type="button" class="slick-next"><img src="img/next.svg"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
				  dots: true,
				  arrows: false
				}
			}
		]
	});
	/* код для переключения табов */
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	/* код для нажатия на ссылку и смены контента */
	$('.catalog-item__link').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});
	/* для нажатия на ссылку назад и возрата контента первого */
	$('.catalog-item__back').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});
	   /*  2-вариант подключения ссылки
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back'); */

	/* модальные окна далее */
	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	/* $('.button_mini').on('click', function () {
		$('.overlay, #order').fadeIn('slow');
	}); */
	/* для того чтобы в модальных текстах менялся заголовок заказа */
	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

		/* валидация для input */
	/* $('#consultation-form').validate();
	$('#consultation form').validate({
		rules: {
			name: {
				required: true,
      			minlength: 2
			},
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Пожалуйста, введите своё имя",
      			minlength: jQuery.validator.format("Введите минимум {0} символа!")
    		},
			phone: "Пожалуйста, введите свой номер телефона",
			email: {
			  required: "Пожалуйста, введите свою почту",
			  email: "Неправильно введен адрес почты"
			}
		  }
	});
	$('#order form').validate(); */

	function valideForms (form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					  minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					  minlength: jQuery.validator.format("Введите минимум {0} символа!")
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');
	
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	
	$('form').submit(function(e) {
        e.preventDefault();
		/* здесь ниже функция валидатор, чтобы не отправлялись пустые формы. */
	if (!$(this).valid()) {
		return;
	}
	/* Если наша форма не прошла валидацию, то она дальше не идёт */
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});