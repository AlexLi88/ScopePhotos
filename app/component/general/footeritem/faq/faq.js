export default (faq,template,arrow_u,arrow_d,directions,hidephotos,map,platforms,recommend) =>{

    faq.directive('faq',[function(){

        return{

            restrict:'AE',
            scope:true,
            template:template,
            link:function(scope){


                scope.faqCtr = {

                    arrow_u:arrow_u,
                    arrow_d:arrow_d,
                    directions:directions,
                    hidephotos:hidephotos,
                    map:map,
                    platforms:platforms,
                    recommend:recommend
                    
                }

                
                scope.dropDown = function($event){

                    var dropDown = $($event.currentTarget).closest('.faq_field').find('.dropdown_field')

                    var height = dropDown.find('.dropdown_content').css('height');

                    if($(dropDown).hasClass('notShow')){

                        $(dropDown).removeClass('notShow')
                        $($event.currentTarget).find('img').attr('src', scope.faqCtr.arrow_u)
                        $(dropDown).stop(true,false).animate({'max-height':height},100);

                    }else{

                        $(dropDown).addClass('notShow')
                        $($event.currentTarget).find('img').attr('src', scope.faqCtr.arrow_d);
                        $(dropDown).stop(true,false).animate({'max-height':0},100);
                    }
                    
                }

            }
        }
    }]);


}

