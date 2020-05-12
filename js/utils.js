$(document).ready(function () {
  
  if ($("#wpadminbar").length) { $(".menu").css({ top: 32 }) }
  
  $("#cnpj").mask("99.999.999/9999-99");
  $("#telefone").mask("(99) 999999999");
  $("#telefone_op").mask("(99) 999999999");

});
