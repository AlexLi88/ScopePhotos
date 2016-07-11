export default ngModule => {

    const faq = ngModule.module('app.faq', []);
    require('./faq.css');
    var template = require('./faq.html');
    var arrow_u = require('./res/arrow_u.png');
    var arrow_d = require('./res/arrow_d.png');


    var directions = require('./res/directions.png');
    var hidephotos = require('./res/hidephotos.png');
    var map = require('./res/map.png');
    var platforms = require('./res/platforms.png');
    var recommend = require('./res/recommend.png');


    require('./faq')(faq,template,arrow_u,arrow_d,directions,hidephotos,map,platforms,recommend);
}