export default(btob,template,background,audience_icon,big_screens_icon,business_icon,events_icon,share_icon,signin_background)=> {

    btob.directive('btob',['broadcastService','$window','BtobFactory',function(broadcastService,$window,BtobFactory){


        return{

            scope:{},
            template:template,
            link:function(scope){

                scope.bg = background;
                scope.audience_icon = audience_icon;
                scope.big_screens_icon = big_screens_icon;
                scope.business_icon = business_icon;
                scope.events_icon = events_icon;
                scope.share_icon = share_icon;
                scope.signUpSuccess = false;
                scope.signin_background = signin_background;


                broadcastService.subscribe('scroll:scroll',function(){

                    if($(document).scrollTop() >= $('#btob_main #top_container').height()/4){


                        if( $('#menu_background').css('display') == 'none') {

                            $('#menu_background').fadeIn();
                            $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','black')
                        }

                    }else{

                        if( $('#menu_background').css('display') == 'block') {

                            $('#menu_background').fadeOut();
                            $('#website_header .ui.menu .header.item, .ui.vertical.menu .header.item').css('color','white')
                        }


                    }

                })


                scope.submitBusinessPartner = function(){

                    BtobFactory.signUpBusinessPartner({

                        contactPerson:scope.signup_contactPerson,
                        contactEmail:scope.signup_contectEmail,
                        company:scope.signup_company,
                        city:scope.signup_city,
                        website:scope.signup_website,
                        phoneNumber:scope.signup_phoneNumber,
                        nob:scope.signup_nob

                    }).then(function(res){

                        if(res.data.RESULT = 'OK'){

                            $('#before_success').fadeOut(function(){

                                scope.$apply(function(){

                                    scope.signUpSuccess = true;
                                    $('#success_info').fadeIn();

                                })
                            })
                        }
                    })




                }

                scope.$on('$stateChangeSuccess',function(){

                    $window.sr = ScrollReveal({ reset: false });
                    $window.sr.reveal('.one_benefit', { duration:1000,delay: 100,
                        origin:'bottom',
                        distance : '-200px',
                        easing   : 'cubic-bezier(0, 0.98, 0.58, 1)',
                        rotate: { z: 5},
                        scale    : 1.1 }, 200);
                    $('#btob_main').fadeIn(1300)
                })



            }

















        }


    }])
}