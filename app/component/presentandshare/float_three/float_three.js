export default presentAndShare =>{

    require('./float_three.css');
    presentAndShare.directive('floatthree',['presentAndShare_factory','$stateParams','presentAndShare_const','$q','$interval','MediaFactory','$rootScope','$timeout',(presentAndShare_factory,$stateParams,presentAndShare_const,$q,$interval,MediaFactory,$rootScope,$timeout)=>{

        return{

            scope:true,
            template:require('./float_three.html'),
            link:function(scope, element, attrs){

                scope.pasCtr = {
                    pageNo: presentAndShare_const.pageNo,
                    pageSize: 50,
                    curScope: null,
                    imageArr: null,
                    scopeId: $stateParams.scopeId,
                    canceler: $q.defer(),
                    viewMode: "Presentation",
                    liveModeEnable: false,
                    liveModeInterval: null,
                    viewFormate: 'imageAndText',
                    replacingIndex: 0,
                    displayingIndex:3,
                    presentationInterval:null
                }

                scope.image = null;
                scope.image2 = null;
                scope.image3 = null;




                scope.enableLiveMode = function(){


                    scope.pasCtr.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.pasCtr.scopeId, 0 , 3, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = false;

                                // for(var j = 0; j < Math.min(50,scope.pasCtr.imageArr.length); j ++){
                                //
                                //     if(res.data.data[i].id == scope.pasCtr.imageArr[j].id){
                                //
                                //         push = false;
                                //     }
                                //
                                // }

                                if(res.data.data[i].id != scope.image.id && res.data.data[i].id != scope.image2.id && res.data.data[i].id != scope.image3.id){

                                    push = true;

                                }

                                if(true){

                                    if(scope.pasCtr.presentationInterval != null) $interval.cancel(scope.pasCtr.presentationInterval)


                                    var curDiv = $($('.img_container')[scope.pasCtr.replacingIndex %3]);
                                    scope.pasCtr.imageArr.unshift (res.data.data[i]);
                                    scope.pasCtr.imageArr.pop();
                                    // scope.pasCtr.imageArr.pop ();
                                    // scope.pasCtr.imageArr.unshift (res.data.data[i]);
                                    curDiv.removeClass('floating');
                                    curDiv.hide();
                                    switch(scope.pasCtr.replacingIndex % 3){

                                        case 0:
                                            scope.image = res.data.data[i];
                                            break;
                                        case 1:
                                            scope.image2 = res.data.data[i]
                                            break;
                                        case 2:
                                            scope.image3 = res.data.data[i]
                                            break;
                                    }


                                    curDiv
                                        .transition({
                                            animation  : 'fade down',
                                            duration   : '1.5s',
                                            onComplete : function() {
                                                curDiv.addClass('floating');
                                                curDiv.removeClass('transition');
                                                curDiv.removeClass('visible');

                                                scope.pasCtr.displayingIndex = -1;
                                                displayInterval();
                                            }
                                        });

                                    scope.pasCtr.replacingIndex ++;
                                    break;

                                }else{

                                }
                            }

                        })
                    },5000)
                }


                function displayInterval(){

                    scope.pasCtr.presentationInterval = $interval(function(){

                        scope.pasCtr.displayingIndex ++;
                        scope.pasCtr.displayingIndex = scope.pasCtr.displayingIndex == 50 ? 0 : scope.pasCtr.displayingIndex ++;

                        var curDiv = $($('.img_container')[scope.pasCtr.replacingIndex %3]);
                        // scope.pasCtr.imageArr.pop ();
                        // scope.pasCtr.imageArr.unshift (res.data.data[i]);
                        curDiv.removeClass('floating');
                        curDiv.hide();
                        switch(scope.pasCtr.replacingIndex % 3){

                            case 0:
                                scope.image = scope.pasCtr.imageArr[scope.pasCtr.displayingIndex]
                                break;
                            case 1:
                                scope.image2 = scope.pasCtr.imageArr[scope.pasCtr.displayingIndex]
                                break;
                            case 2:
                                scope.image3 = scope.pasCtr.imageArr[scope.pasCtr.displayingIndex]
                                break;
                        }


                        $timeout(function(){
                            curDiv
                                .transition({
                                    animation  : 'fade down',
                                    duration   : '2s',
                                    onComplete : function() {
                                        curDiv.addClass('floating');
                                        curDiv.removeClass('transition');
                                        curDiv.removeClass('visible');
                                    }
                                });
                        })








                        scope.pasCtr.replacingIndex ++;

                    },5000)

                }



                init();
                presentAndShare_factory.initSubscribe(scope);
                scope.$on('$destroy',function(){

                    presentAndShare_factory.unSubscribe(scope);
                })
               scope.presentAndShare_factory = presentAndShare_factory;
                function init(){
                    scope.updating = true;
                    MediaFactory.getScopeGeneral(scope.pasCtr.scopeId,0 , scope.pasCtr.pageSize, Date.now(),$rootScope.userType,scope.pasCtr.canceler.promise).then(function(res){

                        if(scope.pasCtr.curScope == null) scope.pasCtr.curScope = res.data.scope;
                        scope.pasCtr.imageArr = res.data.data;
                        scope.image =  scope.pasCtr.imageArr[0];
                        scope.image2 =  scope.pasCtr.imageArr[1];
                        scope.image3 =  scope.pasCtr.imageArr[2];
                        scope.updating = false;
                        displayInterval();


                    })
                }

            }
        }



    }])}
