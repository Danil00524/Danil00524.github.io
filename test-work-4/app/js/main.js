$(document).ready(function () {
  $('#datepicker,  #datepicker2').datepicker({
    minDate: new Date(),
  })
  $('#datepicker , #datepicker2').data('datepicker')
})