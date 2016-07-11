export default ngModule => {

    console.log(ngModule)
    const usersearch = ngModule.module('app.userSearch', []);
    require('./usersearch.css');
    var template = require('./usersearch.html');
    require('./usersearch')(usersearch,template);
}