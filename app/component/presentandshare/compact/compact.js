export default presentAndShare =>{

    require('./compact.css');
    presentAndShare.directive('compact',['presentAndShare_factory','$stateParams','presentAndShare_const','$q','$interval','MediaFactory','$rootScope',(presentAndShare_factory,$stateParams,presentAndShare_const,$q,$interval,MediaFactory,$rootScope)=>{

        return{

            scope:true,
            template:require('./compact.html'),
            link:function(scope, element, attrs){

                scope.pasCtr = {
                    pageNo: presentAndShare_const.pageNo,
                    pageSize: 35,
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

                        MediaFactory.getScopeGeneral( scope.pasCtr.scopeId, 0 , 10, Date.now(),$rootScope.userType).then(function(res){


                            for(var i = 0 ; i < res.data.data.length; i++) {

                                var push = true;

                                for(var j = 0; j < Math.min(50,scope.pasCtr.imageArr.length); j ++){

                                    if(res.data.data[i].id == scope.pasCtr.imageArr[j].id){

                                        push = false;
                                    }

                                }

                                if(true){

                                    var number = Math.floor(Math.random() * 20)
                                   var curDiv = $($('.photoManagement_oneImage')[number]);
                                       curDiv.css('opacity','0')
                                       $(curDiv.find('img')[1]).attr('src',res.data.data[i].retina.url);
                                        scope.$broadcast('masonry.reload');
                                        curDiv.animate({opacity:1},1500,function(){

                                            curDiv.transition('pulse')
                                        });
                                    // curDiv.animate({opacity:0},1500,function(){

                                        // $(curDiv.find('img')[1]).attr('src',res.data.data[i].retina.url);
                                        // curDiv.animate({opacity:1},500);

                                    // $(curDiv.find('img')[1]).attr('src',res.data.data[i].retina.url);
                                    // curDiv.css('opcity',1);
                                    break;

                                    // // console.log($('.photoManagement_oneImage')[0])
                                    // // $($('.photoManagement_oneImage')[0]).removeClass('floating')
                                    // // // // $($('.photoManagement_oneImage')[0]).transition('fade down')
                                    // // // scope.pasCtr.imageArr[0] = res.data.data[0];
                                    // // // // $($('.photoManagement_oneImage')[0]).transition('fade up')
                                    // scope.pasCtr.imageArr.unshift(res.data.data[i]);
                                    // break;


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
