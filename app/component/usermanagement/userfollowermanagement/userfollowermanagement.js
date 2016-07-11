export default userManagement => {

    require('./userfollowermanagement.css');
    userManagement.directive('userfollowermanagement', ['$stateParams', 'MediaFactory', '$state', 'toaster', 'broadcastService', '$timeout', '$window', '$rootScope',
        ($stateParams, MediaFactory, $state, toaster, broadcastService, $timeout, $window, $rootScope)=> {

            return {

                template: require('./userfollowermanagement.html'),
                link: function (scope, ele, attr) {

                    scope.userFollowerManagementCtr = {

                        pageSize:21,
                        pageNo:0,
                        userId:$stateParams.userId,
                        numOfMedia:$stateParams.numOfMedia,
                        followerArray:[],
                        userType:null,
                        showErrorMessage:false
                    }

                    scope.userFollowerManagementCtr.userType =  scope.userFollowerManagementCtr.userId  == $rootScope.userInfo.id ? 'owner':'visitor';



                    scope.getFollowerList = function(){

                        MediaFactory.getFollower( scope.userFollowerManagementCtr.userId,scope.userFollowerManagementCtr.pageNo ++, scope.userFollowerManagementCtr.pageSize).then(function(res){

                            _pushFollowing(res);
                        })
                    }

                    scope.followUser = function(user){


                        MediaFactory.followUser(user.id).then(function(res){

                            if(res.data.result  == 'OK'){

                                user.following = true;
                                broadcastService.publish('userFollowerManagement::follow')
                            }
                        })

                    }

                    scope.unFollowUser = function(user){

                        MediaFactory.unFollowUser(user.id).then(function(res){

                            if(res.data.result  == 'OK'){

                                user.following = false;
                                broadcastService.publish('userFollowerManagement::unfollow')
                            }
                        })
                    }

                    function _pushFollowing(res) {

                        if (scope.userFollowerManagementCtr.followerArray == null) {

                            scope.userFollowerManagementCtr.followerArray = res.data.data;
                            if(res.data.data.length == 0){

                                scope.userFollowerManagementCtr.showErrorMessage = ture;
                            }

                        } else {

                            Array.prototype.push.apply(scope.userFollowerManagementCtr.followerArray, res.data.data);
                        }

                        if (res.data.data.length >= scope.userFollowerManagementCtr.pageSize) {

                            $timeout(function() {
                                scope.updating = false
                            }, 1000);

                        } else {

                            $('loadinganimation').fadeOut();
                        }


                    }


                    broadcastService.subscribe('scroll:scroll',function(){

                        if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 500) {

                            if (scope.updating == false) {
                                scope.updating = true;
                                scope.getFollowerList();
                            }
                        }

                    })


                    scope.getFollowerList();

                }
            }


        }])

}