export default presentAndEmbed =>{

    require('./single_image.css');
    require('./single_image.scss');
    presentAndEmbed.directive('singleimage',['presentAndEmbed_factory','$stateParams','presentAndEmbed_const','$q','$interval','MediaFactory','$rootScope','$timeout',(presentAndEmbed_factory,$stateParams,presentAndEmbed_const,$q,$interval,MediaFactory,$rootScope,$timeout)=>{

        return{

            scope:true,
            template:require('./single_image.html'),
            link:function(scope, element, attrs){

                scope.pasCtr = {
                    pageNo: presentAndEmbed_const.pageNo,
                    pageSize: 3,
                    curScope: null,
                    imageArr: null,
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    viewMode: "Presentation",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    presentationInterval:null,
                    viewFormate: 'imageAndText',
                    displayingIndex: 0
                }

                scope.enableLiveMode = function(){

                    scope.pasCtr.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.pasCtr.scopeId, 0 , 20, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = false;

                                for(var j = 0; j < Math.min(50,scope.pasCtr.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.pasCtr.imageArr[j].id){

                                        push = false;
                                    }

                                }


                                if(push){

                                    if(scope.pasCtr.presentationInterval != null){

                                        $interval.cancel(scope.pasCtr.presentationInterval);
                                        scope.pasCtr.imageArr.unshift (res.data.data[i]);
                                        scope.pasCtr.imageArr.pop();
                                        scope.pasCtr.displayingIndex = -1;
                                        displayInterval();
                                    }


                                }else{

                                }
                            }

                        })
                    },100000)
                }

                init();
                presentAndEmbed_factory.initSubscribe(scope);
                scope.$on('$destroy',function(){

                    if(scope.pasCtr.presentationInterval){
                        $interval.cancel(scope.pasCtr.presentationInterval)
                    }
                    presentAndEmbed_factory.unSubscribe(scope);
                })
                scope.presentAndEmbed_factory = presentAndEmbed_factory;

                function displayInterval(){

                    scope.pasCtr.presentationInterval = $interval(function(){

                        scope.pasCtr.displayingIndex ++;
                        scope.pasCtr.displayingIndex = scope.pasCtr.displayingIndex == scope.pasCtr.imageArr.length ? 0 : scope.pasCtr.displayingIndex ++;
                        var curDiv = $('.photoManagement_oneImage')
                        curDiv.hide();
                        scope.image = scope.pasCtr.imageArr[scope.pasCtr.displayingIndex];
                        $timeout(function(){
                            curDiv.transition({
                                animation  : 'fade right',
                                duration   : '1.5s',
                                onComplete : function() {
                                    curDiv.removeClass('transition');
                                    curDiv.removeClass('visible');
                                }
                            });})

                    },10000)

                }
                function init(){
                    scope.updating = true;
                    MediaFactory.getScopeGeneral(scope.pasCtr.scopeId,0 , 50, Date.now(),$rootScope.userType,scope.pasCtr.canceler.promise).then(function(res){

                        if(scope.pasCtr.curScope == null) scope.pasCtr.curScope = res.data.scope
                        scope.pasCtr.imageArr = res.data.data;
                        scope.image = scope.pasCtr.imageArr[scope.pasCtr.displayingIndex];
                        scope.updating = false;
                        displayInterval(res);

                    })
                }

            }
        }



    }])}
