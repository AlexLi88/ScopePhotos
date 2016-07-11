


angular.module('app.imageSearch',[]).directive('imagesearch',['$state','$stateParams','MediaFactory','$rootScope','$timeout','broadcastService','$window','rx','$q','$interval','WSFactory','$angular_webSocket','imageListView_fac',function($state,$stateParams,MediaFactory,$rootScope,$timeout,broadcastService,$window,rx,$q,$interval,WSFactory,$angular_webSocket,imageListView_fac){

    require('./imagesearch.css')

    return{

        restrict:'AE',
        scope:true,
        replace:true,
        template:require('./imagesearch.html'),
        link:function(scope){

            
            for(let m in imageListView_fac){

                scope[m] = imageListView_fac[m];
            }
            scope.initScope(scope,{

                pageNo:0,
                timeStamp:Date.now(),
                pageSize:35,
                imageArr:null,
                pendingImageArr:[],
                searchType:$stateParams.searchType,
                searchContent:$stateParams.searchContent,
                scopeId:$stateParams.searchId,
                searchId:$stateParams.searchId,
                showErrorMessage:false,
                liveModeEnable:false,
                updating:true,
                liveModeInterval:null,
                avatar: require('./res/avatar.png'),
                viewFormate: $rootScope.$$platform == 'Mobile' ? 'imageOnly':'imageAndText'
                // wsConnected:$q.defer(),
                // stompClient:null,
                // swConnectedOnce:false
            });

            broadcastService.subscribe('scroll:scroll',()=>{

                let $document = $(document);
                if( !scope.updating  && $document.scrollTop() + $window.innerHeight >= $document.height() - 500){

                    scope.updating = true;
                    scope.getImageList(scope);
                }
            })





            scope.showDetailImage = function(image,imageId){

                $state.go('imageSearch.detailImageContainer', {
                    imageId: imageId,
                    image:image,
                    scrollPosition:$(document).scrollTop()
                });
            }
            scope.getImageList(scope);
            scope.enableLiveMode = function(){

                // console.log($angular_webSocket);
                // $angular_webSocket.connect('http://54.222.169.16',localStorage._scopeAccessToken.split(' ')[1]);
                // $angular_webSocket.startStreaming(scope.imageCtr.scopeId);
                // $angular_webSocket.subscribe(function(data){
                //
                //     data.forEach(function (ele) {
                //
                //         scope.imageCtr.pendingImageArr.push(ele);
                //     })
                //
                // })
                // scope.imageCtr.liveModeInterval = $interval(function(){
                //
                //     if(scope.imageCtr.pendingImageArr.length){
                //
                //         $timeout(function(){
                //             var ob = scope.imageCtr.pendingImageArr.pop();
                //             scope.imageCtr.imageArr.unshift(ob);
                //             // scope.imageCtr.imageArr.push(ob);
                //         })
                //         scope.$broadcast('masonry.reload');
                //     }
                //
                // },5000)

                // WSFactory.conntect(scope.imageCtr);
                // if(!scope.imageCtr.swConnectedOnce) {
                //
                //     scope.imageCtr.swConnectedOnce = true;
                //     WSFactory.startStreaming(scope.imageCtr);
                //     WSFactory.subscribe(scope.imageCtr, function (data) {
                //
                //         data.forEach(function (ele) {
                //
                //             scope.imageCtr.pendingImageArr.push(ele);
                //
                //         })
                //
                //     })
                // }
                // scope.imageCtr.liveModeInterval = $interval(function(){
                //
                //     if(scope.imageCtr.pendingImageArr.length){
                //
                //         $timeout(function(){
                //             var ob = scope.imageCtr.pendingImageArr.pop();
                //             scope.imageCtr.imageArr.unshift(ob);
                //             scope.$broadcast('masonry.reload');
                //             // scope.imageCtr.imageArr.push(ob);
                //         })
                //         scope.$broadcast('masonry.reload');
                //     }
                //
                // },5000)
                //
                //
                // WSFactory.conntect(scope.imageCtr.stompClient,scope.imageCtr.wsConnected);

                scope.liveModeInterval = $interval(function(){

                    switch(scope.searchType){

                        case 'photo':
                            MediaFactory.getImageGeneral(0 , 10, Date.now(), scope.searchContent,$rootScope.userType).then(function(res){

                                for(var i = 0 ; i < res.data.data.length; i++) {

                                    var push = true;

                                    for(var j = 0; j < Math.min(20,scope.imageArr.length); j ++){


                                        if(res.data.data[i].id == scope.imageArr[j].id){

                                            push = false;
                                        }

                                    }

                                    if(push){

                                        $timeout(function(){

                                            scope.imageArr.unshift(res.data.data[i]);
                                            scope.$broadcast('masonry.reload');
                                        })

                                        scope.$broadcast('masonry.reload');
                                        break;
                                    }else{

                                    }
                                }

                            });


                            break;

                        case 'scope':

                            MediaFactory.getScopeGeneral(scope.searchId, 0 , 10, Date.now() ,$rootScope.userType).then(function(res){


                                for(var i = 0 ; i < res.data.data.length; i++) {

                                    var push = true;

                                    for(var j = 0; j < Math.min(20,scope.imageArr.length); j ++){

                                        if(res.data.data[i].id == scope.imageArr[j].id){

                                            push = false;
                                        }

                                    }

                                    if(push){

                                        $timeout(function(){

                                            scope.imageArr.unshift(res.data.data[i]);
                                        })

                                        scope.$broadcast('masonry.reload');

                                        break;
                                    }else{

                                    }
                                }

                            })

                            break;

                        case 'location':
                            var lat = scope.searchId.split(',')[0];
                            var lng = scope.searchId.split(',')[1];
                            MediaFactory.getMapImageGeneral( 0, 10,Date.now(),2500,lng,lat,$rootScope.userType).then(function(res){

                                for(var i = 0 ; i < res.data.data.length; i++) {

                                    var push = true;

                                    for(var j = 0; j < Math.min(20,scope.imageArr.length); j ++){

                                        if(res.data.data[i].id == scope.imageArr[j].id){

                                            push = false;
                                        }

                                    }

                                    if(push){

                                        scope.imageArr.unshift(res.data.data[i]);
                                        break;
                                    }else{

                                    }
                                }
                            })
                    }

                },5000)
            }
            //
            //
            // scope.determineOriginalText  = function(image){
            //
            //     if(image){
            //         switch(image.sourceType){
            //
            //          case'SM':
            //              return 'scope';
            //
            //         case 'IN':
            //
            //             return  'instagram';
            //
            //         case 'WB':
            //
            //             return  'weibo';
            //
            //         case 'TW':
            //             return 'twitter';
            //
            //         case 'FL':
            //
            //             return 'flickr';
            //
            //         case 'FS':
            //
            //             return 'foursquare';
            //
            //         case 'PX':
            //             return '500px';
            //
            //             case 'PN':
            //                 return 'panoramio';
            //     }
            //     }
            //
            // }
            //
            //
            // scope.determineOriginalIcon = function(image){
            //
            //     switch(image.sourceType){
            //
            //         case'SM':
            //             return '';
            //             break;
            //
            //         case 'IN':
            //
            //             return  'instagram'
            //             break;
            //
            //         case 'WB':
            //
            //             return  'weibo'
            //             break;
            //
            //         case 'TW':
            //             return 'twitter';
            //             break;
            //
            //         case 'FL':
            //
            //             return 'flickr';
            //             break;
            //
            //         case 'FS':
            //
            //             return 'foursquare';
            //             break;
            //
            //     }
            // }
            //
            // scope.limiteDescription = function(description){
            //
            //     if(description != null)
            //         return description.length > 100 ? description.substr(0,99) + '...': description;
            //     else
            //         return '';
            // }
            //
            // scope.showDetailImage = function(image,imageId){
            //
            //     $state.go('imageSearch.detailImageContainer', {
            //         imageId: imageId,
            //         image:image,
            //         scrollPosition:$(document).scrollTop()
            //     });
            // }
            //
            // scope.$on('$stateChangeSuccess',function(){
            //
            //     $('.ui.dropdown')
            //         .dropdown()
            //     ;
            // })
            //
            // broadcastService.subscribe('scroll:scroll',function(){
            //
            //     if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 500) {
            //
            //         if (scope.updating == false) {
            //             scope.updating = true;
            //                 _getImageList();
            //         }
            //     }
            //
            // })
            //
            // function _pushDisplayImage(res) {
            //
            //
            //     if (scope.imageCtr.imageArr == null) {
            //
            //         scope.imageCtr.imageArr = res.data.data;
            //         scope.updating = false;
            //         if(res.data.data.length == 0){
            //             scope.imageCtr.showErrorMessage = true;
            //         }else{}
            //
            //     } else {
            //
            //         $timeout(function(){
            //
            //             Array.prototype.push.apply(scope.imageCtr.imageArr, res.data.data);
            //             scope.$broadcast('masonry.reload');
            //         })
            //
            //     }
            //
            //     if (res.data.data.length >= scope.imageCtr.pageSize) {
            //
            //         $timeout(function() {
            //             scope.updating = false
            //         }, 1000);
            //
            //     } else {
            //
            //         $('loadinganimation').fadeOut();
            //     }
            // }
            //
            //
            // scope.$on('$destroy',function(){
            //
            //     broadcastService.unsubscribe(['scroll:scroll']);
            //
            //     if(scope.imageCtr.liveModeInterval != null){
            //
            //         $interval.cancel(scope.imageCtr.liveModeInterval);
            //     }
            //     if(scope.imageCtr.canceler != null){
            //
            //         scope.imageCtr.canceler.resolve();
            //     }
            //     WSFactory.disconnect(scope.imageCtr);
            // })
            //
            //
            //
            // scope.determineOriginal = function(image){
            //
            //     if(image.sourceOwner){
            //
            //     switch(image.sourceType){
            //
            //         case'SM':
            //         return  '#/user/' + image.owner.id;
            //         break;
            //
            //         case 'IN':
            //         if(image.sourceOwner != null)
            //             return  'https://instagram.com/' + image.sourceOwner.username;
            //         break;
            //
            //         case 'WB':
            //         return 'http://weibo.com/'  + image.sourceOwner.id;
            //         break;
            //
            //         case 'TW':
            //         return 'https://twitter.com/' + image.sourceOwner.username;
            //         break;
            //
            //
            //         case 'PX':
            //             return 'https://500px.com/' + image.sourceOwner.username.replace(/ /g,'');
            //         break;
            //
            //     }}
            // }
            //
            // scope.getShotTime = function(shotTime){
            //
            //     var second = (Date.now() - shotTime)* 0.001;
            //     var minutes = second / 60;
            //     var hour = minutes / 60;
            //
            //
            //     if(minutes < 1){
            //
            //         return Math.floor(second) + ' seconds ago';
            //     }
            //
            //
            //     if(hour < 1){
            //
            //         return Math.floor(minutes) + ' minutes ago';
            //
            //     }
            //
            //     var day = hour / 24;
            //
            //     if(day < 1){ return Math.floor(hour) + ' hours ago'; }
            //
            //     var week = day / 7;
            //
            //     if(week < 1){return Math.floor(day) + ' days ago';}
            //
            //     return Math.floor(week) + ' weeks ago';
            //
            // }
            //
            // function _getImageList (){
            //
            //     scope.updating = true;
            //     switch(scope.imageCtr.searchType){
            //
            //         case 'photo':
            //             MediaFactory.getImageGeneral(scope.imageCtr.pageNo ++ , scope.imageCtr.pageSize, scope.imageCtr.timeStamp, scope.imageCtr.searchContent,$rootScope.userType,scope.imageCtr.canceler.promise).then(function(res){
            //                 _pushDisplayImage(res);
            //             })
            //
            //
            //         break;
            //
            //         case 'scope':
            //
            //             MediaFactory.getScopeGeneral(scope.imageCtr.searchId,scope.imageCtr.pageNo ++ , scope.imageCtr.pageSize, scope.imageCtr.timeStamp,$rootScope.userType,scope.imageCtr.canceler.promise).then(function(res){
            //                 _pushDisplayImage(res);
            //             })
            //
            //         break;
            //
            //         case 'location':
            //             var lat = scope.imageCtr.searchId.split(',')[0];
            //             var lng = scope.imageCtr.searchId.split(',')[1];
            //             MediaFactory.getMapImageGeneral(scope.imageCtr.pageNo ++,scope.imageCtr.pageSize,scope.imageCtr.timeStamp,2500,lng,lat,$rootScope.userType,scope.imageCtr.canceler.promise).then(function(res){
            //
            //                 _pushDisplayImage(res);
            //             })
            //     }
            //
            // }
            //
            // _getImageList();

        }
    }




}]);