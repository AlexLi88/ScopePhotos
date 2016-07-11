export default Angular =>{

    const intro = Angular.module('app.intro', []);
    var appStr = require('./res/appstr.png');
    var gooStr = require('./res/googlestr.png');
    var appStrD = require('./res/appStrDark.png');
    var gooStrD = require('./res/gooStrDark.png');
    var searchI = require('./res/search.svg');
    var ajpg = require('./res/1.jpg');
    var bjpg = require('./res/2.jpg');
    var cjpg = require('./res/3.jpg');
    var djpg = require('./res/4.jpg');
    var ejpg = require('./res/5.jpg');
    var fjpg = require('./res/6.jpg');
    var gjpg = require('./res/7.jpg');
    var hjpg = require('./res/8.jpg');
    var ijpg = require('./res/9.jpg');
    var jjpg = require('./res/10.jpg');
    var kjpg = require('./res/11.jpg');
    var ljpg = require('./res/12.jpg');
    var mjpg = require('./res/13.jpg');
    var njpg = require('./res/14.jpg');
    var ojpg = require('./res/15.jpg');
    var pjpg = require('./res/16.jpg');
    var ip6s = require('./res/ip6s.png');
    var appMoc = require('./res/appMoc.png');
    var macBook = require('./res/mac_book.png');
    var background_B2B = require('./res/background_B2B.png');
    var social_icons = require('./res/social_icons_top.png');
    var screens = [require('./res/screen1.png'),]
    var download_icon = require('./res/download_icon.png');

    var mockUp_phone = require('./res/mock_up/iphone.png');
    var mockup_sc_autoTag = require('./res/mock_up/AutoTagYourPhotos.png');
    var mockup_sc_create = require('./res/mock_up/Create_Your_Own_Events.png');
    var mockup_sc_findD= require('./res/mock_up/FindDirectionsPeopleLandmarksandmore.png');
    var mockup_sc_findI = require('./res/mock_up/FindImagesByLocation.png');


    var icons =

        {LocationAndTimeBasedAlbums:{

            u:require('./res/Location&TimeBasedAlbums.png'),
            s:require('./res/SLocation&TimeBasedAlbums.png')
        },

        RevolutionaryTaggingTechnology:{

            u:require('./res/RevolutionaryTaggingTechnology.png'),
            s:require('./res/SRevolutionaryTaggingTechnology.png')



        },
        FindImagesByLocation:{

            u:require('./res/FindImagesByLocation.png'),
            s:require('./res/SFindImagesByLocation.png')



        },
        DirectionsToPhotoLocations:{

            u:require('./res/DirectionsToPhotoLocations.png'),
            s:require('./res/SDirectionsToPhotoLocations.png')
        }

        }






    var template = require('./intro.html');
    require('./intro.css');
    require('./intro.scss');
    require('./intro.js')(intro,template,appStr,gooStr, ajpg, bjpg, cjpg, djpg, ejpg, fjpg, gjpg, hjpg, ijpg, jjpg, kjpg, ljpg, mjpg, njpg, ojpg, pjpg, ip6s, icons, screens, appStrD, gooStrD, searchI, appMoc, macBook, background_B2B, social_icons, download_icon, mockUp_phone, mockup_sc_autoTag, mockup_sc_create, mockup_sc_findD, mockup_sc_findI);


}