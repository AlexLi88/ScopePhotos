export default presentAndEmbed =>{

    require('./compact.scss');
    presentAndEmbed.directive('compact',['$stateParams','$q','$interval','MediaFactory','$rootScope','imageListView_fac',($stateParams,$q,$interval,MediaFactory,$rootScope,imageListView_fac)=>{

        return{

            scope:true,
            template:require('./compact.html'),
            link:function(scope, element, attrs){



                for(var m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }

                scope.initScope(scope,{

                    pageNo: 0,
                    pageSize: 50,
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

                        MediaFactory.getScopeGeneral( scope.scopeId, 0 , 10, Date.now(),$rootScope.userType).then(function(res){

                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.imageArr[j].id){

                                        push = false;
                                    }

                                }


                                if(push){

                                    var number = Math.floor(Math.random() * 20)
                                    var curDiv = $($('.photoManagement_oneImage')[number]);
                                    curDiv.css('opacity','0')
                                    $(curDiv.find('img')[0]).attr('src',res.data.data[i].retina.url);
                                    scope.imageArr[number].id = res.data.data[i].id;
                                    scope.$broadcast('masonry.reload');
                                    curDiv.animate({opacity:1},1500,function(){

                                        curDiv.transition('pulse')
                                    });

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
