export default presentAndEmbed =>{

    require('./float_three.scss');
    presentAndEmbed.directive('floatthree',['$stateParams','$q','$interval','MediaFactory','$rootScope','$timeout','imageListView_fac',($stateParams,$q,$interval,MediaFactory,$rootScope,$timeout,imageListView_fac)=>{

        return{

            scope:true,
            template:require('./float_three.html'),
            link:function(scope, element, attrs){


                for(var m in imageListView_fac){

                    scope[m] = imageListView_fac[m];
                }

                scope.initScope(scope,{

                    pageNo: 50,
                    pageSize: 50,
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


                scope.image = null;
                scope.image2 = null;
                scope.image3 = null;


                scope.enableLiveMode = function(){


                    scope.liveModeInterval = $interval(function(){

                        MediaFactory.getScopeGeneral( scope.scopeId, 0 , 3, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = false;

                                // for(var j = 0; j < Math.min(50,scope.imageArr.length); j ++){
                                //
                                //     if(res.data.data[i].id == scope.imageArr[j].id){
                                //
                                //         push = false;
                                //     }
                                //
                                // }

                                if(res.data.data[i].id != scope.image.id && res.data.data[i].id != scope.image2.id && res.data.data[i].id != scope.image3.id){

                                    push = true;

                                }

                                if(push){

                                    if(scope.presentationInterval != null) $interval.cancel(scope.presentationInterval)


                                    var curDiv = $($('.img_container')[scope.replacingIndex %3]);
                                    scope.imageArr.unshift (res.data.data[i]);
                                    scope.imageArr.pop();
                                    // scope.imageArr.pop ();
                                    // scope.imageArr.unshift (res.data.data[i]);
                                    curDiv.removeClass('floating');
                                    curDiv.hide();
                                    switch(scope.replacingIndex % 3){

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

                                                scope.displayingIndex = -1;
                                                displayInterval();
                                            }
                                        });

                                    scope.replacingIndex ++;
                                    break;

                                }else{

                                }
                            }

                        })
                    },5000)
                }


                function displayInterval(){

                    if(scope.presentationInterval == null) {


                        scope.presentationInterval = $interval(function () {

                            scope.displayingIndex++;
                            scope.displayingIndex = scope.displayingIndex == scope.imageArr.length ? 0 : scope.displayingIndex++;

                            var curDiv = $($('.img_container')[scope.replacingIndex % 3]);
                            // scope.imageArr.pop ();
                            // scope.imageArr.unshift (res.data.data[i]);
                            curDiv.removeClass('floating');
                            curDiv.hide();

                            switch (scope.replacingIndex % 3) {

                                case 0:
                                    scope.image = scope.imageArr[scope.displayingIndex]
                                    break;
                                case 1:
                                    scope.image2 = scope.imageArr[scope.displayingIndex]
                                    break;
                                case 2:
                                    scope.image3 = scope.imageArr[scope.displayingIndex]
                                    break;
                            }


                            $timeout(function () {
                                curDiv
                                    .transition({
                                        animation: 'fade down',
                                        duration: '2s',
                                        onComplete: function () {
                                            curDiv.addClass('floating');
                                            curDiv.removeClass('transition');
                                            curDiv.removeClass('visible');
                                        }
                                    });
                            })


                            scope.replacingIndex++;

                        }, 10000)

                    }

                }



                init();
                scope.$on('$destroy',function(){


                    $interval.cancel(scope.presentationInterval);

                    scope.unSubscribe(scope);
                })
                function init(){

                    if(scope.scopeId){

                        scope.updating = true;
                        MediaFactory.getScopeGeneral(scope.scopeId,0 , scope.pageSize, Date.now(),$rootScope.userType).then(function(res){

                            if(scope.curScope == null) scope.curScope = res.data.scope;
                            scope.imageArr = res.data.data;
                            scope.image =  scope.imageArr[0];
                            scope.image2 =  scope.imageArr[1];
                            scope.image3 =  scope.imageArr[2];
                            scope.updating = false;
                            displayInterval();


                        })

                    }
                }

            }
        }



    }])}
