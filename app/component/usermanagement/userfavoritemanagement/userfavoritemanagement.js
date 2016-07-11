export default userManagement => {

    require('./userfavoritemanagement.css');
    userManagement.directive('userfavoritemanagement', ['$stateParams', 'MediaFactory', '$state', 'toaster', 'broadcastService', '$timeout', '$window', '$rootScope',
        ($stateParams, MediaFactory, $state, toaster, broadcastService, $timeout, $window, $rootScope)=> {

            return {

                template: require('./userfavoritemanagement.html'),
                link: function (scope, ele, attr) {

                    scope.userFavoriteCtr = {

                        userId:$stateParams.userId,
                        pageSize:20,
                        pageNo:0,
                        favArr:[],
                        timeStamp : Date.now(),
                        showErrorMessage:false
                    }


                    scope.getScopeList = function(){

                        MediaFactory.getUserFavorite(scope.userFavoriteCtr.userId,scope.userFavoriteCtr.pageNo,scope.userFavoriteCtr.pageSize).then(function(res){

                            _pushDisplayScope(res);

                        })
                    }

                    function _pushDisplayScope(res){

                        if (scope.userFavoriteCtr.scopeArr == null) {

                            if(res.data.data.length == 0){

                                scope.userFavoriteCtr.showErrorMessage = true;
                            }
                            scope.userFavoriteCtr.favArr = res.data.data;

                        } else {

                            Array.prototype.push.apply(scope.userFavoriteCtr.favArr, res.data.data);
                        }

                        if (res.data.data.length >= scope.userFavoriteCtr.pageSize) {

                            $timeout(function() {
                                scope.updating = false
                            }, 1000);

                        } else {

                            $('loadinganimation').fadeOut();

                        }

                    }


                    scope.getScopeList();
                }
            }
        }
    ])
}