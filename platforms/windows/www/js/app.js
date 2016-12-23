// Ionic Starter App

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8_vBechjwdzKcsgwIuJRs_-PeREBh7Ps",
    authDomain: "etienne-chat-secret.firebaseapp.com",
    databaseURL: "https://etienne-chat-secret.firebaseio.com",
    storageBucket: "etienne-chat-secret.appspot.com",
    messagingSenderId: "550170114154"
};
firebase.initializeApp(config);

var database = firebase.database();
// angular.module is a global place for creating, registering and retrieving Angular modules

angular.module('app', [
    'ionic',
    'ngMessages',
    'firebase',
    'app.routes',
    'auth.controllers',
    'chat.controllers',
    'app.services'
])

  .run(function ($ionicPlatform, $rootScope, $state, $cordovaGeolocation, geoLocation) {
      $ionicPlatform.ready(function () {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

          }
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
          }

          $cordovaGeolocation
            .getCurrentPosition()
            .then(function (position) {
                geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
            }, function (err) {
                // you need to enhance that point
                $ionicPopup.alert({
                    title: 'Ooops...',
                    template: err.message
                });

                geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude)
            });

          // begin a watch
          var watch = $cordovaGeolocation.watchPosition({
              frequency: 1000,
              timeout: 3000,
              enableHighAccuracy: false
          }).then(function () {
          }, function (err) {
              // you need to enhance that point
              geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude);
          }, function (position) {
              geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
              // broadcast this event on the rootScope
              $rootScope.$broadcast('location:change', geoLocation.getGeolocation());
          }
          );
      });


      });
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
          if (error === 'AUTH_REQUIRED') {
              $state.go('signIn');
          }
      });
  });
