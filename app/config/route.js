export default (ngModule, Angular, $script) => {

    ngModule.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.common.Authorization = 'Basic c2V5bW91ci13ZWI6YVJiYXoyOWR2aUIlITpxLTBwMTV0';

        $urlRouterProvider.otherwise("/main");

        $stateProvider.state('mainPage', {

            template: "<scopeintro></scopeintro>",
            url: "/main",
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/intro/introModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.intro'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }],

                getUserType: function ($q, $timeout, $rootScope, $interval) {

                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                }
            }
        })


        $stateProvider.state('login', {

            template: "<login></login>",
            url: "/login",
            params: {

                init: null,
                ref: null,


            }

        })


        $stateProvider.state('imageSearch', {

            template: "<imagesearch></imagesearch>",
            url: "/imagesearch?:searchType&:searchContent&:searchId",

            resolve: {

                getUserType: function ($q, $timeout, $rootScope, $interval) {

                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                }
            }
        })


        $stateProvider.state('imageSearch.detailImageContainer', {

            template: "<div detailimagecontainer></div>",
            url: '/detailiamge/:imageId',
            params: {

                scrollPosition: null,
                image: null
            }

        })

        $stateProvider.state('presentandshare.layout_basic.detailImageContainer', {

            template: "<div detailimagecontainer></div>",
            url: '/detailiamge/:imageId',
            params: {

                scrollPosition: null,
                image: null
            }

        })

        $stateProvider.state('presentandshare.layout_basic', {
            url: '/basic',
            template: "<layoutbasic></layoutbasic>",
            params: {

                pasCtr: null
            }
        })

        $stateProvider.state('presentandembed', {

            url: '/presentandembed/:option',
            template: "<presentandembed></presentandembed>",
            resolve: {

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {

                    let deferred = $q.defer();
                    require.ensure([], function () {

                        let module = require('../component/presentandembed/presentandembedModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.presentAndEmbed'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],

                getUserType: function ($q, $timeout, $rootScope, $interval) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);
                        }

                    }, 500);

                    return deferred.promise;
                }
            },
            onEnter: function () {
                $('#footer_main').hide();
            }
        })

        $stateProvider.state('presentandembed.layout_basic', {
            //url:'/basic',
            template: "<basiclayout></basiclayout>",
            params: {

                scopeId: null
            }
        })

        $stateProvider.state('presentandembed.float_5', {
            //url:'/float_5',
            template: "<floatfive></floatfive>",
            params: {

                scopeId: null
            }
        })

        $stateProvider.state('presentandembed.float_3', {
            //url:'/float_3',
            template: "<floatthree></floatthree>",
            params: {

                scopeId: null
            }
        })

        $stateProvider.state('presentandembed.layout_semi', {
            //url:'/float_3',
            template: "<semilayout></semilayout>",
            params: {

                scopeId: null
            }
        })


        $stateProvider.state('presentandembed.single_image', {
            //url:'/single_image',
            template: "<singleimage></singleimage>",
            params: {

                scopeId: null
            }
        })


        $stateProvider.state('presentandembed.compact', {
            //url:'/compact',
            template: "<compact></compact>",
            params: {

                scopeId: null
            }
        })


        $stateProvider.state('download', {

            template: "<div download></div>",
            url: '/download'

        })


        $stateProvider.state('scopeSearch', {

            template: "<scopesearch></scopesearch>",
            url: "/scopesearch?:searchType&:searchContent&:searchId",
            resolve: {

                getUserType: function ($q, $timeout, $rootScope, $interval) {

                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                }
            }
        })

        $stateProvider.state('userSearch', {

            template: "<usersearch></usersearch>",
            url: "/usersearch?:searchContent",
            resolve: {

                getUserType: function ($q, $timeout, $rootScope, $interval) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                },

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/search/usersearch/usersearchModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.userSearch'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }
        })


        $stateProvider.state('btob', {

            template: "<btob></btob>",
            url: "/btob",
            resolve: {

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/btob/btobmodule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.btob'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }

        })

        $stateProvider.state('mapSearch', {

            template: "<mapsearch></mapsearch>",
            url: "/mapsearch?:searchId&:searchType&:searchContent",
            resolve: {

                getUserType: function ($q, $timeout, $rootScope, $interval) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                },

                getMap: function ($q, $timeout, $rootScope) {
                    $script("https://maps.googleapis.com/maps/api/js?key=AIzaSyCUT06-5BqOp6N5wi7TMK-e75yM4EMXm4k");
                    // $script("http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js");
                    var deferred = $q.defer();
                    $timeout(function () {

                        deferred.resolve(google != null);

                    }, 1000);

                    return deferred.promise;
                },

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/search/mapsearch/mapsearchModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.mapSearch'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }
        })


        $stateProvider.state('mapSearch.detailImageContainer', {

            template: "<div detailimagecontainer></div>",
            url: '/detailiamge/:imageId',
            params: {

                scrollPosition: null,
                image: null
            }

        })

        $stateProvider.state('blog', {
            url: '/blog',
            template: "<blog></blog>",
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/footeritem/blog/blogModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.blog'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }

        })


        $stateProvider.state('faq', {
            url: '/faq',
            template: "<faq></faq>",
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/footeritem/faq/faqModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.faq'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }

        })

        $stateProvider.state('aboutUs', {
            url: '/aboutus',
            template: "<aboutus></aboutus>",
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/footeritem/About Us/aboutusModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.aboutUs'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }

        })

        $stateProvider.state('policy', {
            url: '/policy',
            template: "<policy></policy>"
        })
        $stateProvider.state('service', {
            url: '/service',
            template: "<service></service>"
        })


        // $stateProvider.state('presentandshareDefault',{
        //
        //     url:'/presentandshare/',
        //     onEnter:function(){
        //         //$state.go('presentandshare');
        //     }
        // })


        $stateProvider.state('payment.proceed', {

            template: '<paymentproceed></paymentproceed>',
            params: {

                item: null
            }
        })

        $stateProvider.state('payment.itemlist', {

            template: '<paymentitemlist></paymentitemlist>',
            params: {

                item: null
            }
        })


        $stateProvider.state('payment', {

            url: '/payment',
            template: "<payment></payment>",
            resolve: {

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {

                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/general/payment/paymentModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.payment'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],

                getUserType: function ($q, $timeout, $rootScope, $interval) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);
                        }

                    }, 500);

                    return deferred.promise;
                }
            }
        })


        $stateProvider.state('presentandshare', {

            url: '/presentandshare/:scopeId',
            template: "<presentandshare></presentandshare>",
            resolve: {

                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {

                    let deferred = $q.defer();
                    require.ensure([], function () {

                        let module = require('../component/presentandshare/presentandshareModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.presentAndShare'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                  }],

                getUserType: function ($q, $timeout, $rootScope, $interval) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            deferred.resolve(true);
                        }

                    }, 500);

                    return deferred.promise;
                }
            }
        })
        //


        $stateProvider.state('user', {
            url: '/user/:userId',
            template: "<usermanagement></usermanagement>",
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../component/usermanagement/usermanagementModule.js')(Angular);
                        $ocLazyLoad.load({
                            name: 'app.userManagement'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }],

                getUserType: function ($q, $timeout, $rootScope, $interval, $state) {


                    var deferred = $q.defer();
                    var waitUtil = $interval(function () {

                        if ($rootScope.userType != null) {

                            $interval.cancel(waitUtil);
                            if ($rootScope.userType != 'user') {

                                $state.go('mainPage');
                            }
                            deferred.resolve(true);

                        }

                    }, 500);

                    return deferred.promise;
                }
            }

        })

        $stateProvider.state('user.photo', {
            url: '/photo',
            template: "<userphotomanagement></userphotomanagement>",
            params: {

                numOfMedia: null
            }

        })

        $stateProvider.state('user.scope', {
            url: '/scope',
            template: "<userscopemanagement></userscopemanagement>",
            params: {

                numOfEvent: null
            }

        })


        $stateProvider.state('user.photo.detailImageContainer', {

            template: "<div detailimagecontainer></div>",
            url: '/detailiamge/:imageId',
            params: {

                scrollPosition: null,
                userId: null,
                from: null
            }

        })


        $stateProvider.state('user.editScope', {

            template: "<editscope></editscope>",
            url: '/editscope/:scopeId',
        })


        $stateProvider.state('user.following', {

            template: "<userfollowingmanagement></userfollowingmanagement>",
            url: '/following'
        })

        $stateProvider.state('user.favorite', {

            template: "<userfavoritemanagement></userfavoritemanagement>",
            url: '/favorite',
        })

        $stateProvider.state('user.follower', {

            template: "<userfollowermanagement></userfollowermanagement>",
            url: '/follower'
        })

        $stateProvider.state('embed', {

            template: "<embed></embed>",
            url: '/embed/:scopeId',
            onEnter: function () {

                $('#website_header').hide();
            },
            onExit: function () {

                $('#website_header').hide();
            }
        })


    })

}