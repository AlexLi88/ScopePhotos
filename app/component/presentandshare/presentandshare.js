export default(presentAndShare,template,googlePlaySrc,appStoreSrc,scopeLogo)=> {

    presentAndShare.directive('presentandshare', ['$stateParams', '$q', '$rootScope', 'MediaFactory', '$timeout', 'broadcastService', '$window', '$state', '$interval','imageListView_fac', function ($stateParams, $q, $rootScope, MediaFactory, $timeout, broadcastService, $window, $state, $interval,imageListView_fac) {

        return {

            scope: {},
            template: template,
            restrict: 'AE',
            replace: 'true',
            link: function (scope) {

                MediaFactory.getScopeGeneral($stateParams.scopeId, 0, 1, Date.now(), $rootScope.userType).then((res)=>{

                    scope.curScope = res.data.scope;
                })

                $state.go('presentandshare.layout_basic');

            }
        }

    }])

}