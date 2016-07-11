export default ngModule => {

    const mapsearch = ngModule.module('app.mapSearch', []);
    require('./mapsearch.css');
    var template = require('./mapsearch.html');
    require('./mapsearch.js')(mapsearch,template);
}