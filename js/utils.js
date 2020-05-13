$(document).ready(function () {
  
  if ($("#wpadminbar").length) { $(".menu").css({ top: 32 }) }
  
  $(".partners-list").slick({
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 3
  });

  $(".contact-carrosel-single").slick();

  $("#cnpj").mask("99.999.999/9999-99");
  $("#telefone").mask("(99) 999999999");
  $("#telefone_op").mask("(99) 999999999");

});
