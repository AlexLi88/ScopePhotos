angular.module('app.privacyPolicy',[]).directive('policy',[function(){

    require('./policy.css');
    require('./policy.scss');
    return{

        restrict:'AE',
        scope:true,
        template:require('./policy.html'),
        link:function(scope){

        }
    }
}]);
