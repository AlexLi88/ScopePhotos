export default(presentAndEmbed,template,googlePlaySrc,appStoreSrc,scopeLogo)=> {

    presentAndEmbed.directive('presentandembed', ['$stateParams', '$q', '$rootScope', 'MediaFactory', '$timeout', 'broadcastService', '$window', '$state', '$interval', function ($stateParams, $q, $rootScope, MediaFactory, $timeout, broadcastService, $window, $state, $interval) {

        return {

            scope: {},
            template: template,
            restrict: 'AE',
            replace: 'true',
            link: function (scope) {

                scope.showMenu = false;
                scope.pasCtr = {
                    scopeLogo: scopeLogo,
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    searchType:'scope',
                    viewMode: "smallWithText",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    viewFormate: 'imageAndText',
                    replacingIndex: 0,
                    showMenu: false,
                    mode: 'embed',
                    theme: 'light',
                    currentLayout: $state.$current.name
                }

                scope.cssSheet = {

                    '468481':{

                        'embed_t': {
                            'background':'#6ec16b'
                        },

                        'scopeLogo':{
                            'background-image':'url(http://balanceduniversity.com/assets/img/logo.png)'
                        }

                    },

                    '468982':{

                        // 'embed_t': {
                        //     'background':'#b5b5b5'
                        // },

                        'scopeLogo':{
                            'background-image':'url(http://volunteerburnaby.ca/wp-content/uploads/2014/10/logo.png)'
                        }

                    }

                }



                scope.cssInject = function(){


                    if(scope.cssSheet[scope.pasCtr.scopeId]){

                        for(var p in scope.cssSheet[scope.pasCtr.scopeId]){

                            for(var s in scope.cssSheet[scope.pasCtr.scopeId][p]){

                                        $('#' +p).css(s,scope.cssSheet[scope.pasCtr.scopeId][p][s]);
                            }
                        }

                    }

                }

                scope.$on('$stateChangeSuccess', function () {
                    // $('#website_header').hide();
                    // $('#footer_main').hide();
                    scope.cssInject();
                })


                scope.liveMode = function () {

                    scope.pasCtr.liveModeEnable = !scope.pasCtr.liveModeEnable;
                    broadcastService.publish('imageSearch::liveModeEnable');
                }


                scope.largeImage = function () {

                    scope.displayMode = 'large';
                    broadcastService.publish('imageSearch::imageLarge');
                }

                scope.showMenu = function () {

                    if (!scope.pasCtr.showMenu) {

                        $('#display_option_menu').animate({left: '0vw'}, 500);

                    } else {

                        $('#display_option_menu').animate({left: '-' + $('#display_option_menu').width()}, 500);
                    }
                    scope.pasCtr.showMenu = !scope.pasCtr.showMenu;
                }


                scope.switchLayout = function (layout) {

                    scope.pasCtr.liveModeEnable = false;

                    switch (layout) {

                        case 'layout_basic':
                            scope.pasCtr.currentLayout = 'presentandembed.layout_basic';
                            $state.go('presentandembed.layout_basic', {scopeId: scope.pasCtr.scopeId});
                            break;

                        case 'float_5':
                            scope.pasCtr.currentLayout = 'presentandembed.float_5';
                            $state.go('presentandembed.float_5', {scopeId: scope.pasCtr.scopeId});
                            break;

                        case 'float_3':
                            scope.pasCtr.currentLayout = 'presentandembed.float_3';
                            $state.go('presentandembed.float_3', {scopeId: scope.pasCtr.scopeId});
                            break;

                        case 'single_image':
                            scope.pasCtr.currentLayout = 'presentandembed.single_image';
                            $state.go('presentandembed.single_image', {scopeId: scope.pasCtr.scopeId});
                            break;

                        case 'layout_semi':

                            scope.pasCtr.currentLayout = 'presentandembed.layout_semi';
                            $state.go('presentandembed.layout_semi', {scopeId: scope.pasCtr.scopeId});
                            break;

                        case 'compact':
                            scope.pasCtr.currentLayout = 'presentandembed.compact';
                            $state.go('presentandembed.compact', {scopeId: scope.pasCtr.scopeId});
                            break;

                    }
                }


                init();
                function init() {



                    var options = $stateParams.option.split('&');

                    for (var i = 0; i < options.length; i++) {

                        var val = options[i];

                        if (val.indexOf('op=') >= 0) {


                            if (val.substr(3, val.getLength) == 'presentation') {

                                scope.pasCtr.mode = 'presentation';

                            } else {

                                scope.pasCtr.mode = 'embed';
                            }

                        } else if (val.indexOf('streamId=') >= 0) {

                            scope.pasCtr.scopeId = val.substr(9, val.getLength);
                            MediaFactory.getScopeGeneral(scope.pasCtr.scopeId, 0, 1, Date.now(),$rootScope.userType).then(function(res){

                                if(scope.pasCtr.curScope == null) scope.pasCtr.curScope = res.data.scope

                            })

                        } else if (val.indexOf('layout=') >= 0) {

                            scope.pasCtr.layout = val.substr(7, val.getLength);

                        } else if (val.indexOf('theme=') >= 0) {


                            if (val.substr(6, val.getLength) == 'dark') {

                                scope.pasCtr.theme = 'dark';

                            } else {

                                scope.pasCtr.theme = 'light';
                            }


                        }
                    }

                    if (!scope.pasCtr.scopeId || scope.pasCtr.scopeId.length == 0) {

                        scope.pasCtr.error = true;
                        scope.pasCtr.errInfo = "Error: Url formate. No valid stream ID is found."

                    } else {

                        switch ((scope.pasCtr.layout + '').toLowerCase()) {

                            case 'compact':
                                scope.switchLayout('compact');
                                break;

                            case 'single':
                                scope.switchLayout('single_image');
                                break;

                            case 'float_3':

                                scope.switchLayout('float_3');
                                break;

                            case 'float_5':

                                scope.switchLayout('float_5');
                                break;

                            case 'semi':
                                scope.switchLayout('layout_semi');
                                break;

                            default:
                                scope.switchLayout('layout_basic');
                                break;


                        }

                    }


                }

            }
        }

    }])


}

