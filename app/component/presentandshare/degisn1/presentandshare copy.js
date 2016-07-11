export default(presentAndShare,template,googlePlaySrc,appStoreSrc,NinjaSlider)=>{

    presentAndShare.directive('presentandshare',['$stateParams','$q','$rootScope','MediaFactory','$timeout','broadcastService','$window','$state','$interval',function($stateParams,$q,$rootScope,MediaFactory,$timeout,broadcastService,$window,$state,$interval){

        return{

            scope:true,
            template:template,
            restrict:'AE',
            replace:'true',
            link:function(scope){

                scope.pasCtr = {

                    pageNo:0,
                    timeStamp:Date.now(),
                    pageSize:2,
                    curScope:null,
                    imageArr:null,
                    scopeId:$stateParams.scopeId,
                    canceler:$q.defer(),
                    viewMode:"Presentation",
                    liveModeEnable:false,
                    liveModeInterval:null,
                    viewFormate:'imageAndText'
                }
                scope.updating = false;

                scope.$on('$stateChangeSuccess',function(){



                    scope.nsOptions =
                    {
                        sliderId: "ninja-slider",
                        transitionType: "fade", //"fade", "slide", "zoom", "kenburns 1.2" or "none"
                        autoAdvance: true,
                        delay: 8000,
                        transitionSpeed: 500,
                        aspectRatio: "2:1",
                        initSliderByCallingInitFunc: false,
                        shuffle: false,
                        startSlideIndex: 0, //0-based
                        navigateByTap: true,
                        pauseOnHover: false,
                        keyboardNav: true,
                        before: null,
                        license: "mylicense"
                    };


                })


                broadcastService.subscribe('imageSearch::imageAndText',function(){

                    if(scope.pasCtr.viewFormate!='imageAndText'){

                        $('#image_search_list').removeClass('large')
                        scope.pasCtr.viewFormate = 'imageAndText';
                        scope.$broadcast('masonry.reload');
                    }
                })

                broadcastService.subscribe('imageSearch::imageOnly',function(){

                    if(scope.pasCtr.viewFormate!='imageOnly'){

                        $('#image_search_list').removeClass('large')
                        scope.pasCtr.viewFormate = 'imageOnly';
                        scope.$broadcast('masonry.reload');
                    }
                })

                broadcastService.subscribe('imageSearch::imageLarge',function(){

                    if(scope.pasCtr.viewFormate!='imageLarge'){
                        $('#image_search_list').addClass('large')
                        scope.pasCtr.viewFormate = 'imageLarge';
                        //$('#image_search_list').css('padding-left','0')
                        //$('#image_search_list').css('padding-right','0')
                        scope.$broadcast('masonry.reload');
                    }
                })


                scope.$on('$stateChangeSuccess',function(){

                    //$('#website_header').css('display','none');
                    $('.ui.dropdown')
                        .dropdown()
                    ;
                })


                scope.limiteDescription = function(content){

                    if(content != null)
                        return content.length > 100 ? content.substr(0,99) + '...': content;
                    else
                        return '';
                }



                scope.backMain = function(){

                    $state.transitionTo('mainPage',{},{reload:false});
                }


                broadcastService.subscribe('imageSearch::liveModeEnable',function(){

                    if(!scope.pasCtr.liveModeEnable){

                        scope.pasCtr.liveModeEnable = true;
                        _enableLiveMode();

                    }else{

                        if(scope.pasCtr.liveModeInterval != null){

                            $interval.cancel(scope.imageCtr.liveModeInterval)
                        }

                        scope.pasCtr.liveModeEnable = false;
                    }


                })


                function _enableLiveMode(){


                    scope.pasCtr.liveModeInterval = $interval(function(){



                        MediaFactory.getScopeGeneral( scope.pasCtr.scopeId, 0 , 10, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.pasCtr.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.pasCtr.imageArr[j].id){

                                        push = false;
                                    }

                                }

                                if(true){

                                    scope.pasCtr.imageArr.unshift(res.data.data[i]);
                                    break;
                                }else{

                                }
                            }

                        })


                    },5000)
                }



                _getImageList();
                function _getImageList (){

                    scope.updating = true;

                    MediaFactory.getScopeGeneral(scope.pasCtr.scopeId,scope.pasCtr.pageNo ++ , scope.pasCtr.pageSize, scope.pasCtr.timeStamp,$rootScope.userType,scope.pasCtr.canceler.promise).then(function(res){

                        if(scope.pasCtr.curScope == null) scope.pasCtr.curScope = res.data.scope
                        _pushDisplayImage(res);

                    })



                }

                scope.determineOriginalIcon = function(image){

                    switch(image.sourceType){

                        case'SM':
                            return '';
                            break;

                        case 'IN':

                            return  'instagram'
                            break;

                        case 'WB':

                            return  'weibo'
                            break;

                        case 'TW':
                            return 'twitter';
                            break;

                        case 'FL':

                            return 'flickr';
                            break;

                        case 'FS':

                            return 'foursquare';
                            break;

                    }
                }

                scope.getShotTime = function(shotTime){

                    var second = (Date.now() - shotTime)* 0.001;
                    var minutes = second / 60;
                    var hour = minutes / 60;


                    if(hour < 1){

                        return Math.floor(minutes) + ' mins ago';

                    }

                    var day = hour / 24;

                    if(day < 1){ return Math.floor(hour) + ' hours ago'; }

                    var week = day / 7;

                    if(week < 1){return Math.floor(day) + ' days ago';}

                    return Math.floor(week) + ' weeks ago';


                }


                scope.determineOriginalText  = function(image){

                    if(image){
                        switch(image.sourceType){

                            case'SM':
                                return 'scope';

                            case 'IN':

                                return  'instagram'

                            case 'WB':

                                return  'weibo'

                            case 'TW':
                                return 'twitter';

                            case 'FL':

                                return 'flickr';

                            case 'FS':

                                return 'foursquare';

                            case 'PX':
                                return '500px'

                        }
                    }

                }

                scope.determineOriginal = function(image){

                    switch(image.sourceType){

                        case'SM':
                            return  '#/user/' + image.owner.id;
                            break;

                        case 'IN':
                            if(image.sourceOwner != null)
                                return  'https://instagram.com/' + image.sourceOwner.username;
                            break;

                        case 'WB':
                            return 'http://weibo.com/'  + image.sourceOwner.id;
                            break;

                        case 'TW':
                            return 'https://twitter.com/' + image.sourceOwner.username;
                            break;


                        case 'PX':
                            return 'https://500px.com/' + image.sourceOwner.username.replace(/ /g,'');
                            break;

                    }
                }

                function _pushDisplayImage(res) {


                    if (scope.pasCtr.imageArr == null) {

                        scope.pasCtr.imageArr = res.data.data;
                        setTimeout(function(){

                            var nslider = new NinjaSlider(scope.nsOptions);
                            nslider.init()
                            // console.log(nslider);

                        },5000)

                        scope.updating = false;
                        if(res.data.data.length == 0){

                            scope.pasCtr.showErrorMessage = true;
                        }else{}

                    } else {

                        Array.prototype.push.apply(scope.pasCtr.imageArr, res.data.data);
                        setTimeout(function(){

                            var nslider = new NinjaSlider(scope.nsOptions);
                            nslider.init()
                            // console.log(nslider);

                        },1)

                    }

                    if (res.data.data.length >= scope.pasCtr.pageSize) {

                        $timeout(function() {
                            scope.updating = false
                        }, 1000);

                    } else {

                        $('loadinganimation').fadeOut();
                    }
                }
            }
        }

    }])



}