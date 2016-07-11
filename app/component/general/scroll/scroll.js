export default ngModule => {


    ngModule.directive('onscroll',['broadcastService',(broadcastService)=>{


            return{

                restrict:'AE',
                link:function(scope){

                    angular.element(window).on('scroll',function(){

                        broadcastService.publish('scroll:scroll',$(document).scrollTop());
                    })
                }
            }

        }])

}