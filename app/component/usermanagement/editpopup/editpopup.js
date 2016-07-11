export default userManagement =>{

    require('./editpopup.css');

    userManagement.directive('editpopup',['broadcastService','toaster','MediaFactory',(broadcastService,toaster,MediaFactory)=>{

        return{

            template:require('./editpopup.html'),
            link:function(scope){


                scope.popupCtr = {


                    editType:null,
                    editImage:null,
                    editScope:null,
                    editUser:null

                }

                scope.$on('$destory',function(){

                    broadcastService.unsubscribe(['usermanagement::editImage','usermanagement::editScope']);

                })

                scope.hideEditPopup  = function(){

                    $('#edit_pop_up').fadeOut();
                }

                scope.deleteTag = function(text){


                    if(scope.popupCtr.editType == 'image') {

                        for (var i = 0; i < scope.popupCtr.editImage.tags.length; i++) {

                            if (scope.popupCtr.editImage.tags[i].text == text) {

                                scope.popupCtr.editImage.tags.splice(i, 1);

                            }
                        }

                    }

                    else if(scope.popupCtr.editType == 'scope'){

                        for (var i = 0; i < scope.popupCtr.editScope.tags.length; i++) {

                            if (scope.popupCtr.editScope.tags[i].text == text) {

                                scope.popupCtr.editScope.tags.splice(i, 1);

                            }
                        }

                    }


                }

                scope.saveChange = function(){

                    if(scope.popupCtr.editType == 'image'){

                        MediaFactory.updateImage(scope.popupCtr.editImage.id,scope.popupCtr.editImage ).then((res) => {


                           if(res.data.result=='OK'){


                               toaster.pop('info','Image information has been updated');
                               $('#edit_pop_up').hide();
                           }
                        })

                    }else if(scope.popupCtr.editType = 'scope'){

                        MediaFactory.updateScope(scope.popupCtr.editScope.id,scope.popupCtr.editScope ).then((res) => {

                            if(res.data.result=='OK'){

                                toaster.pop('info','Scope information has been updated');
                                $('#edit_pop_up').hide();
                            }
                        })

                    }

                }

                scope.addTag = function(newTag){


                    if(scope.popupCtr.editType == 'image') {

                        var existed = false;

                        for (var i = 0; i < scope.popupCtr.editImage.tags.length; i++) {

                            if (scope.popupCtr.editImage.tags[i].text == newTag) {

                                existed = true;
                            }
                        }

                        if (!existed) {

                            scope.popupCtr.editImage.tags.push({text: newTag, probability: 1})

                        } else {

                            toaster.pop('error', 'tag already existed in the list');
                        }

                    }

                    else if (scope.popupCtr.editType == 'scope'){

                        if(scope.popupCtr.editScope.tag == null){

                            scope.popupCtr.editScope.tag = [];
                        }

                        scope.popupCtr.editScope.tag.push({text: newTag, probability: 1});

                    }
                    newTag = '';

                }

                broadcastService.subscribe('usermanagement::editImage',function(event,para){

                    $('#edit_pop_up').hide();
                    scope.popupCtr.editType = 'image';
                    MediaFactory.getGeneral(para.id).then(function(res){

                        scope.popupCtr.editImage = res.data;
                        $('#edit_pop_up').fadeIn();

                    })
                })

                broadcastService.subscribe('usermanagement::editScope',function(event,para){

                    $('#edit_pop_up').hide();
                    scope.popupCtr.editType = 'scope';
                    MediaFactory.getScopeInfo(para.id).then(function(res){

                        scope.popupCtr.editScope = res.data;
                        $('#edit_pop_up').fadeIn();

                    })
                })

            }

        }
    }])
}