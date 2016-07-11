angular.module('app.errorMessage',[]).directive('errormessage',['broadcastService',function(broadcastService){

    require('./errormessage.css');

    return{

        restrict:'AE',
        template: require('./errormessage.html'),
        replace:true,
        link:function(scope,attr,ele){

            scope.errorCtr = {

                searchContent:null,
                errorMsg:{

                    noimage:'Sorry there is no image available, please try another search.',
                    nouserimage:'Sorry the user not yet has any images.',
                    nouserscope:'Sorry the user not yet hasy created any scopes.',
                    nouserfavorite:'Sorry the user not yet has any favorites.',
                    nouserfollowing:'Sorry the user not yet has any followings.',
                    nouserfollower:'Sorry the user not yet has any followers.',
                    nouser:'Sorry there is no user available, please try another search.',
                    noscope:'Sorry there is no scope available, please try another search.'

                },
                errorType:ele.errortype

            }


            scope.getOurApp = function(){

                 broadcastService.publish('warningBox::getOurApp');
            }


        }
    }



}])