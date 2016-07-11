angular.module('app.banner',[]).directive('banner',['$window',function($window){

    require('./banner.css');
    return {

        restrict:'AE',
        replace:true,
        template:require('./banner.html'),
        link:function(scope) {

            scope.bannrtCtr = {

                phoneType:null,
                phoneUser:false,
                showBanner:localStorage.showBanner,
                scopeLogo:require('./res/scopeLogo.png')
            }

            scope.hideBanner = function(){

                $('#banner_main').fadeOut();
                localStorage.showBanner = false;
            }

            scope.downloadApp = function(){

                if(navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0 || navigator.userAgent.indexOf('ipod') >= 0 ){

                    $window.location = "https://itunes.apple.com/app/id911111086";
                }

                else if(navigator.userAgent.indexOf('Android') >= 0 ){

                    $window.location = "https://play.google.com/store/apps/details?id=com.scopemedia.android";

                }else{

                    $window.location = "https://itunes.apple.com/app/id911111086";
                }

            }

            _checkIfPhoneUser();


            function _checkIfPhoneUser (){

                if(scope.bannrtCtr.showBanner == null || scope.bannrtCtr.showBanner != 'false'){


                var userAgent = $window.navigator.userAgent;

                if(userAgent.indexOf('iPhone') >= 0){

                    scope.bannrtCtr.phoneUser = true;
                    scope.bannrtCtr.phoneType = 'iPhone';
                }

                else if(userAgent.indexOf('Android') >= 0){

                    scope.bannrtCtr.phoneUser = true;
                    scope.bannrtCtr.phoneType = 'Android';
                }

                else if(userAgent.indexOf('Window') >= 0){

                    scope.bannrtCtr.phoneUser = true;
                }

                }

            }

        }
    }

}])