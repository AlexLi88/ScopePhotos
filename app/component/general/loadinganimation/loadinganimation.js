angular.module('app.loadingAnimation',[]).directive('loadinganimation',function(){

    require('./loadinganimation.css');
    return {

        restrict:'AE',
        template:require('./loadinganimation.html'),
        link:function(scope,element,attr){


        }
    }

})