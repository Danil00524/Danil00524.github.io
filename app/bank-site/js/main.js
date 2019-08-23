$(function(){


  $('.slider__wrapper').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
  });

  $('.slider__wrapper-news').slick({
    prevArrow: '<button type="button" class="slick-btn__news slick-prev__news"></button>',
    nextArrow: '<button type="button" class="slick-btn__news slick-next__news"></button>',
  });

  $(".menu").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            //забираем идентификатор бока с атрибута href
            var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({scrollTop: top}, 1500);
        });
    

        $('.menu__btn').click(function(){
          $('.menu ul').slideToggle();
        });

});
