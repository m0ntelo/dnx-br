var host = window.location.href;
var url = host + 'wp-admin/admin-ajax.php';

(function () {

  var app = angular.module("app", []);
  // app.factory("SampleInterceptor", ['$q', '$rootScope', SampleInterceptor]);
  // app.controller("WizardController", ['$q', '$http', '$scope', '$rootScope', wizardController]);
  // app.filter('getElementById', getElementByIdFilter);
  // app.directive("loader", ['$rootScope', modalLoader]);
  // app.directive("erro", ['$rootScope', modalErro]);
  // app.directive("msgsucesso", ['$rootScope', msgSucesso]);
  // app.directive("msgerro", ['$rootScope', msgErro]);
  // app.config(AppConfig);

  function getElementByIdFilter() {
    return function (obj, item) {
      for (var f in obj) {
        if (obj.hasOwnProperty(f) && obj[f].Id == item) {
          return obj[f].Nome;
        }
      }
    }
  };

  function msgSucesso($rootScope) {
    return function ($scope, element, attrs) {
      $scope.$on("msg_sucesso_show", function () {
        element.show();
        return setTimeout(function () { element.hide(); }, 1000000);
      });
      return $scope.$on("msg_sucesso_hide", function () {
        return element.hide();
      });
    };
  };

  function msgErro($rootScope) {
    return function ($scope, element, attrs) {
      $scope.$on("msg_erro_show", function () {
        element.show();
        return setTimeout(function () { element.hide(); }, 5000);
      });
      return $scope.$on("msg_erro_hide", function () {
        return element.hide();
      });
    };
  };

  function modalLoader($rootScope) {
    return function ($scope, element, attrs) {
      $scope.$on("loader_show", function () {
        return element.show();
      });
      return $scope.$on("loader_hide", function () {
        return element.hide();
      });
    };
  };

  function modalErro($rootScope) {
    return function ($scope, element, attrs) {
      $scope.$on("erro_show", function () {
        return element.show();
      });
      return $scope.$on("erro_hide", function () {
        return element.hide();
      });
    };
  };

  function SampleInterceptor($q, $rootScope) {

    var numLoadings = 0;

    return {
      request: function (config) {

        numLoadings++;
        $rootScope.$broadcast("loader_show");
        $rootScope.$broadcast("erro_hide");

        return config || $q.when(config);

      },
      response: function (response) {

        if ((--numLoadings) === 0) {
          $rootScope.$broadcast("loader_hide");
        }

        return response || $q.when(response);

      },
      responseError: function (response) {

        $rootScope.$broadcast("loader_hide");
        $rootScope.$broadcast("erro_show");
        $rootScope.MensagemError = `STATUS: ${response.status} MENSAGEM: ${response.data.Message}`;

        return $q.reject(response);

      }
    };
  }

  function AppConfig($httpProvider) {
    $httpProvider.interceptors.push("SampleInterceptor");
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }

  function wizardController($q, $http, $scope, $rootScope) {

    angular.element(document).ready(function () {

      $rootScope.$broadcast("msg_sucesso_hide");
      $rootScope.$broadcast("msg_erro_hide");
      $rootScope.$broadcast("loader_hide");
      $rootScope.$broadcast("erro_hide");

    });

    grecaptcha.ready(function () {
      grecaptcha.execute('6Lc1WdoUAAAAADL3uR7C2El6EnfUEi8ji3Y1uUOA', { action: 'validate_captcha' })
        .then(function (token) {
          document.getElementById('g-recaptcha-response').value = token;
        });
    });

    $scope.isSendEmail = function () {

      var objEmail = {
        "nome": $scope.nome,
        "telefone": $scope.telefone,
        "telefone_op": $scope.telefone_op,
        "email": $scope.email,
        "empresa": $scope.empresa,
        "cnpj": $scope.cnpj,
        "cidade": $scope.cidade
      }

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

          var data = JSON.parse(response.data);

          if (data) {
            $rootScope.$broadcast("msg_sucesso_show");
          } else {
            $rootScope.$broadcast("msg_erro_show");
          }

        })
        .catch(function (response) {
          $rootScope.$broadcast("msg_erro_show");
        });

    }

    $scope.isSubmit = function () {

      $http({
        url: url,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: {
          action: "verify_recaptcha",
          recaptcha: document.getElementById('g-recaptcha-response').value,
        }
      })
        .then(function (response) {

          var success = Object.values(JSON.parse(response.data.body));

          if (success[0] == true) {
            $scope.isSendEmail();
          } else {
            $scope.recaptcha = false;
          }
        })
        .catch(function (response) {
          $scope.recaptcha = false;
        });
    };

    $http({
      url: url,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: { action: "municipio" }
    })
      .then(function (response) {

        var status = response.data.status;
        var body = response.data.body;

        if (status === 200 || status === 201) {
          $scope.Municipio = JSON.parse(body || null);
        } else {
          return $q.reject(response);
        }
      })
      .catch(function (response) {
        console.log(response)
      });
  }

  AppConfig.$inject = ["$httpProvider"];
  SampleInterceptor.$inject = ["$q"];

})();