//
//
//         .factory('presentAndEmbed_factory',['$stateParams','$q','$rootScope','MediaFactory','$timeout','broadcastService','$window','$state','$interval',function($stateParams,$q,$rootScope,MediaFactory,$timeout,broadcastService,$window,$state,$interval){
//
//         return{
//
//             getImageList : function(scope){
//
//                 var self = this;
//                 scope.updating = true;
//                 MediaFactory.getScopeGeneral(scope.pasCtr.scopeId,0 , scope.pasCtr.pageSize, Date.now(),$rootScope.userType,scope.pasCtr.canceler.promise).then(function(res){
//
//                     if(scope.pasCtr.curScope == null) scope.pasCtr.curScope = res.data.scope
//                     self.pushDisplayImage(res,scope);
//
//                 })
//
//
//             },
//
//             showDetailImage:function(image){
//
//                 broadcastService.publish('presentAndEmbed::detailImage',image);
//
//             },
//
//             limiteDescription : function(content){
//
//             if(content != null)
//                 return content.length > 100 ? content.substr(0,99) + '...': content;
//             else
//                 return '';
//         },
//             getShotTime : function(shotTime){
//
//             var second = (Date.now() - shotTime)* 0.001;
//             var minutes = second / 60;
//             var hour = minutes / 60;
//
//
//             if(hour < 1){
//
//                 return Math.floor(minutes) + ' mins ago';
//
//             }
//
//             var day = hour / 24;
//
//             if(day < 1){ return Math.floor(hour) + ' hours ago'; }
//
//             var week = day / 7;
//
//             if(week < 1){return Math.floor(day) + ' days ago';}
//
//             return Math.floor(week) + ' weeks ago';
//
//
//         },
//
//             determineOriginalText  : function(image){
//
//             if(image){
//                 switch(image.sourceType){
//
//                     case'SM':
//                         return 'scope';
//
//                     case 'IN':
//
//                         return  'instagram';
//
//                     case 'WB':
//
//                         return  'weibo';
//
//                     case 'TW':
//                         return 'twitter';
//
//                     case 'FL':
//
//                         return 'flickr';
//
//                     case 'FS':
//
//                         return 'foursquare';
//
//                     case 'PX':
//                         return '500px';
//
//                     case 'PN':
//                         return 'panoramio';
//
//                 }
//             }
//
//         },
//             determineOriginalIcon : function(image){
//
//                 if(image){
//             switch(image.sourceType){
//
//                 case'SM':
//                     return '';
//                     break;
//
//                 case 'IN':
//
//                     return  'instagram'
//                     break;
//
//                 case 'WB':
//
//                     return  'weibo'
//                     break;
//
//                 case 'TW':
//                     return 'twitter';
//                     break;
//
//                 case 'FL':
//
//                     return 'flickr';
//                     break;
//
//                 case 'FS':
//
//                     return 'foursquare';
//                     break;
//
//             }
//                 }
//         },
//
//             determineOriginal : function(image){
//
//                 if(image){
//             switch(image.sourceType){
//
//                 case'SM':
//                     return  '#/user/' + image.owner.id;
//                     break;
//
//                 case 'IN':
//                     if(image.sourceOwner != null)
//                         return  'https://instagram.com/' + image.sourceOwner.username;
//                     break;
//
//                 case 'WB':
//                     return 'http://weibo.com/'  + image.sourceOwner.id;
//                     break;
//
//                 case 'TW':
//                     return 'https://twitter.com/' + image.sourceOwner.username;
//                     break;
//
//
//                 case 'PX':
//                     return 'https://500px.com/' + image.sourceOwner.username.replace(/ /g,'');
//                     break;
//
//             }
//                 }
//         },
//
//
//            pushDisplayImage:function(res,scope) {
//
//             if (scope.pasCtr.imageArr == null) {
//
//                 scope.pasCtr.imageArr = res.data.data;
//                 scope.updating = false;
//                 if(res.data.data.length == 0){
//
//                     scope.pasCtr.showErrorMessage = true;
//                 }else{}
//
//             } else {
//
//                 Array.prototype.push.apply(scope.pasCtr.imageArr, res.data.data);
//             }
//
//             if (res.data.data.length >= scope.pasCtr.pageSize) {
//
//                 $timeout(function() {
//                     scope.updating = false
//                 }, 1000);
//
//             } else {
//
//                 $('loadinganimation').fadeOut();
//             }
//         },
//
//             initSubscribe:function(scope){
//
//                 broadcastService.subscribe('imageSearch::imageAndText',function(){
//
//                     if(scope.pasCtr.viewFormate!='imageAndText'){
//
//                         $timeout(function(){
//
//                             scope.pasCtr.viewFormate = 'imageAndText';
//                             scope.$broadcast('masonry.reload');
//                         })
//
//                     }
//                 })
//
//                 broadcastService.subscribe('imageSearch::imageOnly',function(){
//
//
//                     if(scope.pasCtr.viewFormate!='imageOnly'){
//
//                         $timeout(function(){
//                             scope.pasCtr.viewFormate = 'imageOnly';
//                             scope.$broadcast('masonry.reload');
//                         })
//                     }
//                 })
//
//                 broadcastService.subscribe('imageSearch::imageLarge',function(){
//
//                     if(scope.pasCtr.viewFormate!='imageLarge'){
//                         $('#image_search_list').addClass('large')
//                         scope.pasCtr.viewFormate = 'imageLarge';
//                         //$('#image_search_list').css('padding-left','0')
//                         //$('#image_search_list').css('padding-right','0')
//                         scope.$broadcast('masonry.reload');
//                     }
//                 })
//
//                 broadcastService.subscribe('imageSearch::liveModeEnable',function(){
//
//
//                     if(!scope.pasCtr.liveModeEnable){
//
//                         scope.pasCtr.liveModeEnable = true;
//                         scope.enableLiveMode();
//
//                     }else{
//
//                         if(scope.pasCtr.liveModeInterval != null){
//
//                             $interval.cancel(scope.pasCtr.liveModeInterval)
//                         }
//
//                         scope.pasCtr.liveModeEnable = false;
//                     }
//
//
//                 })
//
//             },
//
//             unSubscribe:function(scope){
//
//                 broadcastService.unsubscribe(['imageSearch::imageAndText','imageSearch::imageLarge','imageSearch::liveModeEnable','imageSearch::imageOnly']);
//
//                 if(scope.pasCtr.liveModeInterval != null){
//
//                     $interval.cancel(scope.pasCtr.liveModeInterval);
//                 }
//
//                 if(scope.pasCtr.presentationInterval != null){
//
//                     $interval.cancel(scope.pasCtr.presentationInterval);
//                 }
//                 if(scope.pasCtr.canceler != null){
//
//                     scope.pasCtr.canceler.resolve();
//                 }
//             }
//
//
//     }
//
//     }]).constant('presentAndEmbed_const',{
//
//         pageSize:50,
//         pageNo:0
//     })
//
// }