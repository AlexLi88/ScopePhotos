export default presentAndShare =>{

    require('./layout_basic.css');
    presentAndShare.directive('layoutbasic',['$stateParams','$q','$interval','MediaFactory','$rootScope','$state','WSFactory','$timeout','imageListView_fac',($stateParams,$q,$interval,MediaFactory,$rootScope,$state,WSFactory,$timeout,imageListView_fac)=>{

        return{

            scope:true,
            template:require('./layout_basic.html'),
            link:function(scope, element, attrs){

                for(var m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }

                scope.initScope(scope,{

                    pageNo: 0,
                    pageSize: 50,
                    curScope: null,
                    imageArr: null,
                    timeStamp:Date.now(),
                    searchType:'scope',
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    viewMode: "Presentation",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    pendingImageArr: [],
                    viewFormate: $rootScope.$$platform == 'Mobile' ? 'imageOnly':'imageAndText',
                    replacingIndex: 0,
                    wsConnected:$q.defer(),
                    stompClient:null,
                    swConnectedOnce:false
                });

                scope.showDetailImage = function(image,imageId){

                    $state.go('presentandshare.layout_basic.detailImageContainer', {
                        imageId: imageId,
                        image:image,
                        scrollPosition:$(document).scrollTop()
                    });
                }

                scope.getImageList(scope);

            }

        }



    }])


}
