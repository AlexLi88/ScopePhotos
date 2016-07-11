export default (blog,clock,template,mock_up) => {


    blog.directive('blog',['$http','toaster',function($http,toaster){

        return{

            restrict:'AE',
            scope:true,
            template:template,
            link:function(scope){

                scope.pressCtr = {

                    clock:clock,
                    mock_up:mock_up
                }
            }
        }
    }])
}
