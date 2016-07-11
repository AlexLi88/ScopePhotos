export default userManagement =>{

    require('./userphotomanagement.css');
    userManagement.directive('userphotomanagement',['$stateParams','MediaFactory','$state','toaster','broadcastService','$timeout','$window','$rootScope',($stateParams,MediaFactory,$state,toaster,broadcastService,$timeout,$window,$rootScope)=>{

        return{

            template:require('./userphotomanagement.html'),
            link:function(scope,ele,attr){

                scope.userPhotoManagementCtr = {

                    pageSize:20,
                    pageNo:0,
                    userId:$stateParams.userId,
                    numOfMedia:$stateParams.numOfMedia,
                    imageArray:[],
                    userType:null,
                    deleteImg:null,
                    deleteEve:null,
                    showErrorMessage:false
                }

                scope.likeI=require('./res/like.png');
                scope.commentI=require('./res/comment.png');
                scope.editI=require('./res/edit.png');
                scope.viewI=require('./res/view.png');

                scope.updating = true;
                scope.userPhotoManagementCtr.userType =  scope.userPhotoManagementCtr.userId  == $rootScope.userInfo.id ? 'owner':'visitor';
                //
                //$('.special.cards .image').dimmer({
                //    on: 'hover'
                //});

                scope.formateCount = function(count){


                    if(parseInt(count) >= 1000){

                        count = count/1000 + 'K';
                    }

                    return count;

                }

                function _pushDisplayImage(res) {

                    if (scope.userPhotoManagementCtr.imageArr == null) {

                        scope.userPhotoManagementCtr.imageArr = res.data.data;
                        scope.updating = false
                        if(res.data.data.length == 0){

                           scope.userPhotoManagementCtr.showErrorMessage = true;
                        }

                    } else {

                        Array.prototype.push.apply(scope.userPhotoManagementCtr.imageArr, res.data.data);
                    }

                    if (res.data.data.length >= scope.userPhotoManagementCtr.pageSize) {

                        $timeout(function() {
                            scope.updating = false
                        }, 1000);

                    } else {

                        $('loadinganimation').fadeOut();
                    }


                }

                scope.showDimmer = function($event){

                    $($event.currentTarget).dimmer('show');
                }

                scope.hideDimmer = function($event){

                    $($event.currentTarget).dimmer('hide');
                }

                scope.showDetailImage = function(imageId){

                    $state.go('user.photo.detailImageContainer', {
                        imageId: imageId,
                        scrollPosition:$(document).scrollTop(),
                        from:'user.photo'
                    });
                }

                scope.editImage = function(image,$event){

                    $event.stopPropagation();
                    broadcastService.publish('usermanagement::editImage',image);
                }

                scope.deleteImage = function(image,event){

                        scope.userPhotoManagementCtr.deleteImg = image;
                        scope.userPhotoManagementCtr.deleteEve = event;
                        broadcastService.publish('warningBox::deleteImage');


                    //
                    //MediaFactory.del(image.id).then(function(res){
                    //
                    //
                    //    if(res.data.result == 'OK') {
                    //
                    //        toaster.pop('info', 'Selected image has been deleted');
                    //        angular.element(event.target).parent().parent().fadeOut();
                    //        broadcastService.publish('userPhotoManagement::del');
                    //    }
                    //
                    //})

                }



                broadcastService.subscribe('warningBox::confirmDeleteImage',function(){

                    MediaFactory.del(scope.userPhotoManagementCtr.deleteImg.id).then(function(res){


                        if(res.data.result == 'OK') {

                            toaster.pop('info', 'Selected image has been deleted');
                            angular.element(scope.userPhotoManagementCtr.deleteEve.target).parent().parent().fadeOut();
                            broadcastService.publish('userPhotoManagement::del');
                        }

                    })


                })

                broadcastService.subscribe('scroll:scroll',function(){

                    if ($(document).scrollTop() + $window.innerHeight >= $(document).height() - 500) {

                        if (scope.updating == false) {
                            scope.updating = true;
                            scope.getImageList();
                        }
                    }

                })

                scope.$on('$destroy',function(){

                    broadcastService.unsubscribe(['scroll:scroll']);
                })


                scope.getImageList  = function() {

                        MediaFactory.getUserImage(scope.userPhotoManagementCtr.userId,scope.userPhotoManagementCtr.pageNo ++, scope.userPhotoManagementCtr.pageSize)
                            .then(function(res){

                                _pushDisplayImage(res);

                            })
                }


                scope.getImageList();

            }


        }
    }])
}