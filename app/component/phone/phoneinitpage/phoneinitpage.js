angular.module('app.phoneInitPage',[]).directive('phoneinitpage',['$window',function($window){

    require('./phoneinitpage.css');
    return {

        restrict:'AE',
        replace:true,
        template:require('./phoneinitpage.html'),
        link:function(scope){

            scope.logoSrc=require('./res/Scope Logo Transparent.png')
            scope.landingSrc=require('./res/landing.png')
            scope.phoneCtr = {

                phoneType:null,
                phoneUser:false
            }

            _checkIfPhoneUser();


            function _checkIfPhoneUser (){

                var userAgent = $window.navigator.userAgent;
                if(userAgent.indexOf('iPhone') >= 0){

                    scope.phoneCtr.phoneUser = true;
                    scope.phoneCtr.phoneType = 'iPhone';
                }

                else if(userAgent.indexOf('Android') >= 0){

                    scope.phoneCtr.phoneUser = true;
                    scope.phoneCtr.phoneType = 'Android';
                }

            }

            scope.hidePhoneInit = function(){

                $('#phone_init_page_main').fadeOut(function(){

                    scope.phoneCtr.phoneUser = false;
                })
            }
        }
    }

}])