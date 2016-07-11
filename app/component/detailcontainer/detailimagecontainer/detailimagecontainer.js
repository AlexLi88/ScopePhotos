angular.module('app.detailImageContainer',[]).directive('detailimagecontainer',['$stateParams','MediaFactory','$rootScope','$state',($stateParams,MediaFactory,$rootScope,$state)=>{

        require('./detailimagecontainer.css');
    return {

        restrict:'AE',
        scope:true,
        template:require('./detailimagecontainer.html'),
        link:function(scope){

            $('html').css('overflow-y','hidden');

            scope.detailCtr = {

                    imageId : $stateParams.imageId,
                    userId:$stateParams.userId,
                    image:null,
                    scrollPosition: $stateParams.scrollPosition,
                    from:$stateParams.from
            }

            scope.likeI=require('./res/like.png');
            scope.commentI=require('./res/comment.png');
            scope.viewI=require('./res/view.png');


            scope.formateCount = function(count){


                if(parseInt(count) >= 1000){

                    count = count/1000 + 'K';
                }

                return count;

            }

            scope.closeDetailView = function(){
                
                if($stateParams.from == 'user.photo'){

                    $state.go('user.photo');

                }else if($stateParams.scopeId != null){


                    $state.transitionTo('presentandshare.layout_basic',{scopeId:$stateParams.scopeId},{reload:false})

                }

                else if($stateParams.searchType == null){

                    if($stateParams.searchId != null){


                        $state.transitionTo('mapSearch',{searchId:$stateParams.searchId},{reload:false})


                    }else{

                        $state.transitionTo('mapSearch',{searchContent:$stateParams.searchContent},{reload:false})

                    }
                }
                else {

                    $state.transitionTo('imageSearch', {
                        searchType: $stateParams.searchType,
                        searchContent: $stateParams.searchContent,
                        searchId: $stateParams.searchId
                    }, {reload: false})
                }
            }


            function _retriveImage (){



                if($stateParams.image != null){


                     scope.detailCtr.image = $stateParams.image;
                        $('#detail_image_container')
                            .transition('slide down')
                        ;

                }else{

                    MediaFactory.getGeneral(scope.detailCtr.imageId).then(function(res){

                                scope.detailCtr.image = res.data;
                                $('#detail_image_container')
                                    .transition('slide down')
                                ;


                    })
                    
                    


                // if($rootScope.userType == 'user'){
                //     MediaFactory.getGeneral(scope.detailCtr.imageId).then(function(res){
                //
                //         scope.detailCtr.image = res.data;
                //         $('#detail_image_container')
                //             .transition('slide down')
                //         ;
                //
                //
                //     })
                // }else{
                //
                //     MediaFactory.getGuest(scope.detailCtr.imageId).then(function(res){
                //         scope.detailCtr.image = res.data;
                //         $('#detail_image_container')
                //             .transition('slide down')
                //         ;
                //
                //     })
                // }

            }

            }

            _retriveImage();

            scope.$on('$destroy',function(){
                $('html').css('overflow-y','auto');
                $(document).scrollTop( scope.detailCtr.scrollPosition);
            })

        }
    }







}]).filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]).directive('html5vfix', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            attr.$set('src', attr.vsrc);
        }
    }
});