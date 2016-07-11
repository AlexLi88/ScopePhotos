export default Angular =>{

    const blog = Angular.module('app.blog', []);
    var clock = require('./res/clock.png');
    var mock_up = require('./res/app_mock_up.png');
    var template = require('./blog.html');
    require('./blog.scss');
    require('./blog.js')(blog,clock,template,mock_up);
}