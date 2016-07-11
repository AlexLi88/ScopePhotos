export default (mapsearch,template)=>{

    mapsearch.directive('mapsearch',['MediaFactory','$rootScope','$state','$stateParams','toaster','broadcastService','$timeout','$window','$interval','imageListView_fac',function(MediaFactory,$rootScope,$state,$stateParams,toaster,broadcastService,$timeout,$window,$interval,imageListView_fac){

        return{

            restrict:'AE',
            scope:false,
            template:template,
            link:function(scope){


                for(let m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }
                scope.initScope(scope,{

                    map:null,
                    searchId:$stateParams.searchId,
                    searchType:$stateParams.searchType,
                    searchContent:$stateParams.searchContent,
                    marker:null,
                    markerIcon:new google.maps.MarkerImage(
                        require('./res/marker.png'),
                        null, /* size is determined at runtime */
                        null, /* origin is 0,0 */
                        null, /* anchor is bottom center of the scaled image */
                        new google.maps.Size(22.5, 27)
                    ),
                    radius:500,
                    pageSize:35,
                    pageNo:0,
                    imageArr:null,
                    mapMarker:null,
                    timeStamp:Date.now(),
                    locationLatitude:49.25,
                    locationLongitude:-123.133333,
                    viewFormate:'imageAndText'
                })

                broadcastService.subscribe('scroll:scroll',function(){

                    if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 500) {

                        if (scope.updating == false) {
                            scope.updating = true;
                            _getMapImage();
                        }
                    }

                })


                scope.$on('$stateChangeSuccess',function(){

                    $('.ui.dropdown')
                        .dropdown()
                    ;
                })



                scope.determineOriginal = function(image){

                    if(image.sourceOwner){

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

                        }}
                }


                function _pushDisplayImage(res) {

                    // google.maps.event.trigger(scope.map, 'resize');
                    if (scope.imageArr == null) {

                        scope.imageArr = res.data.data;
                        scope.updating = false;
                        $('#image_search_list').fadeIn();

                        if(res.data.data.length == 0){

                            scope.showErrorMessage = true;
                        }

                    } else {

                        Array.prototype.push.apply(scope.imageArr, res.data.data);
                    }

                    if (res.data.data.length >= scope.pageSize) {

                        $timeout(function() {
                            scope.updating = false
                        }, 1000);

                    } else {

                        // $('loadinganimation').fadeOut();
                    }

                }

                scope.getMapImage = function(){

                    $('#image_search_list').hide();
                    scope.imageArr = [];
                    _getMapImage();

                }

                scope.searchForLocation = function(){

                    new google.maps.Geocoder().geocode({
                        'address': scope.searchingLocation
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {

                            scope.$apply(function(){

                                scope.searchingLocation = results[0].formatted_address;
                                scope.map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));

                            })
                        }
                    });
                }

                function _getMapImage(){

                    scope.updating = true;

                    if(scope.searchId != null){

                        MediaFactory.getGeneral(scope.searchId,$rootScope.userType).then(function(res){
                            scope.map.setCenter(new google.maps.LatLng(res.data.location.latitude, res.data.location.longitude));
                            scope.mapMarker = new google.maps.Marker({
                                position: {lat: res.data.location.latitude, lng: res.data.location.longitude},
                                map: scope.map
                            });
                            res.data.data = [res.data];
                            _pushDisplayImage(res);
                            scope.searchId = null;
                        })

                    }else{

                        MediaFactory.getMapImageGeneral(scope.pageNo ++ ,scope.pageSize,scope.timeStamp, scope.radius,scope.map.center.lng(),scope.map.center.lat(),$rootScope.userType).then(function(res) {
                            scope.locationLatitude = scope.map.center.lat();
                            scope.locationLongitude = scope.map.center.lng();
                            _pushDisplayImage(res);
                        },function(){

                            scope.updating = false;
                        })

                    }}

                scope.getCurrentLocation = function(){

                    if(navigator.geolocation) {

                        navigator.geolocation.getCurrentPosition(function(position) {
                            var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                            scope.map.setCenter(initialLocation);
                        });

                    }
                }

                scope.showDetailImage = function(image,imageId){

                    $state.go('mapSearch.detailImageContainer', {
                        imageId: imageId,
                        image:image,
                        scrollPosition:$(document).scrollTop()
                    });
                }

                scope.limiteDescription = function(description){

                    if(description != null)
                        return description.length > 100 ? description.substr(0,99) + '...': description;
                    else
                        return '';
                }


                function _initMap (cenLat,cenLog){

                    scope.map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: cenLat, lng: cenLog},
                        zoom: 13,
                        scrollwheel: false,
                        disableDefaultUI: true,
                        draggable: false
                    });

                    scope.mapMarker = new google.maps.Marker({
                        position: {lat: cenLat, lng: cenLog},
                        map: scope.map,
                        icon:scope.markerIcon
                    });

                }


                if(scope.searchContent != null){


                    new google.maps.Geocoder().geocode({
                        'address': scope.searchContent
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {

                            _initMap(results[0].geometry.location.lat(),results[0].geometry.location.lng())
                            _getMapImage();
                        }else{

                            toaster.pop('error','The input address is invalid.')
                            _initMap(49.25,-123.133333);
                            _getMapImage();

                        }
                    });




                }else{

                    _initMap(49.25,-123.133333);
                    _getMapImage();
                }


            }
        }
    }])
}