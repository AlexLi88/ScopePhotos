angular.module('app.termOfService',[]).directive('service',[function(){

    require('./service.css')
    return{

        restrict:'AE',
        scope:true,
        template: require('./service.html'),
        link:function(scope){

        }
    }
}]);


// angular.module('app.WebsiteHeader',[])
// .directive('websiteheader',[function(
// ){
// 	return{

// 		restrict:'AE',
// 		scope:false,
// 		templateUrl:'Site/Widget/Header/widgetheader.html'
// 	}
// }]);