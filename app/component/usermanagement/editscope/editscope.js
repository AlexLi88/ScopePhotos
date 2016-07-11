export default userManagement =>{

    require('./editscope.css');
    userManagement.directive('editscope',['$stateParams','MediaFactory','$state','toaster','broadcastService',($stateParams,MediaFactory,$state,toaster,broadcastService)=>{

        return{

            template:require('./editscope.html'),
            link:function(scope,ele,attr){

                scope.editScopeCtrl = {

                    scopeInfo:null,
                    scopeId:$stateParams.scopeId,
                    imageArr:[],
                    curatedArr:[],
                    pageSize:20,
                    pageNo:0,
                    scopeImageCount:null,
                    timeStamp:Date.now()
                }

                scope.returnToUserScope = function(){

                    $state.go('user.scope');


                }
                scope.editBasicInfo = function(){

                    broadcastService.publish('usermanagement::editScope',scope.editScopeCtrl.scopeInfo);

                }

                function _getScope(){

                    MediaFactory.getScopeInfo(scope.editScopeCtrl.scopeId).then(function(res){

                        scope.editScopeCtrl.scopeInfo = res.data;
                    });

                }

                function _pushDisplayImage(res){

                    scope.editScopeCtrl.imageArr = res.data.data;
                }

                scope.curateImage = function(image,$event){

                    $($event.target).parent().hide();

                        MediaFactory.curateImage(scope.editScopeCtrl.scopeId,image.id,image).then(function(res){

                            if(res.data['result'] == 'OK'){

                                image.curated = !image.curated;
                                //toaster.pop('info','Scope setting updated')
                                $($event.target).parent().fadeIn(1500);
                            }
                        })


                    //MediaFactory.curateImage()
                    //image.curated = true;



                }

                function _getModerate(){


                    MediaFactory.getModerateImages(scope.editScopeCtrl.scopeId, scope.editScopeCtrl.pageNo, scope.editScopeCtrl.pageSize, scope.editScopeCtrl.timeStamp).then(function(res){

                        _pushDisplayImage(res);
                    })
                }

                function _getImageList(){

                }

                _getScope();
                _getModerate();

            }

        }
    }])
}