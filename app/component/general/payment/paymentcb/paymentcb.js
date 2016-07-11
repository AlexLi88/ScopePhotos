export default(payment)=> {

    payment.directive('paymentcb', ['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams) {


        require('./paymentcb.scss')

        return {

            scope: {},
            template: require('./paymentcb.html'),
            restrict: 'AE',
            replace: 'true',
            link: function (scope) {

                // console.log('here')
                // scope.subscribeItem = function(item){
                //
                //     console.log($rootScope);
                //     if($rootScope.userType == 'visitor'){
                //
                //         $state.go('login',{ref:{state:'payment',item:item}})
                //
                //     }
                // }

                scope.subscribeItem = function(item){

                    if($rootScope.userType == 'visitor'){

                        $state.go('login',{ref:{state:'payment',item:item}})

                    }else{

                        $state.go('payment.proceed',{item:item});
                    }


                    // console.log($rootScope);
                }


                scope.payInvoiceItem = function(item){
                    

                    if($rootScope.userType == 'visitor'){

                        $state.go('login',{ref:{state:'payment',item:item}})

                    }else{

                        $state.go('payment.proceed',{item:item});
                    }
                    
                }
            }

        }


    }])

}