export default(template,userManagement)=>{

    userManagement.directive('usermanagement',['UserProfileFactory','$state','$rootScope','$stateParams','MediaFactory','$window','broadcastService',(UserProfileFactory, $state, $rootScope, $stateParams,MediaFactory,$window,broadcastService)=>{

        return{

            template:template,
            link:function(scope){

                scope.userCtr = {

                    user:null,
                    currentView:'photo',
                    userType:null,
                    userId:$stateParams.userId
                }

                scope.formateCount = function(count){


                    if(parseInt(count) >= 1000){

                        count = count/1000 + 'K';
                    }

                    return count;

                }



                scope.userCtr.userType =  scope.userCtr.userId  == $rootScope.userInfo.id ? 'owner':'visitor';

                function _getUser (){


                    if(scope.userCtr.userType == 'owner'){

                         UserProfileFactory.profile().then(function(res){

                             scope.userCtr.user = res.data;
                             $('#user_management_main').fadeIn();
                             if($state.current.name == 'user') scope.toUserPhoto();


                        },function(err){

                             $state.transitionTo('mainPage',{},{reload:true})
                        })

                    }else{

                        MediaFactory.getUser(scope.userCtr.userId).then(function(res){

                            scope.userCtr.user = res.data;
                            $('#user_management_main').fadeIn();
                            if($state.current.name == 'user') scope.toUserPhoto();
                        })



                    }

                }



                scope.followUser = function(user){

                    MediaFactory.followUser(user.id).then(function(res){

                        if(res.data.result  == 'OK'){

                            user.followed = true;
                        }
                    })

                }

                scope.unFollowUser = function(user){

                    MediaFactory.unFollowUser(user.id).then(function(res){

                        if(res.data.result  == 'OK'){

                            user.followed = false;
                        }
                    })
                }

                scope.toUserScope = function(){

                    $state.go('user.scope',{

                    });

                    scope.userCtr.currentView = 'scope';
                }

                scope.toUserFavorite =  function(){

                    $state.go('user.favorite',{

                    });

                    scope.userCtr.currentView = 'favorite';

                }

                scope.toUserFollowing = function(){

                    $state.go('user.following',{

                    });

                    scope.userCtr.currentView = 'following';
                }


                scope.userLogout = function(){

                    localStorage._scopeAccessToken = '';
                    $window.location.href = $window.location.origin;

                }

                scope.toUserFollower = function(){

                    $state.go('user.follower',{

                    });

                    scope.userCtr.currentView = 'follower';
                }



                broadcastService.subscribe('userPhotoManagement::del',function(){


                    scope.userCtr.user.stats.numOfMedia --;

                })

                broadcastService.subscribe('userScopeManagement::del',function(){


                    scope.userCtr.user.stats.numOfTotalEvents --;

                })

                broadcastService.subscribe('userFollowerManagement::follow',function(){

                    if(scope.userCtr.userType == 'owner')
                    scope.userCtr.user.stats.numOfFollowers ++;

                })

                broadcastService.subscribe('userFollowerManagement::unfollow',function(){

                    if(scope.userCtr.userType == 'owner')
                    scope.userCtr.user.stats.numOfFollowers --;

                })

                broadcastService.subscribe('userFollowingManagement::follow',function(){

                    if(scope.userCtr.userType == 'owner')
                    scope.userCtr.user.stats.numOfFollowings ++;

                })

                broadcastService.subscribe('userFollowingManagement::unfollow',function(){


                    if(scope.userCtr.userType == 'owner')
                    scope.userCtr.user.stats.numOfFollowings --;

                })


                scope.toUserPhoto = function(){

                    $state.go('user.photo',{

                    });

                    scope.userCtr.currentView = 'photo';
                }

                scope.switchView = function(view){

                    scope.userCtr.currentView = view;
                }


                scope.$on('$destroy',function(){

                    broadcastService.unsubscribe(['userPhotoManagement::del',
                        'userScopeManagement::del',
                        'userFollowerManagement::follow',
                        'userFollowerManagement::unfollow',
                        'userFollowingManagement::follow',
                        'userFollowingManagement::unfollow'

                    ])

                })




                switch($state.current.name){


                    case 'user.photo':
                        scope.userCtr.currentView = 'photo';
                        break;
                    case 'user.scope':
                        scope.userCtr.currentView = 'scope';
                        break;
                    case 'user.following':
                        scope.userCtr.currentView = 'following';
                        break;
                    case 'user.follower':
                        scope.userCtr.currentView = 'follower';
                        break;
                    case 'user.favorite':
                        scope.userCtr.currentView = 'favorite';
                        break;


                }


                _getUser();

            }


        }
    }])




}

