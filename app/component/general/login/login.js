angular.module('app.login',[]).directive('login',['UserRegisterFactory','UserProfileFactory','broadcastService','$http','$rootScope','$state','toaster','$stateParams','authService',function(UserRegisterFactory,UserProfileFactory,broadcastService,$http,$rootScope,$state,toaster,$stateParams,authService){

    require('./login.css');

    return{

        scope:false,
        restrict:'AE',
        template: require('./login.html'),
        link:function(scope){


            scope.loginCtr = {

                selected:'login',
                userType:'visitor',
                user:null,
                userLogin:false,
                userLogining:false,
                bg:require('./res/background.jpg')
            }

            
            scope.showLog = function(){

                scope.loginCtr.selected = 'login';
                $('#content #register').fadeOut(function(){

                    $('#content #login').fadeIn().css("display","inline-block");;
                });
            }

            scope.showReg = function(){

                scope.loginCtr.selected = 'register';
                $('#content #login').fadeOut(function(){

                    $('#content #register').fadeIn().css("display","inline-block");
                });
            }

            function _init(){

                if($stateParams.init != null){

                    scope.loginCtr.selected = $stateParams.init;
                    $('#content #' + scope.loginCtr.selected ).fadeIn().css("display","inline-block");


                }else{

                    scope.loginCtr.selected = 'login';
                    $('#content #login').fadeIn().css("display","inline-block");
                }

            }

            _init();

            scope.login = function(userEmail,userPassword){
                scope.loginCtr.loginError = false;
                scope.loginCtr.userLogining = true;
                UserRegisterFactory.loginScope(userEmail,userPassword).then(function(res){

                    if(res.data){
                        localStorage._scopeAccessToken = res.data.token_type + ' ' + res.data.access_token;
                        $http.defaults.headers.common.Authorization = localStorage._scopeAccessToken;
                        scope.loginCtr.userLogin = true;
                        scope.getUser();

                    }
                },function(err){

                    scope.loginCtr.userLogining = false;
                    scope.loginCtr.loginError = true;

                })

            }

            scope.register = function(newUserName,newUserEmail,newUserPassword,newUserConfirmPassword){

                    scope.loginCtr.registerPasswordLengthError = scope.loginCtr.registerConfirmPasswordError = scope.loginCtr.registerEmailUsedError = false;
                    if(newUserPassword == undefined){

                        scope.loginCtr.registerPasswordLengthError = true;

                    }else if(newUserPassword != newUserConfirmPassword){

                        scope.loginCtr.registerConfirmPasswordError = true;

                    }else{

                        scope.loginCtr.registering = true;
                        UserRegisterFactory.registerScope(newUserName,newUserEmail,newUserPassword).then(function(res){

                            if(res.data.result == 'EMAIL_USED'){

                                scope.loginCtr.registerEmailUsedError = true;
                                scope.loginCtr.registering = false;

                            }else if(res.data.result == 'OK'){

                                localStorage._scopeAccessToken = res.data.token.token_type + ' ' + res.data.token.access_token;
                                $http.defaults.headers.common.Authorization = localStorage._scopeAccessToken;
                                scope.loginCtr.userLogin = true;
                                scope.getUser();

                            }
                        },function(err){

                            console.log('err',err);
                        })

                    }


            }

            scope.getUser = function(){

                UserProfileFactory.profile().then(function(res){

                    if(res.data){
                        scope.loginCtr.user = res.data;
                        $rootScope.userInfo = scope.loginCtr.user;
                        $rootScope.userType = scope.loginCtr.userType = 'user';
                        broadcastService.publish('login::userInfo',{type:'user',info:scope.loginCtr.user});


                        if(scope.loginCtr.userLogin){


                            if(!$stateParams.ref){

                                $state.transitionTo('user',{userId:scope.loginCtr.user.id},{});

                            }else{

                                switch($stateParams.ref.state){

                                    case'payment':

                                        console.log($stateParams)
                                        $state.go('payment.proceed',{item:$stateParams.ref.item});
                                        break;

                                }
                            }

                        }




                    }


                },function(err){

                    $http.defaults.headers.common.Authorization = authService._authorizationToken;
                    $rootScope.userType = scope.loginCtr.userType = 'visitor';
                    broadcastService.publish('login::userInfo',{type:'visitor'});
                    localStorage._scopeAccessToken = '';
                    scope.user = null;
                })

            }

            if (localStorage._scopeAccessToken != null && localStorage._scopeAccessToken.length != 0) {

                $http.defaults.headers.common.Authorization = localStorage._scopeAccessToken;
                scope.getUser();

            }else{
                $rootScope.userType = scope.loginCtr.userType =  'visitor';
                broadcastService.publish('login::userInfo',{type:'visitor'});
            }

        }
    }



}])