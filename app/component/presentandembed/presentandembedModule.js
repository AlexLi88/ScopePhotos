

export default Angular =>{

    const presentAndEmbed = Angular.module('app.presentAndEmbed',[]);
    require('./layout_basic/layout_basic.js')(presentAndEmbed);
    require('./float_five/float_five.js')(presentAndEmbed);
    require('./float_three/float_three.js')(presentAndEmbed);
    require('./single_image/single_image.js')(presentAndEmbed);
    require('./compact/compact.js')(presentAndEmbed);
    require('./layout_semi/layout_semi.js')(presentAndEmbed);
    require('./popup/popup.js')(presentAndEmbed);
    require('./presentandembed.css');
    var template = require('./presentAndEmbed.html');
    var googlePlaySrc = require('./res/googlePlay.png');
    var appStoreSrc = require('./res/appStore.png');
    var scopeLogo = require('./res/logoW.png');
    require('./presentandembed.js')(presentAndEmbed,template,googlePlaySrc,appStoreSrc,scopeLogo);
}