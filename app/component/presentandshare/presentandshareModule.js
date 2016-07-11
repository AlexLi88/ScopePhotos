export default Angular =>{
    
    const presentAndShare = Angular.module('app.presentAndShare',[]);
    require('./layout_basic/layout_basic.js')(presentAndShare);
    // require('./float_five/float_five.js')(presentAndShare);
    // require('./float_three/float_three.js')(presentAndShare);
    // require('./single_image/single_image.js')(presentAndShare);
    // require('./compact/compact.js')(presentAndShare);
    require('./presentandshare.css');
    var NinjaSlider = require('./js/ninjaslider/ninja-slider');
    var template = require('./presentandshare.html');
    var googlePlaySrc = require('./res/googlePlay.png');
    var appStoreSrc = require('./res/appStore.png');
    var scopeLogo = require('./res/logoW.png');
    require('./presentandshare.js')(presentAndShare,template,googlePlaySrc,appStoreSrc,scopeLogo);
}