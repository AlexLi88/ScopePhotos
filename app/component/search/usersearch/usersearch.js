export default (usersearch,template)=>{

    usersearch.directive('usersearch',['MediaFactory','$rootScope','$state','$stateParams','toaster','broadcastService','$timeout','$window',function(MediaFactory,$rootScope,$state,$stateParams,toaster,broadcastService,$timeout,$window) {

        return {

            restrict: 'AE',
            scope: false,
            template: template,
            link: function (scope) {


                if($rootScope.userType == 'visitor') $state.go('mainPage');

                scope.userCtr = {

                    pageNo:0,
                    timeStamp:Date.now(),
                    pageSize:50,
                    userArr:null,
                    searchContent:$stateParams.searchContent,
                    showErrorMessage:false

                }


                function _pushDisplayUser(res) {

                    if (scope.userCtr.userArr == null) {

                        scope.userCtr.userArr = res.data.data;
                        if(res.data.data.length == 0){

                            scope.userCtr.showErrorMessage = true;
                        }


                    } else {

                        Array.prototype.push.apply(scope.userCtr.userArr, res.data.data);
                    }

                    if (res.data.data.length >= scope.userCtr.pageSize) {

                        $timeout(function() {
                            scope.updating = false
                        }, 1000);

                    } else {

                        $('loadinganimation').fadeOut();
                    }
                }

                broadcastService.subscribe('scroll:scroll',function(){


                    if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 1000) {

                        if (scope.updating == false) {
                            scope.updating = true;
                            _getUserArr();
                        }
                    }

                })

                scope.$on('$destroy',function(){

                    broadcastService.unsubscribe(['scroll:scroll']);
                })


                function _getUserArr(){

                    MediaFactory.getUsers(scope.userCtr.pageNo ++, scope.userCtr.pageSize, scope.userCtr.timeStamp,scope.userCtr.searchContent).then(function(res){

                        _pushDisplayUser(res)

                    })
                }

                _getUserArr();
            }

        }

    }])

}