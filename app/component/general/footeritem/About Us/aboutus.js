export default (influencer,template,upper_bg,join,loc,vang) => {

    influencer.directive('aboutus',['$http','toaster',function($http,toaster){

        return{

            restrict:'AE',
            scope:true,
            template:template,
            link:function(scope){

                scope.aboutusCtr = {

                    upper_bg: upper_bg,
                    join:join,
                    loc:loc,
                    vang:vang
                }

                scope.dropDown = function(event){

                    var target = $(event.currentTarget).closest('.right').next();
                    var height = parseInt(target.css('height')) + 50;

                    if(target.css('display') == 'none'){

                        target.show().css('height','0px').stop(true,false).animate({height:height},500);

                    }else {

                        target.stop(true,false).animate({height: 0}, 500, function(){

                            target.css('display','none')
                            target.css('height','auto');
                        })
                    }


                }

            }
        }
    }]);


}
