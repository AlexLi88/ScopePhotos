export default userManagement => {

    require('./userfollowingmanagement.css');
    userManagement.directive('userfollowingmanagement', ['$stateParams', 'MediaFactory', '$state', 'toaster', 'broadcastService', '$timeout', '$window', '$rootScope',
        ($stateParams, MediaFactory, $state, toaster, broadcastService, $timeout, $window, $rootScope)=> {

            return {

                template: require('./userfollowingmanagement.html'),
                link: function (scope, ele, attr) {

                    scope.userFollowingManagementCtr = {

                        pageSize:21,
                        pageNo:0,
                        userId:$stateParams.userId,
                        numOfMedia:$stateParams.numOfMedia,
                        followingArray:[],
                        userType:null,
                        showErrorMessage:false
                    }

                    scope.updating = true;
                    scope.userFollowingManagementCtr.userType =  scope.userFollowingManagementCtr.userId  == $rootScope.userInfo.id ? 'owner':'visitor';



                     scope.getFollowingList = function(){

                            MediaFactory.getFollowing( scope.userFollowingManagementCtr.userId,scope.userFollowingManagementCtr.pageNo ++, scope.userFollowingManagementCtr.pageSize).then(function(res){

                                _pushFollowing(res);
                            })
                    }


                    scope.followUser = function(user){


                        MediaFactory.followUser(user.id).then(function(res){

                                if(res.data.result  == 'OK'){

                                    user.following = true;
                                    broadcastService.publish('userFollowingManagement::follow')
                                }
                        })

                    }

                    scope.unFollowUser = function(user){

                        MediaFactory.unFollowUser(user.id).then(function(res){

                            if(res.data.result  == 'OK'){

                                user.following = false;
                                broadcastService.publish('userFollowingManagement::unfollow')
                            }
                        })
                    }

                    function _pushFollowing(res) {

                        if (scope.userFollowingManagementCtr.followingArray == null) {

                            scope.userFollowingManagementCtr.followingArray = res.data.data;
                            scope.updating = false;
                            if(res.data.data.length == 0){

                                userFollowingManagementCtr.showErrorMessage = true;
                            }

                        } else {

                            Array.prototype.push.apply(scope.userFollowingManagementCtr.followingArray, res.data.data);
                        }

                        if (res.data.data.length >= scope.userFollowingManagementCtr.pageSize) {

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
                                scope.getFollowingList();
                            }
                        }

                    })

                    scope.$on('$destroy',function(){

                        broadcastService.unsubscribe(['scroll:scroll']);
                    })


                    scope.getFollowingList();

                }
            }


        }])

}