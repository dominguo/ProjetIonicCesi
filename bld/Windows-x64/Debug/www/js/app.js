// Ionic Starter App
var firebaseUrl = "https://sizzling-inferno-3944.firebaseio.com";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8_vBechjwdzKcsgwIuJRs_-PeREBh7Ps",
    authDomain: "etienne-chat-secret.firebaseapp.com",
    databaseURL: "https://etienne-chat-secret.firebaseio.com",
    storageBucket: "etienne-chat-secret.appspot.com",
    messagingSenderId: "550170114154"
};
firebase.initializeApp(config);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('chat', ['ionic', 'chat.controllers','firebase', 'chat.services'])

.run(function($ionicPlatform, $rootScope,$location, Auth, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
    $rootScope.firebaseUrl = config.databaseURL;
    $rootScope.displayName = null;

    Auth.$onAuth(function (authData) {
        if (authData) {
            console.log("Logged in as:", authData.uid);
        } else {
            console.log("Logged out");
            $ionicLoading.hide();
            $location.path('/login');
        }
    });

    $rootScope.logout = function () {
        console.log("Logging out from the app");
        $ionicLoading.show({
            template: 'Logging Out...'
        });
        Auth.$unauth();
    }
      
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {


        console.log("Chargement config");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      .state('login', {
          url: "/login",
          templateUrl: "login.html",
          controller: 'LoginCtrl',
          resolve: {
              // controller will not be loaded until $waitForAuth resolves
              // Auth refers to our $firebaseAuth wrapper in the example above
              "currentAuth": ["Auth",
                  function (Auth) {
                      // $waitForAuth returns a promise so the resolve waits for it to complete
                      return Auth.$waitForAuth();
                  }]
          }
      })

      // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
