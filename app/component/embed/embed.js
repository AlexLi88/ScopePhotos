angular.module('app.embed',[]).directive('embed',['$window','MediaFactory','$stateParams','localStorageFac',function($window,MediaFactory,$stateParams,localStorageFac){

    require('./embed.scss');
    return {

        restrict:'AE',
        replace:true,
        template:require('./embed.html'),
        link:function(scope){

        }
    }

}])