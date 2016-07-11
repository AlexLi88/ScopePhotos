const Angular = require( 'angular');
const StompJS = require('stompjs');
// const SockJS = require('SockJS');
//import 'angular-ui-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'angularjs-toaster/toaster.min';
import 'angular-ui-router/release/angular-ui-router.min';
import 'angular-masonry/angular-masonry';
import 'angular-ui-bootstrap';
import 'semantic-ui/dist/semantic.min';
import 'semantic-ui/dist/semantic.min.css';
import 'rx-angular';
// import './bower_components/ng-websocket/ng-websocket';
import './bower_components/angular-sockjs/src/index';


import './bower_components/angular-sockjs/';

const $script = require("scriptjs");

import 'imagesloaded';
import 'angular-masonry/angular-masonry';
import './config/googleAnalysis'
import './config/share'
import './service/dataService.js';
import './service/broadcastService';
import './component/general/header/header.js'
import './component/general/login/login'
import './component/general/errormessage/errormessage'
import './component/search/imagesearch/imagesearch'
import './component/search/scopesearch/scopesearch'
import './component/general/userinfobanner/userinfohanger'
import './component/detailcontainer/detailimagecontainer/detailimagecontainer'
import './component/general/searchhanger/searchhanger'
import './component/general/footer/footer'
import './config/angular-parallax/scripts/angular-parallax'
import './component/general/footeritem/policy/policy';
import './component/general/footeritem/service/service';
import './component/general/loadinganimation/loadinganimation';
import './component/phone/banner/banner';
import './component/general/warningbox/warningbox';
import './component/general/download/download';
import './component/embed/embed';

//
require ('./component/testing/angular_webSocket.js');



const ngModule = angular.module('scope_app',['bd.sockjs','rx','angular-parallax','ui.bootstrap',require('oclazyload'),require('angular-animate'),'toaster','services.data','services.broadcast','wu.masonry','app.userInfoHanger','app.searchHanger',
                                'app.header','ui.router','app.imageSearch','app.login',
                                'app.detailImageContainer','app.scopeSearch','app.footer',
                                'app.privacyPolicy','app.termOfService','app.loadingAnimation','app.banner','app.warningBox','app.errorMessage','app.download','app.embed','angular_webSocket']);
require ('./config/route')(ngModule,Angular,$script);
require ('./config/init')(ngModule,Angular);
require ('./factory/imageListView')(ngModule);
require ('./component/general/scroll/scroll')(ngModule);
angular.bootstrap(document,['scope_app']);

window.onload = function(){

    $('body').fadeIn(2000);
    // $('body').css('background','url(' + require('./noise-pattern.png') + ')');
}
