angular.module('app.download',[]).directive('download',['broadcastService','$window',function(broadcastService,$window){


    return{

        restrict:'AE',
        template: require('./download.html'),
        replace:true,
        link:function(scope,attr,ele){


            scope.$on('$stateChangeSuccess',function(){

                $('#website_header').hide();
                $('footerscope').hide();
            })

            if(navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0 || navigator.userAgent.indexOf('ipod') >= 0 ){

                $window.location = "https://itunes.apple.com/app/id911111086";
            }

            else if(navigator.userAgent.indexOf('Android') >= 0 ){

                $window.location = "https://play.google.com/store/apps/details?id=com.scopemedia.android";

            }else{

                $window.location = "https://itunes.apple.com/app/id911111086";
            }


        }
    }



}])