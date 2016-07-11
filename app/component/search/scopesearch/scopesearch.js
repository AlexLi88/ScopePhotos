angular.module('app.scopeSearch',[]).directive('scopesearch',['$stateParams','$rootScope','MediaFactory','$timeout','broadcastService','$window','$state'
        ,($stateParams,$rootScope,MediaFactory,$timeout,broadcastService,$window,$state)=>{


        require('./scopesearch.css')

return {

    restrict: 'AE',
    scope: true,
    replace: true,
    template: require('./scopesearch.html'),
    link: function (scope) {

        scope.scopeCtr = {

            pageNo: 0,
            timeStamp: Date.now(),
            pageSize: 20,
            scopeArr: null,
            searchType: $stateParams.searchType,
            searchContent: $stateParams.searchContent,
            searchId:$stateParams.searchId,
            showErrorMessage:false
        }


        scope.showScopeTitle = function(event){

            $(event.currentTarget).stop(true,false).animate({'top':'-30px'},1000,'easeOutCirc');
            $(event.currentTarget).parent().parent().find('.scope_info_section').stop(true,false).animate({'bottom':'0px'},400,'easeOutCirc');


        }

        scope.hideScopeTitle = function(event){

            $(event.currentTarget).stop(true,false).stop(true,false).animate({'top':'0px'},400,'easeOutCirc');
            $(event.currentTarget).parent().parent().find('.scope_info_section').stop(true,false).animate({'bottom':'-25px'},400,'easeOutCirc');

        }


        function _pushDisplayScope(res){

            if (scope.scopeCtr.scopeArr == null) {

                scope.scopeCtr.scopeArr = res.data.data;
                if(res.data.data.length == 0){

                    scope.scopeCtr.showErrorMessage = true;
                }

            } else {

                Array.prototype.push.apply(scope.scopeCtr.scopeArr, res.data.data);
            }

            if (res.data.data.length >= scope.scopeCtr.pageSize) {

                $timeout(function() {
                    scope.updating = false
                }, 1000);

            } else {

                $('loadinganimation').fadeOut();
            }
        }
        scope.$on('$destroy',function(){

            broadcastService.unsubscribe(['scroll:scroll']);
        })

        broadcastService.subscribe('scroll:scroll',function(){


            if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 1000) {

                if (scope.updating == false) {
                    scope.updating = true;
                    _getScopeList();
                }
            }

        })


        scope.showScopeDetail = function(scope){

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

        function _getScopeList() {

            scope.updating = true;
            switch(scope.scopeCtr.searchType){

                case 'tag':

                     MediaFactory.getScopesGeneral(scope.scopeCtr.pageNo ++ , scope.scopeCtr.pageSize, scope.scopeCtr.timeStamp, scope.scopeCtr.searchContent, $rootScope.userType).then(function(res){

                            _pushDisplayScope(res);
                     })

                    break;

                case 'location':
                    var lat = scope.scopeCtr.searchId.split(',')[0];
                    var lng = scope.scopeCtr.searchId.split(',')[1];
                    MediaFactory.getMapScopeGeneral(scope.scopeCtr.pageNo ++, scope.scopeCtr.pageSize, scope.scopeCtr.timeStamp, 2000, lng, lat, $rootScope.userType).then(function(res){

                        _pushDisplayScope(res);
                    })

                    break;
            }

        }


        _getScopeList();


    }


}


}])