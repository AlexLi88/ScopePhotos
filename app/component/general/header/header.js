angular.module('app.header',[]).directive('scopeheader',['broadcastService','$state','$window','$rootScope','$stateParams',(broadcastService,$state,$window,$rootScope,$stateParams) =>{

        require('./header.css');

        return{

            restrict:'AE',
            template:require('./header.html'),
            link: (scope) => {

                scope.backMain = function(){

                    $state.transitionTo('mainPage',{},{reload:true});
                }

                scope.searchCtr = {

                    showSearch:false,
                    searchType:null,
                    searchContent:null
                }

                scope.logoW = require('./res/logoW.png');
                scope.logoW_sml = require('./res/logoW_sml.png');

                //scope.logoW = $window.innerWidth <= 800? require('./res/logoW_sml.png'):require('./res/logoW.png');

                scope.logoD = require('./res/logoD.png');
                scope.searchi = require('./res/search_i.svg');
                scope.androids = require('./res/androids.png');
                scope.androidu = require('./res/androidu.png');
                scope.apples = require('./res/apples.png');
                scope.appleu = require('./res/appleu.png');
                scope.downloadi = require('./res/download.png');


                $rootScope.$on('$viewContentLoaded',function() {

                        if( !$state.current.name.length || $state.current.name.indexOf('presentandembed') >= 0 ){

                            $('#website_header').hide();
                        }else{

                            $('#website_header').show();
                        }


                    }
                );


                $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){

                    $('#website_header').hide();
                    if(toState.name != 'mainPage' && toState.name != 'login' && toState.name != 'btob'  ){

                        $('#menu_background').show();
                        $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','black')

                    }else{

                        $('#menu_background').hide();
                         $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','white')
                    }

                    if(toState.name != 'mainPage' && toState.name != 'btob'){

                        scope.showSearch = true;
                        if($window.innerWidth <= 800){

                            $('#reg_logo').hide();
                            $('#sml_logo').show();
                        }else{

                            $('#reg_logo').show();
                            $('#sml_logo').hide();

                        }

                        scope.searchCtr.searchContent = toParams.searchContent?toParams.searchContent:toParams.searchId;

                            switch(toState.name){

                                case 'imageSearch':
                                    scope.searchCtr.searchType = 'photo';
                                    break;
                                case 'scopeSearch':
                                    scope.searchCtr.searchType = 'scope'
                                    break;
                                case 'userSearch':
                                    scope.searchCtr.searchType = 'user';
                                    break;
                                case 'mapSearch':
                                    scope.searchCtr.searchType = 'map';
                                    break;
                                default:
                                    scope.searchCtr.searchType = 'photo';
                                    break;
                            }

                    }else{

                        $('#reg_logo').show();
                        $('#sml_logo').hide();
                        scope.showSearch = false;
                    }
                })


                scope.downloadApp = function(){

                    if(navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0 || navigator.userAgent.indexOf('ipod') >= 0 ){

                        $window.open("https://itunes.apple.com/app/id911111086", '_blank');
                    }

                    else if(navigator.userAgent.indexOf('Android') >= 0 ){

                        $window.open("https://play.google.com/store/apps/details?id=com.scopemedia.android", '_blank');

                    }else{

                        $window.open("https://itunes.apple.com/app/id911111086", '_blank');

                    }
                }


                //angular.element($window).bind('resize', function(){
                //
                //    console.log('here')
                //    if($window.innerWidth <= 800){
                //
                //        if(scope.searchi != require('./res/logoW_sml.png')){
                //
                //            scope.searchi = require('./res/logoW_sml.png')
                //
                //        }else{
                //
                //            if(scope.searchi != require('./res/logoW.png')){
                //
                //                scope.searchi = require('./res/logoW.png')
                //            }
                //
                //        }
                //    }
                //    scope.$digest();
                //});



                scope.doSearch = function(){

                    if(scope.searchCtr.searchContent!= null && $stateParams.searchContent != scope.searchCtr.searchContent.trim()) {

                        switch (scope.searchCtr.searchType) {

                            case 'photo':

                                $state.transitionTo('imageSearch', {

                                    searchType: 'photo',
                                    searchContent: scope.searchCtr.searchContent.trim()

                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })


                                break;
                            case 'scope':
                                $state.transitionTo('scopeSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchCtr.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                            case 'user':

                                $state.transitionTo('userSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchCtr.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                            case 'map':

                                $state.transitionTo('mapSearch', {
                                    searchContent: scope.searchCtr.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                        }
                    }
                }


                broadcastService.subscribe('login::userInfo',function(para1,para2){

                    scope.userType = para2.type;

                    if(scope.userType == 'user'){

                        scope.userInfo = para2.info;
                    }

                })


                scope.showGetOurApp = function(){

                    broadcastService.publish('warningBox::getOurApp');
                }

        }

    }

}]).directive('windowResizez',['$window',function($window){


    return{

        link:function(scope,ele,attr){

            angular.element($window).bind('resize', function(){

                scope.width = $window.innerWidth;
                scope.$digest();
            });

        }
    }

}])