var url = "aquiaurl";
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

  $scope.formulario = false;

  $scope.submit = function () {

    var objEmail = {
      "nome": $scope.nome,
      "email": $scope.email,
      "telefone": $scope.telefone,
      "mensagem": $scope.mensagem
    }

    console.log("Dados email", objEmail);

    $http({
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      params: {
        action: "mail",
        email: objEmail,
      }
    })
    .then(function (response) {

      console.log("sucesso", response);

      // var data = JSON.parse(response.data);

      // if (data) {
      //   $rootScope.$broadcast("msg_sucesso_show");
      // } else {
      //   $rootScope.$broadcast("msg_erro_show");
      // }

    })
    .catch(function (response) {
      // $rootScope.$broadcast("msg_erro_show");
      console.log("erro", response);
    });
  }

});