'use strict';

/**
 * Déclaration du module controllers qui rassemblera
 * tous les controleurs
 */

var controllers = angular.module('controllers', []);

/**
 * Pilote de déconnexion
 */
controllers.controller('MainCtrl', ['localization', '$route', '$rootScope', '$location', '$translate',
                                    function (localization, $route, $rootScope, $location, $translate) {
            var mainCtrl = this;
            // On référence les méthodes exposées
            mainCtrl.disConnect = disConnect;
            mainCtrl.setLang = setLang;

            // Par défaut on n'est pas authentifié
            $rootScope.isConnected = false;

            // Par défaut on utilise l'anglais
            localization.setLang('en');
            $translate.use('en');

            /**
             * Déconnection : isConnected passe à faux => le menu disparaîtra
             * On recharge la page principale
             */
            function disConnect() {
                $rootScope.isConnected = false;
                $location.path('/home');
            }

            /**
             * Changer la langue en cours
             */
            function setLang(lang) {
                localization.setLang(lang); // définit la langue en cours (date, monnaie)
                $translate.use(lang); // force la tradiction de la page encours
                // Forcer le rechargement de la page
                $route.reload();
            }

}
                                   ]

);

/** 
 * Contrôleur de la page connect.html qui
 * permet de s'authentifier et d'accèder aux
 * fonctionnalités
 */
controllers.controller('ConnectionCtrl', ['$rootScope', 'Connection', '$location', '$filter', function ($rootScope, Connection, $location, $filter) {

    var connectionCtrl = this;

    // On référence les méthodes exposées
    connectionCtrl.signIn = signIn;
    connectionCtrl.login = "";
    connectionCtrl.pwd = "";

    /**
     * Appelle le service Connection avec le login
     * et le pwd. Si ok redirige vers la page d'accueil
     * sinon affiche un message d'erreur dans la langue en cours
     */
    function signIn(login, pwd) {
        connectionCtrl.error = "";
        $rootScope.isConnected = Connection.getConnection(login, pwd);
        if ($rootScope.isConnected) {
            $location.path('/home');
        } else {
            connectionCtrl.error = $filter('translate')('signInError');
        }
    }

}]);

/**
 * Contrôleur de la page employees.html qui liste les employés
 */
controllers.controller('EmployeesCtrl', ['EmployeesRest', 'Commission', '$route', '$location', function (EmployeesRest, Commission, $route, $location) {
    var employeesCtrl = this;

    // On référence les méthodes exposées
    employeesCtrl.deleteEmployee = deleteEmployee;

    // Récupère une promise
    var employeesPromise = EmployeesRest.getEmployees();

    // Si la requête aboutit (code 200) on affecte le json retourné
    // à la variable employeesCtrl.employees qui sera affichée
    // par la vue employees.html
    employeesPromise.success(function (data) {
        // Si la liste n'est pas vide
        if (data.length > 0) {
            //data = Commission.computeCommission(data);
            Commission.computeCommission(data);
            employeesCtrl.employees = data;
        }
    }).error(function (data) {
        // Si la requête a provoqué une erreur
        employeesCtrl.error = data

        // On affiche l'erreur brute
        alert(employeesCtrl.error);
    });


    /*
     * Supppression d'un employé
     */
    function deleteEmployee(id) {
        if (id) {
            EmployeesRest.deleteEmployee(id).success(function (data, status) {
                // Si c'est ok on consulte la nouvelle liste des employés
                if (status === 200) {
                    $location.path('/getEmployees');
                    $route.reload();
                }
            }).error(function (data) {
                employeesCtrl.error = data;
                alert(employeesCtrl.error);
            });
        }
    }
}]);

controllers.controller('EmployeeCtrl', ['EmployeesRest', '$routeParams', '$location', '$filter', function (EmployeesRest, $routeParams, $location, $filter) {
    // Définition du scope
    var employeeCtrl = this;

    // On référence les méthodes exposées
    employeeCtrl.validateEmployee = validateEmployee;
    employeeCtrl.cancel = cancel;
    
    // On récupère l'id de l'employé
    employeeCtrl.employee_id = $routeParams.id;

        employeeCtrl.pageTitle= $filter('translate')('anEmployee');
    
    // si l'id est défini : modification
    if (employeeCtrl.employee_id) {
        employeeCtrl.pageTitle = $filter('translate')('updating') + employeeCtrl.pageTitle;
    } else {
        // Ajout
        employeeCtrl.pageTitle = $filter('translate')('adding') + employeeCtrl.pageTitle;
    }
    

    // le datepicker n'est pas visible
    employeeCtrl.datePickerOpened = false;

    // Affiche le datePicker
    employeeCtrl.openDatePicker = function () {
        employeeCtrl.datePickerOpened = true;
    };

    // Récupère la liste des départements
    EmployeesRest.getDepartments().success(function (data) {
        employeeCtrl.departments = data;
    });

    // Récupère la liste des jobs
    EmployeesRest.getJobs().success(function (data) {
        employeeCtrl.jobs = data;
    });

    // S'il s'agit d'une demande de modification, il faut lire l'employé,
    // positionner les listes déroulentes (jobs et services) en fonction
    // des valeurs de l'employé
    if (employeeCtrl.employee_id > 0) {
        var employeeR = EmployeesRest.getEmployee($routeParams.id);
        employeeR.success(function (data, status) {
            if (status == 200) {
                employeeCtrl.employee = data;
                employeeCtrl.selectedOptionDep = employeeCtrl.employee.department;
                employeeCtrl.selectedOptionJob = employeeCtrl.employee.job;
                // Nécessaire car sinon à la validation si la data n'a pas été
                // saisie, elle ne sera pas reconnue comme une date valide
                employeeCtrl.employee.hiredate = new Date(data.hiredate.toString());
            }
        }).error(function (data) {
            employeeCtrl.error = data;
            alert(employeeCtrl.error);
        });
    }

    /**
     * Click sur le bouton Annuler
     */
    function cancel() {
        $location.path('getEmployees');
    };

    /**
     * Click sur le bouton valider
     */
    function validateEmployee(id, form) {
        // si tout a été saisi, pas de zone oubliée
        if (form.$valid) {
            // On récupère l'objet employee dans le scope de la vue
            var employee = employeeCtrl.employee;

            // On récupère la date au format MySql
            employee.hireDate = $filter('date')(employeeCtrl.employee.hiredate, "yyyy-MM-dd");

            // la marque décimale doit être le point
            employee.salary = employeeCtrl.employee.salary.replace(',', '.');

            employee.department = employeeCtrl.selectedOptionDep;
            employee.job = employeeCtrl.selectedOptionJob;

            if (id) {
                // Demande de mise à jour de l'employée
                EmployeesRest.updateEmployee(employee).success(function (data, status) {
                    // Si c'est ok on consulte la nouvelle liste des employés
                    if (status === 200) {
                        $location.path('/getEmployees');
                    }
                }).error(function (data) {
                    employeeCtrl.error = data;
                    alert(employeeCtrl.error);
                });
            } else {
                // Demande d'ajout d'un employé
                EmployeesRest.addEmployee(employee).success(function (data, status) {
                    // Si c'est ok on consulte la nouvelle liste des employés
                    if (status === 200) {
                        $location.path('/getEmployees');
                    }
                }).error(function (data) {
                    employeeCtrl.error = data;
                    alert(employeeCtrl.error);
                });
            }
        } else {
            employeeCtrl.error = $filter('translate')('errorForm');
        }
    }
}]);