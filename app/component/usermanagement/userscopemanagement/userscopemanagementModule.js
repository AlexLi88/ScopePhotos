export default userManagement =>{

    require('./userscopemanagement.css');
    userManagement.directive('userscopemanagement',['$stateParams','MediaFactory','broadcastService','$state','$timeout','$window','$rootScope','toaster',($stateParams,MediaFactory,broadcastService,$state,$timeout,$window,$rootScope,toaster)=>{

        return{

            template:require('./userscopemanagement.html'),
            link:function(scope, ele, attr){


                scope.userScopeManagementCtr = {

                    pageSize:20,
                    pageNo:0,
                    userId:$stateParams.userId,
                    numOfEvent:$stateParams.numOfEvent,
                    scopeArr:[],
                    timeStamp : Date.now(),
                    userType:null,
                    deleteEve:null,
                    deleteScope:null
                }

                scope.updating = true;
                scope.userScopeManagementCtr.userType =  scope.userScopeManagementCtr.userId  == $rootScope.userInfo.id ? 'owner':'visitor';

                scope.hideScopeBg = function(evnet){


                    $($(event.currentTarget).find('.scope_info')).stop(true,false).animate({'top':'100%'},700,'easeOutCirc');
                    $($(event.currentTarget).find('.scope_header')).stop(true,false).animate({'bottom':'10px'},500,'easeOutCirc');
                }

                scope.showScopeBg = function(evnet){



                    $($(event.currentTarget).find('.scope_info')).stop(true,false).animate({'top':'0%'},700,'easeOutCirc');
                    $($(event.currentTarget).find('.scope_header')).stop(true,false).animate({'bottom':'50px'},500,'easeOutCirc');
                }

                broadcastService.subscribe('scroll:scroll',function(){

                    if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 500) {

                        if (scope.updating == false) {
                            scope.updating = true;
                            scope.getScopeList();
                        }
                    }

                })

                scope.$on('$destroy',function(){

                    broadcastService.unsubscribe(['scroll:scroll','warningBox::confirmDeleteScope']);
                })



                scope.getScopeList = function(){

                    MediaFactory.getUserScope(scope.userScopeManagementCtr.pageNo ++ , scope.userScopeManagementCtr.pageSize,scope.userScopeManagementCtr.timeStamp,scope.userScopeManagementCtr.userId).then(function(res){

                        _pushDisplayScope(res);

                    })
                }

                scope.showDetailScope = function(scope){

                    $state.
                    transitionTo('imageSearch', {
                        searchType: 'scope',
                        searchContent: scope.caption,
                        searchId:scope.id
                    }, {reload: true}).then(function () {
                    }, function (err) {

                        console.log(err)
                    })
                }

                scope.showDimmer = function($event){

                    $($event.currentTarget).dimmer('show');
                }

                scope.hideDimmer = function($event){

                    $($event.currentTarget).dimmer('hide');
                }

                scope.editScope = function(scope){

                    $state.go('user.editScope',{

                        scopeId:scope.id
                    })
                }

                scope.deleteScope = function(oneScope,event){

                    scope.userScopeManagementCtr.deleteEve = event;
                    scope.userScopeManagementCtr.deleteScope = oneScope;
                    broadcastService.publish('warningBox::deleteScope');



                }

                broadcastService.subscribe('warningBox::confirmDeleteScope',function(){

                    MediaFactory.deleteScope(scope.userScopeManagementCtr.deleteScope.id).then(function(res){

                        if(res.data.result == 'OK'){

                            toaster.pop('info', 'Selected scope has been deleted');
                            angular.element(scope.userScopeManagementCtr.deleteEve.target).parent().parent().fadeOut();
                            broadcastService.publish('userScopeManagement::del');
                        }
                    })


                })


                function _pushDisplayScope(res){

                    if (scope.userScopeManagementCtr.scopeArr == null) {

                        scope.userScopeManagementCtr.scopeArr = res.data.data;

                    } else {

                        Array.prototype.push.apply(scope.userScopeManagementCtr.scopeArr, res.data.data);
                    }

                    if (res.data.data.length >= scope.userScopeManagementCtr.pageSize) {

                        $timeout(function() {
                            scope.updating = false
                        }, 1000);

                    } else {

                        $('loadinganimation').fadeOut();

                    }

                }


                scope.getScopeList();

            }

        }
    }])
}