export default (ngModule, Angular, $script) => {

    ngModule.run(['$rootScope', ($rootScope) => {


        $rootScope.$$platform = 'Computer';

        if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {

            $rootScope.$$platform = 'Mobile';
        }
    }])

    ngModule.factory('localStorageFac', [()=> {

        return {

            set: (name, data)=> {

                if (Angular.isObject(data)) {

                    data = Angular.toJson(data);
                }
                localStorage.setItem(name, data);
            },

            get: (name)=> {

                if (localStorage[name]) {

                    try {

                        return JSON.parse(localStorage[name]);

                    } catch (e) {

                        return localStorage[name];
                    }
                }
            },

            del: (name)=> {

                return delete localStorage[name];
            }


        }

    }])
}
