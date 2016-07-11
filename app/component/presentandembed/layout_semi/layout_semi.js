export default presentAndEmbed =>{

    require('./layout_semi.scss');
    presentAndEmbed.directive('semilayout',['imageListView_fac','$stateParams','$q','$interval','MediaFactory','$rootScope',(imageListView_fac,$stateParams,$q,$interval,MediaFactory,$rootScope)=>{

        return{

            scope:true,
            template:require('./layout_semi.html'),
            link:function(scope, element, attrs){



                for(var m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }

                scope.initScope(scope,{

                    pageNo: 0,
                    pageSize: 50,
                    searchType:'scope',
                    timeStamp:Date.now(),
                    curScope: null,
                    imageArr: null,
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    viewMode: "Presentation",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    viewFormate: 'imageAndText',
                    replacingIndex: 0
                });


                scope.getImageList(scope);
                scope.enableLiveMode = function(){


                    scope.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.scopeId, 0 , 10, Date.now(),$rootScope.userType).then(function(res){

                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.imageArr[j].id){

                                        push = false;
                                    }

                                }

                                if(push){
                                    $timeout(function(){
                                    scope.imageArr.unshift(res.data.data[i]);})
                                    break;
                                }else{

                                }
                            }

                        })
                    },5000)
                }
            }
        }



    }])}
