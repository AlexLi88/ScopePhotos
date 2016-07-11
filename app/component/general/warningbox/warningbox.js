angular.module('app.warningBox',[]).directive('warningbox',['broadcastService','$rootScope','$state',(broadcastService,$rootScope,$state)=>{


    require('./warningbox.css');
    return{

        restrict:'AE',
        template:require('./warningbox.html'),
        replace:true,
        link:function(scope){

            scope.googlePlaySrc = require('./res/googlePlay.png');
            scope.appStoreSrc = require('./res/appStore.png');

            scope.boxCtr = {

                type:null
            }

            broadcastService.subscribe('warningBox::getOurApp',function(){

                scope.boxCtr.type="getOurApp";
                $('.ui.modal')
                    .modal('show')
                ;


            })

            scope.closeModal = function(){

                $('#warningbox_main')
                    .modal('hide')
                ;

            }

            scope.confirmDeleteImage = function(){

                broadcastService.publish('warningBox::confirmDeleteImage');
                $('#warningbox_main')
                    .modal('hide')
                ;
            }

            broadcastService.subscribe('warningBox::deleteImage',function(){

                scope.boxCtr.type="deleteImage";
                $('#warningbox_main')
                    .modal('show')
                ;

            })


            broadcastService.subscribe('warningBox::deleteScope',function(){

                scope.boxCtr.type="deleteScope";
                $('#warningbox_main')
                    .modal('show')
                ;

            })

            scope.confirmDeleteScope = function(){

                broadcastService.publish('warningBox::confirmDeleteScope');
                $('#warningbox_main')
                    .modal('hide')
                ;

            }

        }
    }



}])