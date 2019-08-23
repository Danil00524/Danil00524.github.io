$(document).ready(function () {
  $('.slider__items').slick({
    prevArrow: '<button type="button" class="slick-prev-a slick-btn-a"></button>',
    nextArrow: '<button type="button" class="slick-next-a slick-btn-a"></button>',
    appendArrows: ".slider-btn_item",
    dots: true,
  });
});

$('.partners__company').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    }
  ]
});

$(".menu, .footer").on("click", "a", function (event) {
  event.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({ scrollTop: top }, 1500);
});

$('.checkbox2').click(function () {
  $('.menu ul').slideToggle();
});


// Close the menu after click (if need)
// $('.menu ul').on("click", function(){
//   if($('.checkbox2').prop('checked')){
//   $('.menu ul').slideToggle();
//   $('.checkbox2').prop('checked', false);
//   }
// })