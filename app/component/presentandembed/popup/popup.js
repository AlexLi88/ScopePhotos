export default presentAndEmbed =>{

    require('./popup.scss');
    presentAndEmbed.directive('popup',['broadcastService','$timeout',(broadcastService,$timeout)=>{

        return{

            scope:true,
            resctrict:'AE',
            template:require('./popup.html'),
            link:function(scope){


                scope.pupupCtr = {

                    image:null
                }

                function _init() {

                    broadcastService.subscribe('presentAndEmbed::detailImage', function (e,image) {

                        $timeout(function(){

                            scope.pupupCtr.image = image;
                            $('#popup_main').show();
                            $('html').css('overflow-y','hidden')
                        })
                    })

                }

                scope.closeDetailView = function(){

                    $('html').css('overflow-y','auto')
                    $('#popup_main').hide();
                    scope.pupupCtr.image = null;

                }


                scope.$on('$destory',function(){

                    broadcastService.unSubscribe(['presentAndEmbed::detailImage']);
                })


                _init();

            }
        }



    }])}
