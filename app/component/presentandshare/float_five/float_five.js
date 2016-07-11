export default presentAndShare =>{

    require('./float_five.css');
    presentAndShare.directive('floatfive',['presentAndShare_factory','$stateParams','presentAndShare_const','$q','$interval','MediaFactory','$rootScope',(presentAndShare_factory,$stateParams,presentAndShare_const,$q,$interval,MediaFactory,$rootScope)=>{

        return{

            scope:true,
            template:require('./float_five.html'),
            link:function(scope, element, attrs){

                scope.pasCtr = {
                    pageNo: presentAndShare_const.pageNo,
                    pageSize: 5,
                    curScope: null,
                    imageArr: null,
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    viewMode: "Presentation",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    viewFormate: 'imageAndText',
                    replacingIndex: 0
                }


                scope.enableLiveMode = function(){


                    scope.pasCtr.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.pasCtr.scopeId, 0 , 5, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.pasCtr.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.pasCtr.imageArr[j].id){

                                        push = false;
                                    }

                                }

                                if(true){
                                    var curDiv = $($('.photoManagement_oneImage')[4]);
                                    scope.pasCtr.imageArr.pop ();
                                    scope.pasCtr.imageArr.unshift (res.data.data[i]);
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

                init();
                presentAndShare_factory.initSubscribe(scope);
                scope.$on('$destroy',function(){

                    presentAndShare_factory.unSubscribe(scope);
                })
               scope.presentAndShare_factory = presentAndShare_factory;
                function init(){
                    presentAndShare_factory.getImageList(scope);
                }

            }
        }



    }])}
