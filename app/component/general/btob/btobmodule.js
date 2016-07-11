export default Angular =>{

    const btob = Angular.module('app.btob',[]);
    require('./btob.css');
    var template = require('./btob.html');
    var background = require('./res/background_B2B.png');

    var audience_icon = require('./res/audience_icon.png');
    var big_screens_icon = require('./res/big_screens_icon.png');
    var business_icon = require('./res/business_icon.png');
    var events_icon = require('./res/events_icon.png');
    var share_icon = require('./res/share_icon.png');
    var signin_background = require('./res/signin_background.jpg');

    //var googlePlaySrc = require('./res/googlePlay.png');
    //var appStoreSrc = require('./res/appStore.png');
    require('./btob.js')(btob,template,background,audience_icon,big_screens_icon,business_icon,events_icon,share_icon,signin_background);
}