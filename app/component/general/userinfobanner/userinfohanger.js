angular.module('app.userInfoHanger',[]).directive('userinfohanger',['broadcastService','$rootScope','$state',(broadcastService,$rootScope,$state)=>{


        require('./userinfohanger.css');
    return{

        restrict:'AE',
        template:require('./userinfohanger.html'),
        link:function(scope){

            scope.userCtr = {
                
                user:null,
                showHanger:true,
                userType:null
            }

            scope.logini = require('./res/login.png');

            broadcastService.subscribe('login::userInfo',function(event,para){

                if(para.type == 'visitor'){

                    scope.userCtr.user = null;
                    scope.userCtr.userType ='visitor';

                }else{

                    scope.userCtr.user = para.info;
                    scope.userCtr.userType ='user';
                    scope.userCtr.showHanger = true;
                }

            })

            scope.toUser = function(){
                $state.transitionTo('user.photo',{userId:scope.userCtr.user.id},{reload:true});
            }

            scope.LogOrReg = function(act){


                $state.transitionTo('login',{init:act});
            }

            scope.showSideBarLogin = function(){

                $('#login_side_bar').sidebar('toggle');

            }




            scope.showSideBarRegister = function(){



            }

            if($rootScope.userType != null){

                if($rootScope.userType == 'visitor'){

                    scope.userCtr.user = null;
                    scope.userCtr.userType = 'visitor';
                }
            }

        }
    }













}])