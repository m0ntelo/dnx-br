var url = "https://fv2gys3qkl.execute-api.us-east-2.amazonaws.com/submit/contact-us";
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

  $scope.random = Math.round(Math.random() * 550 / 5) * 5 + 5;

  $scope.submit = function () {

    var objEmail = {
      "name": $scope.nome,
      "phone": $scope.telefone,
      "email": $scope.email,
      "desc": $scope.mensagem
    }

    $http({
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: objEmail
    })
    .then(function (response) {
      $scope.notificationSucesso = true;
      setTimeout(function () { $('.msg-sucesso').hide() }, 5000);
    })
    .catch(function (response) {
      $scope.notificationErro = true;
      setTimeout(function () { $('.msg-erro').hide() }, 5000);
    });
  }

});