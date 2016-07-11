export default(payment,template)=> {

    payment.directive('payment', ['$rootScope','$state',function($rootScope,$state){

        return {

            scope: {},
            template: template,
            restrict: 'AE',
            replace: 'true',
            link: function (scope) {


                init();
                function init(){
                    
                    if($state.current.name == 'payment'){

                        $state.go('payment.itemlist');
                    }
                    
                    
                }
            }

        }

    }])


}