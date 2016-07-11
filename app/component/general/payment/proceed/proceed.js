export default(payment,template)=> {

    payment.directive('paymentproceed', ['$rootScope','$state','$stateParams','$location','ProductFactory','OrderFactory','$timeout',function($rootScope,$state,$stateParams,$location,ProductFactory,OrderFactory,$timeout) {


        require('./proceed.scss')

        return {

            scope: {},
            template: require('./proceed.html'),
            restrict: 'AE',
            replace: 'true',
            link: function (scope) {


                scope.proCtr  = {

                    order:null
                }


                scope.cards = require('./res/card.png');
                scope.payPalSettings = {

                    paypal:{business:'paul.tan-facilitator@pantoscopemedia.com',
                            currency_code:'CAD'
                    }

                }
                scope.item = {};
                scope.item.type = 'invoice'
                scope.payPalSettings.paypal.service_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
                var host = $location.protocol() + '://'+ $location.host() +':'+  $location.port() ;
                scope.notifyUrl = "https://api.scopephotos.com/v1/ipn"; // + $scope.orderId;
                scope.returnUrl = host + "/#/payment";
                scope.cancelReturnUrl = host + "/#/payment";


                scope.generatePayment = function(){

                    OrderFactory.placeOrder({

                        total:123,
                        orderItems:[{

                            productId:10,
                            quantity:1,
                            amount:123,
                            total:123

                        }]

                    }).then(function(res){

                        if(res){

                            scope.proCtr.order = res.data;
                            $timeout(function(){

                                console.log(scope.proCtr.order )
                                $('#paypal_form').submit();
                            })

                        }
                        console.log(res);

                    })
            

                }

                // function retriveProduct(sku){
                //
                //     ProductFactory.retriveSkuProduct(sku).then(function(res){
                //
                //
                //     })
                //
                // }


                // scope.subscribeItem = function(item){
                //
                //     console.log($rootScope);
                //     if($rootScope.userType == 'visitor'){
                //
                //         $state.go('login',{ref:{state:'payment',item:item}})
                //
                //     }
                // }

                init();
                function init(){

                    // console.log($stateParams)
                    // ProductFactory.retriveSkuProduct(scope.item.sku).then(function(res)

                    if(scope.item.type=='invoice'){

                        ProductFactory.retriveSkuProduct(123).then(function(res){

                            scope.item = res.data;
                            scope.item.type = 'invoice';
                        })

                    }else{


                    }

                }
            }

        }


    }])

}