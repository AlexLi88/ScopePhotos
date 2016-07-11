angular.module('app.searchHanger',[]).directive('searchhanger',['$state','$stateParams','$rootScope','broadcastService','$interval','$timeout',function($state,$stateParams,$rootScope,broadcastService,$interval,$timeout){

    require('./searchhanger.css');
    return {

        restrict:'AE',
        template:require('./searchhanger.html'),
        link:function(scope,element,attr){

            scope.userType = $rootScope.userType;
            scope.liveModeEnabled = false;
            // scope.searchi = require('./res/search_i.svg');
            // scope.display_large = require('./res/Display_large.png');
            // scope.display_smallwithouttext = require('./res/Display_smallwithouttext.png');
            // scope.display_smallwithtext = require('./res/Display_smallwithtext.png');
            scope.liveon_1 = require('./res/liveon_1.png');
            scope.liveon_2 = require('./res/liveon_2.png');
            scope.liveu = require('./res/liveu.png');
            scope.displayMode =  $rootScope.$$platform == 'Mobile' ? 'smallwithouttext':'smallwithtext';
            scope.liveButtonInterval = null;
            scope.currentState = $state.current.name;

            $timeout(()=>{
                switch($state.current.name){

                    case 'imageSearch':

                        if($stateParams.searchId){

                            scope.searchType = 'scope';
                        }else{

                            scope.searchType = 'photo';
                        }
                        break;

                    case 'imageSearch.detailImageContainer':

                        if($stateParams.searchId){

                            scope.searchType = 'scope';

                        }else{

                            scope.searchType = 'photo';
                        }
                        break;

                    case 'scopeSearch':
                        scope.searchType = 'scope';
                        break;

                    case 'userSearch':

                        scope.searchType = 'user';
                        break;

                    case 'mapSearch':
                        scope.searchType = 'map';
                        break;

                    case 'mapSearch.detailImageContainer':
                        scope.searchType = 'map';
                        break;

                }
            })


            scope.scopeId = $stateParams.searchId;
            scope.searchValue = $stateParams.searchContent?$stateParams.searchContent.trim():$stateParams.searchId;
            if($stateParams.searchContent != null){
                // scope.searchT = $stateParams.searchType;


                if ($rootScope.userType != 'user') {


                    $('#live_button')
                        .popup({
                            popup: '.live_error.popup',
                            position : 'bottom right',
                            hoverable: true,
                            // position : 'bottom left'

                        });
                }



            }

            scope.$on('$stateChangeSuccess',function(){

                $('#embed_and_present')
                    .popup({
                        popup: '.special.popup',
                        // hoverable:true,
                        on:'click',
                        position:'bottom left',
                        closable:'false'
                    })
                ;

                if(scope.searchType == 'scope'){

                    scope.embeddingUrl = "<iframe height='800px' frameBorder='0' width='1200px' src='https://www.scopephotos.com/#/presentandembed/streamId=" + $stateParams.searchId   +"'></iframe>"
                }

            })


            scope.set = function(){

                $('.item.disable').popup('show');
                //$('.item.disable').popup({
                //
                //    on:'click'
                //});

            }

            scope.$on('$stateChangeStart',function(to){

                if(to.name != 'imageSearch.detailImageContainer'){

                    if(scope.liveButtonInterval != null){

                        $interval.cancel(scope.liveButtonInterval);
                    }
                }
            })

            scope.switchSearchType = function(searchType){


                if( searchType == 'user' && scope.userType!='user'){

                    scope.set();
                }

                else {

                    if (searchType != scope.searchType && scope.searchValue.length != 0) {

                        switch (searchType) {

                            case 'photo':

                                $state.transitionTo('imageSearch', {

                                    searchType: 'photo',
                                    searchContent: scope.searchValue.trim()

                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })

                                break;

                            case 'scope':
                                $state.transitionTo('scopeSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchValue.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                            case 'user':

                                $state.transitionTo('userSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchValue.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;


                            case 'map':

                                $state.transitionTo('mapSearch', {
                                    searchContent: scope.searchValue.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                })
                                break;
                        }

                    }else{

                        scope.searchType = searchType;

                    }

                }

            }

            scope.doSearch = function(){

                switch(scope.searchType){

                    case 'photo':

                        $state.transitionTo('imageSearch',{

                            searchType:'photo',
                            searchContent:scope.searchValue.trim()

                        },{reload:true}).then(function(){},function(err){

                            console.log(err)
                        })


                        break;
                    case 'scope':
                        $state.
                        transitionTo('scopeSearch', {
                            searchType: 'tag',
                            searchContent: scope.searchValue.trim()
                        }, {reload: true}).then(function () {
                        }, function (err) {

                            console.log(err)
                        })
                        break;

                    case 'user':

                        $state.
                        transitionTo('userSearch', {
                            searchType: 'tag',
                            searchContent: scope.searchValue.trim()
                        }, {reload: true}).then(function () {
                        }, function (err) {

                            console.log(err)
                        })
                        break;

                    case 'map':


                        $state.
                        transitionTo('mapSearch', {
                            searchContent: scope.searchValue.trim()
                        }, {reload: true}).then(function () {
                        }, function (err) {

                            console.log(err)
                        })
                        break;

                }
            }

            scope.toMap = function(){

                $state.transitionTo('mapSearch',{},{reload:true});

            }


            scope.presentationMode = function(){

                broadcastService.publish('imageSearch::presentationMode');
            }
            scope.compactMode = function(){

                broadcastService.publish('imageSearch::compactMode');
            }

            scope.imageAndText = function(){
                
                if(scope.displayMode == 'smallwithtext'){

                    scope.displayMode = 'smallwithouttext';
                    broadcastService.publish('imageSearch::imageOnly');

                }else{

                    scope.displayMode = 'smallwithtext';
                    broadcastService.publish('imageSearch::imageAndText');

                }

            }

            scope.largeImage = function(){

                scope.displayMode = 'large';
                broadcastService.publish('imageSearch::imageLarge');
            }

            scope.liveMode = function($event) {
                //
                // if ($rootScope.userType != 'user') {
                //
                //
                //     // $('#live_button')
                //     //     .popup({
                //     //         popup: '.live_error.popup',
                //     //         position : 'bottom right',
                //     //         hoverable: true,
                //     //         // position : 'bottom left'
                //     //
                //     //     });
                // }


                if ($rootScope.userType == 'user')  {

                    if (!scope.liveModeEnabled) {

                        scope.liveModeEnabled = true;
                        scope.liveButtonInterval = $interval(function () {
                            

                            if ($('#live_button').css('background-image').indexOf(scope.liveon_2) >= 0) {


                                $('#live_button').css('background-image', 'url(' + scope.liveon_1 + ')');

                            } else {

                                $('#live_button').css('background-image', 'url(' + scope.liveon_2 + ')');
                            }


                        }, 1000)


                    } else {


                        scope.liveModeEnabled = false;
                        if (scope.liveButtonInterval != null) {

                            $interval.cancel(scope.liveButtonInterval);
                            scope.liveButtonInterval = null;
                        }
                    }

                    broadcastService.publish('imageSearch::liveModeEnable');
                }
            }

        }
    }

}])