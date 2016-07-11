angular.module('app.footer',[]).directive('footerscope',function(){

    require('./footer.css');
    require('./footer.scss');
    return {

        restrict:'AE',
        template:require('./footer.html'),
        link:function(scope,element,attr){

            scope.appStrD = require('./res/appStrDark.png');
            scope.gooStrD = require('./res/gooStrDark.png');
            scope.socialIcons = require('./res/social_icons.png');
            scope.download_icon = require('./res/download_icon.png');
        }
    }

})