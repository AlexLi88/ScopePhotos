export default Angular =>{

    const presentAndShare = Angular.module('app.presentAndShare',[]);
    require('./presentandshare.css');
    var NinjaSlider = require('./js/ninjaslider/ninja-slider');
    var template = require('./presentandshare.html');
    var googlePlaySrc = require('./res/googlePlay.png');
    var appStoreSrc = require('./res/appStore.png');
    require('./presentandshare.js')(presentAndShare,template,googlePlaySrc,appStoreSrc,NinjaSlider);
}