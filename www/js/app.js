// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('AccountantDuck', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/',
      templateUrl: 'templates/app.html',
      controller: 'AppCtrl'
    });

    $urlRouterProvider.otherwise('/login');
})

.controller('AppCtrl', function ($scope, $ionicModal, $filter, API) {

  /*Disabled temporarily
  API.get('movements')
    .success(function (movements) {
      $scope.movements = movements;
  */
      //FAKE DATA (TEMP)
      $scope.movements = [
        {
          "created_at": "2015-09-01",
          "description": "Saldo inicial septiembre",
          "price": "1400.5",
          "type": "Deposit",
          "user_id": "1",
          "id": "1"
        },
        {
          "created_at": "2015-09-02",
          "description": "Miriam (supermercado)",
          "price": "400",
          "type": "Extraction",
          "user_id": "1",
          "id": "2"
        },
        {
          "created_at": "2015-09-03",
          "description": "Librería",
          "price": "80",
          "type": "Extraction",
          "user_id": "1",
          "id": "3"
        },
        {
          "created_at": "2015-09-04",
          "description": "Pizzas, fugazas y gaseosas",
          "price": "450",
          "type": "Extraction",
          "user_id": "1",
          "id": "5"
        },
        {
          "created_at": "2015-09-07",
          "description": "Aguared",
          "price": "275",
          "type": "Extraction",
          "user_id": "1",
          "id": "7"
        },
        {
          "created_at": "2015-09-07",
          "description": "Frutas",
          "price": "83",
          "type": "Extraction",
          "user_id": "1",
          "id": "8"
        },
        {
          "created_at": "2015-09-29",
          "description": "Pilas AA x 4",
          "price": "48",
          "type": "Extraction",
          "user_id": "1",
          "id": "10"
        }
      ];
      calculateBalance();
    //});


  $scope.addMovement = function(m, form) {
    if(form.$valid) {
      var mov = {
        description: m.description,
        type: m.price < 0 ? 'Extraction': 'Deposit',
        price: m.price < 0 ? m.price*-1 : m.price,
        created_at: $filter('date')(m.date, 'yyyy-MM-dd')
      };
      /* Disabled temporarily
      API.post('movements', mov)
        .success(function (id) {
          mov.id = id;
      */
          $scope.closeModal();
          $scope.movements.push(mov);
          $scope.movements = $filter('orderBy')($scope.movements, 'created_at');
          calculateBalance();
        //});
    }
  }

  $scope.removeMovement = function (index) {
    var response = confirm('Are you sure you want to delete this movement?');

    if(response) {
      $scope.movements.splice(index, 1);
      calculateBalance();
    }
  };

  function calculateBalance () {
    $scope.balance = 0;
    $scope.movements.forEach(function (m) {
      if(m.type === 'Deposit') {
        $scope.balance += parseFloat(m.price);
      }
      else {
        $scope.balance -= parseFloat(m.price);
      }
    });
  }

  $ionicModal.fromTemplateUrl('templates/add_movement.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
    $scope.m = {};
    $scope.submitted = false;
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
});;