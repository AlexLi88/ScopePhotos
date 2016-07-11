export default Angular =>{

    const userManagement = Angular.module('app.userManagement', []);
    require('./userphotomanagement/userphotomanagementModule.js')(userManagement);
    require('./userscopemanagement/userscopemanagementModule.js')(userManagement);
    require('./userfollowingmanagement/userfollowingmanagement.js')(userManagement);
    require('./userfollowermanagement/userfollowermanagement.js')(userManagement);
    require('./userfavoritemanagement/userfavoritemanagement.js')(userManagement);
    require('./editpopup/editpopup.js')(userManagement);
    require('./editscope/editscope.js')(userManagement);
    require('./usermanagement.css');
    var template = require('./usermanagement.html');
    require('./usermanagement.js')(template,userManagement);

}