export default presentAndEmbed =>{

    require('./float_five.scss');
    presentAndEmbed.directive('floatfive',['imageListView_fac','$stateParams','$q','$interval','MediaFactory','$rootScope',(imageListView_fac,$stateParams,presentAndEmbed_const,$q,$interval,MediaFactory,$rootScope)=>{

        return{

            scope:true,
            template:require('./float_five.html'),
            link:function(scope, element, attrs){

                for(var m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }

                scope.initScope(scope,{

                    pageNo: 0,
                    pageSize: 5,
                    timeStamp:Date.now(),
                    curScope: null,
                    imageArr: null,
                    searchType:'scope',
                    scopeId: $stateParams.scopeId,
                    liveModeEnable: false,
                    liveModeInterval: null,
                    replacingIndex: 0,
                    displayingIndex:3,
                    presentationInterval:null
                });

                scope.enableLiveMode = function(){

                    scope.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.scopeId, 0 , 5, Date.now(),$rootScope.userType).then(function(res){

                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.imageArr[j].id){

                                        push = false;
                                    }

                                }

                                if(push){
                                    var curDiv = $($('.photoManagement_oneImage')[4]);
                                    scope.imageArr.pop ();
                                    scope.imageArr.unshift (res.data.data[i]);
                                    curDiv.removeClass('floating');
                                    var curDiv;
                                    curDiv.hide();
                                    break;
                                }else{

                                }
                            }

                        })
                    },5000)
                }

                scope.getImageList(scope);

            }
        }



    }])}
