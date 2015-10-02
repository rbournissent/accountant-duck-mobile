angular.module('AccountantDuck')
  .service('API', function ($http) {

    function request (method, endpoint, data) {
      return $http({
        method: method,
        url: 'http://accountant-duck.herokuapp.com/' + endpoint,
        data: data
      });
    }

    return {
      get: function (endpoint) {
        return request('GET', endpoint, null);
      },
      post: function (endpoint, data) {
        return request('POST', endpoint, data);
      },
      put: function (endpoint, data) {
        return request('PUT', endpoint, data);
      },
      delete: function (endpoint) {
        return request('DELETE', endpoint, null);
      }
    };

  });