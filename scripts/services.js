'use strict';

var services = angular.module('services', []);

/**
 * Gestion de l'authentification
 */
services.factory('Connection', function () {
    // Expose la méthode getConnexion
    var connection = {
        getConnection: getConnection
    }
    return connection;

    // Vérifie les valeurs fournies
    // et retourne true ou false
    function getConnection(login, mdp) {
        var OK = false;
        if ((login == "admin") && (mdp == "mdp")) {
            OK = true;
        }
        return OK;
    }
});

/**
 * Définition des urls
 */
services.factory('Config', [function () {
    return {
        urlServer: 'http://localhost:8080/EmployeesSrv/employee.php',
        urlGetEmployees: '/getEmployees',
        urlGetEmployee: '/getEmployee/',
        urlGetJobs: '/getJobs',
        urlGetDepartments: '/getDepartments',
        urlAddEmployee: '/addEmployee',
        urlUpdateEmployee: '/updateEmployee',
        urlDeleteEmployee: '/deleteEmployee/',
    };
}]);

/**
 * Gestion de l'accès aux données, utilise le
 * service Config qui contient les urls du serveur Restful.
 * Chaque méthode exposée retourne une promise qui
 * sera exploitée dans les contrôleurs
 */
services.factory('EmployeesRest', ['$http', 'Config', function ($http, Config) {
    // Liste ds méthodes exposées
    var employeeRest = {
        getEmployees: getEmployees,
        getEmployee: getEmployee,
        getDepartments: getDepartments,
        getJobs: getJobs,
        updateEmployee: updateEmployee,
        addEmployee: addEmployee,
        deleteEmployee: deleteEmployee
    };
    return employeeRest;

    function getEmployees() {
        var url = Config.urlServer + Config.urlGetEmployees;
        return $http.get(url);
    }

    function getEmployee(id) {
        var url = Config.urlServer + Config.urlGetEmployee + id;
        return $http.get(url);
    }

    function getDepartments() {
        var url = Config.urlServer + Config.urlGetDepartments;
        return $http.get(url);
    }

    function getJobs() {
        var url = Config.urlServer + Config.urlGetJobs;
        return $http.get(url);
    }

    function updateEmployee(employee) {
        var url = Config.urlServer + Config.urlUpdateEmployee;
        return $http.post(url, employee);
    }

    function addEmployee(employee) {
        var url = Config.urlServer + Config.urlAddEmployee;
        return $http.post(url, employee);
    }

    function deleteEmployee(id) {
        var url = Config.urlServer + Config.urlDeleteEmployee + id;
        return $http.post(url, id);
    }
}]);

services.factory('Commission', function () {
    var commission = {
        computeCommission: computeCommission
    };
    return commission;

    function computeCommission(employees) {
        for (var id in employees) {
            var employee = employees[id];
            employee.salary = employee.salary * 1.1;
        }
        return employees;
    }
});

