export default ngModule => {

    const aboutUs = ngModule.module('app.aboutUs', []);
    require('./aboutus.scss');
    var template = require('./aboutus.html');
    var upper_bg = require('./res/background.jpg');
    var join = require('./res/join_to_our_team.png');
    var loc = require('./res/location_icon.png');
    var vang = require('./res/vang_ilustrastion.png')
    require('./aboutus')(aboutUs,template,upper_bg,join,loc,vang);
}