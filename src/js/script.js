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
            sliderViewport = $('.benefits__viewport'),
            sliderWrapper = $('.benefits__stroke'),
            slides = $('.benefits__item'),
            btns = $('.benefits__btn'),
            slideWidth = slides[0].offsetWidth,
            slideIndex = 0, //Индекс слайда
            posInit = 0, //Постоянная переменная первого тапа
            posX1 = 0,
            posX2 = 0,
            posFinal = 0,
            posThreshold = slideWidth / 2; //Граница после которой будет перелистывание

        //Функция применяет изменения к wrapper
        const slide = () => {
            if (slideIndex <= 0) {
                slideIndex = 0;
            } else if (slideIndex >= slides.length) {
                slideIndex = slides.length - 1;
            }
            sliderWrapper.css({
                'transition': 'transform .5s'
            });
            sliderWrapper.css({
                'transform': `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`
            });
            //Меняем активные лейблы по индексу
            $(btns).removeClass('benefits__btn-active').eq(slideIndex).addClass('benefits__btn-active');
        }

        //Action для touchstart
        const swipeStart = (e) => {
            //Получаем информацию о тапе
            let evt = e.touches[0];

            posInit = posX1 = evt.clientX;

            sliderWrapper.css({
                'transition': ''
            });
        }

        //action для touchmove
        const swipeAction = (e) => {
            //Получаем информацию о тапе
            let evt = e.touches[0],
                //Получаем стили transform для регулярки
                style = sliderWrapper.position().left,
                //Готовое значение из регулярки присваиваем в transform
                transform = +style;

            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;

            sliderWrapper.css({
                'transform': `translate3d(${transform - posX2}px, 0px, 0px)`
            });
        }

        //action для touchend
        const swipeEnd = () => {
            posFinal = posInit - posX1;

            //Логика для перелистывания
            //posThreshold - граничное значения для перелистывания 1/2 от ширины слайда
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

        slider.on('touchstart', swipeStart);
        slider.on('touchmove', swipeAction);
        slider.on('touchend', swipeEnd);

        sliderWrapper.css({
            'transform': 'translate3d(0px, 0px, 0px)'
        });
    }
    slider();
});