services.factory('localization', ['$locale', '$rootScope', function ($locale, $rootScope) {
    // On expose la méthode setLang
    var localization = {
        setLang: setLang
    }
    return localization;

    // Changer la langue en cours
    function setLang(lang) {
        var PLURAL_CATEGORY = {
            ZERO: "zero",
            ONE: "one",
            TWO: "two",
            FEW: "few",
            MANY: "many",
            OTHER: "other"
        };

        function getDecimals(n) {
            n = n + '';
            var i = n.indexOf('.');
            return (i == -1) ? 0 : n.length - i - 1;
        }

        function getVF(n, opt_precision) {
            var v = opt_precision;

            if (undefined === v) {
                v = Math.min(getDecimals(n), 3);
            }

            var base = Math.pow(10, v);
            var f = ((n * base) | 0) % base;
            return {
                v: v,
                f: f
            };
        }
        var locales = {
            fr: {
                "DATETIME_FORMATS": {
                    "AMPMS": [
                        "AM",
                        "PM"
                    ],
                    "DAY": [
                        "dimanche",
                        "lundi",
                        "mardi",
                        "mercredi",
                        "jeudi",
                        "vendredi",
                        "samedi"
                    ],
                    "ERANAMES": [
                        "avant J\u00e9sus-Christ",
                        "apr\u00e8s J\u00e9sus-Christ"
                    ],
                    "ERAS": [
                        "av. J.-C.",
                        "ap. J.-C."
                    ],
                    "FIRSTDAYOFWEEK": 0,
                    "MONTH": [
                        "janvier",
                        "f\u00e9vrier",
                        "mars",
                        "avril",
                        "mai",
                        "juin",
                        "juillet",
                        "ao\u00fbt",
                        "septembre",
                        "octobre",
                        "novembre",
                        "d\u00e9cembre"
                    ],
                    "SHORTDAY": [
                        "dim.",
                        "lun.",
                        "mar.",
                        "mer.",
                        "jeu.",
                        "ven.",
                        "sam."
                    ],
                    "SHORTMONTH": [
                        "janv.",
                        "f\u00e9vr.",
                        "mars",
                        "avr.",
                        "mai",
                        "juin",
                        "juil.",
                        "ao\u00fbt",
                        "sept.",
                        "oct.",
                        "nov.",
                        "d\u00e9c."
                    ],
                    "WEEKENDRANGE": [
                        5,
                        6
                    ],
                    "fullDate": "EEEE d MMMM y",
                    "longDate": "d MMMM y",
                    "medium": "d MMM y HH:mm:ss",
                    "mediumDate": "d MMM y",
                    "mediumTime": "HH:mm:ss",
                    "short": "dd/MM/y HH:mm",
                    "shortDate": "dd/MM/yyyy",
                    "shortTime": "HH:mm"
                },
                "NUMBER_FORMATS": {
                    "CURRENCY_SYM": "\u20ac",
                    "DECIMAL_SEP": ",",
                    "GROUP_SEP": "\u00a0",
                    "PATTERNS": [
                        {
                            "gSize": 3,
                            "lgSize": 3,
                            "maxFrac": 3,
                            "minFrac": 0,
                            "minInt": 1,
                            "negPre": "-",
                            "negSuf": "",
                            "posPre": "",
                            "posSuf": ""
                        },
                        {
                            "gSize": 3,
                            "lgSize": 3,
                            "maxFrac": 2,
                            "minFrac": 2,
                            "minInt": 1,
                            "negPre": "-",
                            "negSuf": "\u00a0\u00a4",
                            "posPre": "",
                            "posSuf": "\u00a0\u00a4"
                        }
                    ]
                },
                "id": "fr-fr",
                "pluralCat": function (n, opt_precision) {
                    var i = n | 0;
                    if (i == 0 || i == 1) {
                        return PLURAL_CATEGORY.ONE;
                    }
                    return PLURAL_CATEGORY.OTHER;
                }
            },
            en: {
                "DATETIME_FORMATS": {
                    "AMPMS": [
                        "AM",
                        "PM"
                    ],
                    "DAY": [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "ERANAMES": [
                        "Before Christ",
                        "Anno Domini"
                    ],
                    "ERAS": [
                        "BC",
                        "AD"
                    ],
                    "FIRSTDAYOFWEEK": 0,
                    "MONTH": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                    "SHORTDAY": [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                    ],
                    "SHORTMONTH": [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                    "WEEKENDRANGE": [
                        5,
                        6
                    ],
                    "fullDate": "EEEE, y MMMM dd",
                    "longDate": "y MMMM d",
                    "medium": "y MMM d HH:mm:ss",
                    "mediumDate": "y MMM d",
                    "mediumTime": "HH:mm:ss",
                    "short": "yyyy-MM-dd HH:mm",
                    "shortDate": "yyyy-MM-dd",
                    "shortTime": "HH:mm"
                },
                "NUMBER_FORMATS": {
                    "CURRENCY_SYM": "$",
                    "DECIMAL_SEP": ".",
                    "GROUP_SEP": ",",
                    "PATTERNS": [
                        {
                            "gSize": 3,
                            "lgSize": 3,
                            "maxFrac": 3,
                            "minFrac": 0,
                            "minInt": 1,
                            "negPre": "-",
                            "negSuf": "",
                            "posPre": "",
                            "posSuf": ""
                        },
                        {
                            "gSize": 3,
                            "lgSize": 3,
                            "maxFrac": 2,
                            "minFrac": 2,
                            "minInt": 1,
                            "negPre": "-\u00a4",
                            "negSuf": "",
                            "posPre": "\u00a4",
                            "posSuf": ""
                        }
                    ]
                },
                "id": "en-iso",
                "pluralCat": function (n, opt_precision) {
                    var i = n | 0;
                    var vf = getVF(n, opt_precision);
                    if (i == 1 && vf.v == 0) {
                        return PLURAL_CATEGORY.ONE;
                    }
                    return PLURAL_CATEGORY.OTHER;
                }
            }
        };
        // Place la langue choisie dans la variable
        // globale $locale
        angular.copy(locales[lang], $locale);
        // Place la langue choisie dans le contexte global $rootScope
        $rootScope.language = lang;
    }
}]);