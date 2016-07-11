module.exports = function (angular) {
    angular.factory('imageListView_fac', ['$stateParams', '$q', '$rootScope', 'MediaFactory', '$timeout', 'broadcastService', '$window', '$state', '$interval', function ($stateParams, $q, $rootScope, MediaFactory, $timeout, broadcastService, $window, $state, $interval) {

        return {

            initScope: function (scope, properties) {
                for (let p in properties) scope[p] = properties[p];
                var self = this;
                this.initSubscribe(scope);
                scope.$on('$destroy',() => {
                    self.unSubscribe(scope);
                })
            },

            getImageList: function (scope) {

                var self = this;
                scope.updating = true;
                switch (scope.searchType) {

                    case 'photo':
                    {
                        MediaFactory.getImageGeneral(scope.pageNo++, scope.pageSize, scope.timeStamp, scope.searchContent, $rootScope.userType).then(function (res) {
                            self.pushDisplayImage(res, scope);
                        })
                        break;
                    }



                    case 'scope':
                    {

                        MediaFactory.getScopeGeneral(scope.scopeId, scope.pageNo++, scope.pageSize, scope.timeStamp, $rootScope.userType).then(function (res) {
                            self.pushDisplayImage(res, scope);
                        })
                        break;

                    }


                    case 'location':
                    {
                        let lat,lng;
                        [lat,lng] = scope.searchId.split(',');
                        MediaFactory.getMapImageGeneral(scope.pageNo++, scope.pageSize, scope.timeStamp, 2500, lng, lat, $rootScope.userType).then(function (res) {
                            self.pushDisplayImage(res, scope);
                        })
                        break;

                    }
                }


            },

            showDetailImage: function (image) {

                broadcastService.publish('presentAndEmbed::detailImage', image);
            },

            limiteDescription: function (content) {

                if (content != null)
                    return content.length > 100 ? content.substr(0, 99) + '...' : content;
                else
                    return '';
            },
            getShotTime: function (shotTime) {

                var second = (Date.now() - shotTime) * 0.001;
                var minutes = second / 60;
                var hour = minutes / 60;


                if (hour < 1) {

                    return Math.floor(minutes) + ' mins ago';

                }

                var day = hour / 24;

                if (day < 1) {
                    return Math.floor(hour) + ' hours ago';
                }

                var week = day / 7;

                if (week < 1) {
                    return Math.floor(day) + ' days ago';
                }

                return Math.floor(week) + ' weeks ago';


            },

            determineOriginalText: function (image) {

                if (image) {
                    switch (image.sourceType) {

                        case'SM':
                            return 'scope';

                        case 'IN':

                            return 'instagram';

                        case 'WB':

                            return 'weibo';

                        case 'TU':

                            return 'Tumbler'

                        case 'TW':
                            return 'twitter';

                        case 'FL':

                            return 'flickr';

                        case 'FS':

                            return 'foursquare';

                        case 'PX':
                            return '500px';

                        case 'PN':
                            return 'panoramio';

                    }
                }

            },
            determineOriginalIcon: function (image) {

                if (image) {
                    switch (image.sourceType) {

                        case'SM':
                            return '';
                            break;

                        case 'IN':

                            return 'instagram'
                            break;

                        case 'WB':

                            return 'weibo'
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
            },

            determineOriginal: function (image) {

                if (image && image.sourceOwner) {

                    switch (image.sourceType) {

                        case'SM':
                            return '#/user/' + image.owner.id;
                            break;

                        case 'IN':
                            if (image.sourceOwner != null)
                                return 'https://instagram.com/' + image.sourceOwner.username;
                            break;

                        case 'WB':
                            return 'https://weibo.com/' + image.sourceOwner.id;
                            break;

                        case 'TW':
                            return 'https://twitter.com/' + image.sourceOwner.username;
                            break;

                        case 'FL':

                            return 'https://www.flickr.com/photos/' + image.sourceOwner.id;
                            break;

                        case 'PX':
                            return 'https://500px.com/' + image.sourceOwner.username.replace(/ /g, '');
                            break;

                        case 'TU':

                            return 'https://' + image.sourceOwner.id;
                            break;


                    }
                }
            },


            pushDisplayImage: function (res, scope) {


                if (scope.imageArr == null) {

                    scope.imageArr = res.data.data;
                    scope.updating = false;
                    if (res.data.data.length == 0) {

                        scope.showErrorMessage = true;
                    } else {
                    }

                } else {

                    $timeout(function () {
                        Array.prototype.push.apply(scope.imageArr, res.data.data);
                    })

                }

                if (res.data.data.length >= scope.pageSize) {

                    $timeout(function () {
                        scope.updating = false
                    }, 1000);

                } else {

                    $('loadinganimation').fadeOut();
                }
            },

            initSubscribe: function (scope) {

                broadcastService.subscribe('imageSearch::imageAndText', function () {

                    if (scope.viewFormate != 'imageAndText') {

                        $timeout(function () {

                            scope.viewFormate = 'imageAndText';
                            scope.$broadcast('masonry.reload');
                        })

                    }
                })

                broadcastService.subscribe('imageSearch::imageOnly', function () {


                    if (scope.viewFormate != 'imageOnly') {

                        $timeout(function () {
                            scope.viewFormate = 'imageOnly';
                            scope.$broadcast('masonry.reload');
                        })
                    }
                })


                broadcastService.subscribe('imageSearch::liveModeEnable', function () {


                    if (!scope.liveModeEnable) {

                        scope.liveModeEnable = true;
                        scope.enableLiveMode();

                    } else {

                        if (scope.liveModeInterval != null) {

                            $interval.cancel(scope.liveModeInterval)
                        }

                        scope.liveModeEnable = false;
                    }


                })

            },

            unSubscribe: function (scope) {

                broadcastService.unsubscribe(['imageSearch::imageAndText', 'imageSearch::imageLarge', 'imageSearch::liveModeEnable', 'imageSearch::imageOnly','scroll:scroll']);

                if (scope.liveModeInterval != null) {

                    $interval.cancel(scope.liveModeInterval);
                }

                if (scope.presentationInterval != null) {

                    $interval.cancel(scope.presentationInterval);
                }
                if (scope.canceler != null) {

                    scope.canceler.resolve();
                }
            }

        }

    }])

}