$(document).ready(function () {
  
  if ($("#wpadminbar").length) { $(".menu").css({ top: 32 }) }
  
  $(".partners-list").slick({
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1500 
  });

  $(".contact-carrosel-single").slick();
  $("#telefone").mask("(99) 999999999");

});
