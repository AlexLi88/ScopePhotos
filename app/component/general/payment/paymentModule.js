export default (Angular) =>{

    const payment = Angular.module('app.payment',[]);
    // require('./layout_basic/layout_basic.js')(presentAndEmbed);
    // require('./float_five/float_five.js')(presentAndEmbed);
    // require('./float_three/float_three.js')(presentAndEmbed);
    // require('./single_image/single_image.js')(presentAndEmbed);
    // require('./compact/compact.js')(presentAndEmbed);
    require('./payment.scss');
    var template = require('./payment.html');
    // var googlePlaySrc = require('./res/googlePlay.png');
    // var appStoreSrc = require('./res/appStore.png');
    // var scopeLogo = require('./res/logoW.png');
    require('./payment.js')(payment,template);
    require('./proceed/proceed')(payment);
    require('./itemlist/itemlist')(payment);



}