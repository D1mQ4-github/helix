$(document).ready(function() {
    $('.header__hamburger').on('click', function() {
        $('.header__hamburger').toggleClass('header__hamburger-active');
        $('.nav__list').toggleClass('nav__list-active');
        $(document.body).toggleClass('no-scroll');
    });

    $('.benefits').each(function() {
        const tab = $(this);
        tab.find('.benefits__tab').not(':first').removeClass('benefits__tab-active');
        tab.find('.benefits__tab').click(function() {
            tab.find('.benefits__tab').removeClass('benefits__tab-active').eq($(this).index()).addClass('benefits__tab-active');
            tab.find('.benefits__item').removeClass('benefits__item-active').eq($(this).index()).addClass('benefits__item-active');
        });
    });

    $('.advantages__cart').each(function() {
        $('.advantages__descr').not(':first').slideUp();
        $(this).click(function() {
            $('.advantages__btn').removeClass('advantages__btn-active').eq($(this).index()).addClass('advantages__btn-active');

            $('.advantages__descr').slideUp().eq($(this).index()).slideDown();

            $('.advantages__img-xs').removeClass('advantages__img-xs__active').eq($(this).index()).addClass('advantages__img-xs__active');

            $('.advantages__media .advantages__img').removeClass('advantages__img-active').eq($(this).index()).addClass('advantages__img-active');
        });
    });


    const slider = () => {
        let slider = $('.benefits__wrapper'),
            sliderList = $('.benefits__viewport'),
            sliderTrack = $('.benefits__stroke'),
            slides = $('.benefits__item'),
            btns = $('.benefits__btn'),
            slideWidth = slides[0].offsetWidth,
            slideIndex = 0,
            posInit = 0,
            posX1 = 0,
            posX2 = 0,
            posFinal = 0,
            posThreshold = slides[0].offsetWidth * 0.35;
        getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

            swipeStart = function() {
                let evt = getEvent();

                posInit = posX1 = evt.clientX;

                $(document).on('touchmove', swipeAction);
                $(document).on('touchend', swipeEnd);
                $(document).on('mousemove', swipeAction);
                $(document).on('mouseup', swipeEnd);
                sliderList.removeClass('grab');
                sliderList.addClass('grabbing');
            },
            swipeAction = function() {
                let evt = getEvent(),
                    style = sliderTrack.position().left,
                    transform = +style;

                posX2 = posX1 - evt.clientX;
                posX1 = evt.clientX;

                sliderTrack.css({
                    'transform': `translate3d(${transform - posX2}px, 0px, 0px)`
                });
            },
            slide = function() {
                if (slideIndex <= 0) {
                    slideIndex = 0;
                } else if (slideIndex >= slides.length) {
                    slideIndex = (slides.length - 1);
                }
                sliderTrack.css({
                    'transition': 'transform .5s'
                });
                sliderTrack.css({
                    'transform': `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`
                });
                $(btns).removeClass('benefits__btn-active').eq(slideIndex).addClass('benefits__btn-active');
            },
            swipeEnd = function() {
                posFinal = posInit - posX1;

                $(document).off('touchmove', swipeAction);
                $(document).off('mousemove', swipeAction);
                $(document).off('touchend', swipeEnd);
                $(document).off('mouseup', swipeEnd);
                sliderList.addClass('grab');
                sliderList.removeClass('grabbing');

                if (Math.abs(posFinal) > posThreshold) {
                    if (posInit < posX1) {
                        slideIndex--;
                    } else if (posInit > posX1) {
                        slideIndex++;
                    }
                }

                if (posInit !== posX1) {
                    slide();
                }

            };

        sliderTrack.css({
            'transform': 'translate3d(0px, 0px, 0px)'
        });
        sliderList.addClass('grab');

        slider.on('touchstart', swipeStart);
        slider.on('mousedown', swipeStart);
    }
    slider();
});