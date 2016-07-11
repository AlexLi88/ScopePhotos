export default (intro,template,appStr,gooStr,ajpg, bjpg, cjpg, djpg, ejpg, fjpg, gjpg, hjpg, ijpg, jjpg, kjpg, ljpg, mjpg, njpg, ojpg, pjpg, ip6s, icons, screens, appStrD, gooStrD,searchI, appMoc, macBook, background_B2B, social_icons, download_icon, mockUp_phone, mockup_sc_autoTag, mockup_sc_create, mockup_sc_findD, mockup_sc_findI)=>{



    intro.directive('scopeintro',['$state','broadcastService','$window','$rootScope','$interval','MediaFactory','$timeout',($state,broadcastService, $window, $rootScope,$interval,MediaFactory,$timeout)=>{

        return {
            restrict:'AE',
            scope:false,
            template:template,
            link:function(scope){

                $('#menu_background').hide();
                scope.searchType = 'photo';
                scope.appStr = appStr;
                scope.gooStr = gooStr;
                scope.appStrD = appStrD;
                scope.gooStrD = gooStrD;
                scope.searchI = searchI;
                scope.social_icons = social_icons;
                scope.introTitleAnimated = false;
                scope.featureTitleAnimated = false;
                scope.userType = $rootScope.userType;
                scope.ip6s = ip6s;
                scope.coverImgList = [ajpg, bjpg, cjpg, njpg, ejpg, fjpg, gjpg, hjpg, ijpg, jjpg, kjpg, ljpg, mjpg, djpg, ojpg, pjpg];
                scope.screens = screens;
                scope.icons = icons;
                scope.appMoc = appMoc;
                scope.selectedFeature = "DTPL";
                scope.macBook = macBook;
                scope.background_B2B = background_B2B;
                scope.download_icon = download_icon;


                scope.mockUp_phone = mockUp_phone;
                scope.mockup_sc_autoTag = mockup_sc_autoTag;
                scope.mockup_sc_create = mockup_sc_create;
                scope.mockup_sc_findD = mockup_sc_findD;
                scope.mockup_sc_findI = mockup_sc_findI;


                scope.getMockUrl = function(){

                    switch(scope.selectedFeature){


                        case 'RTT':

                            return scope.mockup_sc_autoTag;
                            break;


                            case 'LATBA':
                    return scope.mockup_sc_create;
                                break;



                            case 'FIBL':
                                return scope.mockup_sc_findI;
                                break;


                            case 'DTPL':

                                return scope.mockup_sc_findD;
                                break;
                    }




                }

                scope.chageSelF = function(st){

                    $timeout(function(){

                        scope.selectedFeature = st;

                    })

                }

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

                scope.fList = [

                    {
                        featureTitle:'Find Images By Location',
                        featureContent:'Discover photos street by street. Simply zoom into the area that you want, and photos from Scope, as well as Instagram, Tumblr, Flicker, and more will appear.',
                        icon:icons.FindImagesByLocation,
                        title:'FIBL'
                    },
                    {
                        featureTitle:'Find Directions, People, Landmarks, and More',
                        featureContent:'Ever see a photo of a delicious ice cream cone but not know how to get there? Scope gives you personalized directions to the locations of your favourite photos!',
                        icon:icons.DirectionsToPhotoLocations,
                        title:'DTPL'
                    },
                    {
                        featureTitle:'Create Your Own Events',
                        featureContent:'Stream your visual story with time and location based settings. Spend less time searching, more time enjoying the right photos.',
                        icon:icons.LocationAndTimeBasedAlbums,
                        title:'LATBA'
                    },
                    {
                        featureTitle:'Auto Tag Your Photos',
                        featureContent:"Thinking up hashtags is a thing of the past! Simply upload your photo into the app and Scope will auto tag your image for you.",
                        icon:icons.RevolutionaryTaggingTechnology,
                        title:'RTT'
                    },



                ]

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


                scope.$on('$stateChangeSuccess',function(){


                    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                        skrollr.init().refresh();
                    }

                    // if(window.innerWidth > 850){

                    //skrollr.refresh();
                    // }
                    $window.sr = ScrollReveal({ reset: false });


                    $window.sr.reveal('.one_b', { duration:1000,delay: 100,
                            origin:'bottom',
                            distance : '-200px',
                            easing   : 'cubic-bezier(0, 0.98, 0.58, 1)',
                            rotate: { z: 5},
                            scale    : 1.1 }, 200);

                    $window.sr.reveal('.one_live', { duration:1000,delay: 100,
                        origin:'left',
                        distance : '100px',
                        easing   : 'cubic-bezier(0, 0.98, 0.58, 1)',
                        rotate: { z: 0},
                        scale    : 1.1 }, 200);


                    var myImage = new Image();
                    myImage.src = scope.mockUp_phone;
                    myImage.src = scope.mockup_sc_autoTag;
                    myImage.src = scope.mockup_sc_create;
                    myImage.src = scope.mockup_sc_findD;
                    myImage.src = scope.mockup_sc_findI;

                })

                scope.$on('$stateChangeStart',function(){

                    if(scope.backgroundChange != null)
                    $interval.cancel(scope.backgroundChange);
                })


                broadcastService.subscribe('scroll:scroll',function(){


                    if($(document).scrollTop() >= $('#intro_main #fix_c').height()/2){


                        if( $('#menu_background').css('display') == 'none') {

                            $('#menu_background').fadeIn();
                            $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','black')
                        }

                    }else{

                        if( $('#menu_background').css('display') == 'block') {

                            $('#menu_background').fadeOut();
                            $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','white')
                        }


                    }

                })

                scope.$on('$destroy',function(){

                    broadcastService.unsubscribe(['scroll:scroll']);
                })

                scope.set = function(){

                    $('.ui.button.disable').popup({

                        on:'click'
                    });

                }


                scope.switchSearchType = function(type){


                        if(type == 'user' && scope.userType!='user'){

                            scope.set();
                        }else{

                            if (type != scope.searchType) {

                                scope.searchType = type;

                            }

                        }
                }


                scope.exampleScopeArray = [];
                scope.exampleScopeIdArr = [

                    '467793',
                    '466040',
                    '467764',
                    '467765',
                    '455768',
                    '466002',
                    '467379',
                    '455767'

                ]

                _getScopeList();
                function _getScopeList() {

                    for(var i = 0 ; i < scope.exampleScopeIdArr.length; i ++) {

                        _retriceScope(i,scope.exampleScopeIdArr[i]);
                    }
                }

                function _retriceScope(index,id){

                    MediaFactory.getScopeGeneral(id, 0, 1, Date.now(), $rootScope.userType).then(function (res) {

                        $timeout(function() {

                            scope.exampleScopeArray[index] = res.data.scope;
                        })
                    })

                }



                scope.doSearch = function(){


                    if(scope.searchContent.trim().length > 0){

                        switch(scope.searchType) {

                            case 'photo':
                                $state.
                                transitionTo('imageSearch', {
                                    searchType: 'photo',
                                    searchContent: scope.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                            case 'scope':

                                $state.
                                transitionTo('scopeSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;


                            case 'user':

                                $state.
                                transitionTo('userSearch', {
                                    searchType: 'tag',
                                    searchContent: scope.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                            case 'map':

                                $state.
                                transitionTo('mapSearch', {
                                    searchContent: scope.searchContent.trim()
                                }, {reload: true}).then(function () {
                                }, function (err) {

                                    console.log(err)
                                })
                                break;

                        }
                    }
                }

            }

        }

    }]).directive('rotate',function() {

        return {

            scope:true,
            link: function(scope,ele,attr) {

                //console.log($(ele));
                //$(ele).css('transform', 'rotate('  + Math.floor(Math.random()* 20 - 10) + 'deg)')
                //$(ele).css('transform', 'rotate('  + Math.floor(Math.random()* 20 - 10) + 'deg)')

            }
        };
    });


}




