angular.module('services.broadcast', []).service('broadcastService', ['$rootScope', function ($rootScope) {


    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {


        if (toState.name.indexOf('detailImageContainer') < 0) {

            document.body.scrollTop = document.documentElement.scrollTop = 0;

        }

    });


    this.subscribe = function (event, callback) {

        $rootScope.$on(event, callback);
    };

    this.publish = function (event, para) {

        $rootScope.$emit(event, para)
    };

    this.unsubscribe = function (event) {

        if (Array.isArray(event)) {

            for (var i = 0; i < event.length; i++) {

                $rootScope.$$listeners[event[i]] = [];
            }


        } else {

            $rootScope.$$listeners[event] = [];
        }

    }

}])
