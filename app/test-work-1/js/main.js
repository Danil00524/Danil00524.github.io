$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});

$('.dropdown-menu li').click(function () {
var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
msg = '<span class="msg">Hidden input value: ';
$('.msg').html(msg + input + '</span>');
}); 

$('.add-project__button-cancel').click(function() {
  $('.add-project__button-cancel').css({
      'background-color': '#112a42',
      'color': '#fff',
      'border': '2px solid #112a42',
  });
});

$('.add-project__button-add').click(function() {
  $('.add-project__button-add').css({
      'background-color': '#c1c1be',
      'color': '#fff',
  });
});