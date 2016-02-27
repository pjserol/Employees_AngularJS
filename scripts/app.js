'use strict';

/*angular.module('app', []).controller('MainCtrl', function($scope) {
    //$scope.isConnected = false;
    $scope.disConnect = function() {
        $scope.isConnected = false;
    };
    $scope.connect = function() {
        $scope.isConnected = true;
    };
    
    $scope.disConnect();
});*/

/**
 * Déclaration de la variable app qui sera utilisée après.
 * Injection des modules externes (principalement Angular) et 
 * des modules internes (ceux qu'on a développés)
 */

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'controllers', 'services', 'directives', 'pascalprecht.translate']);

/**
 * Définition des constantes de configuration et injection des modules
 * externes nécessaires : $routeProvider => routage
 */

app.config(['$routeProvider', '$translateProvider',
           function ($routeProvider, $translateProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.html'
            })
            .when('/connect', {
                templateUrl: 'partials/connect.html',
                controller: 'ConnectionCtrl as connectionCtrl'
            })
            .when('/getEmployees', {
                templateUrl: 'partials/employees.html',
                controller: 'EmployeesCtrl as employeesCtrl'
            })
            .when('/updateEmployee/:id', {
                templateUrl: 'partials/employee.html',
                controller: 'EmployeeCtrl as employeeCtrl'
            })
            .when('/addEmployee', {
                templateUrl: 'partials/employee.html',
                controller: 'EmployeeCtrl as employeeCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });

        $translateProvider.translations('en', { // en anglais
            title: 'Employees',
            homeTitle:'Hello !',
            homeText:'This is an example of programing with AngularJs...',
            home: 'Home',
            list: 'List',
            add: 'Add',
            language: 'Language',
            french: 'French',
            english: 'English',
            connection: 'Connection',
            login: 'Login',
            logout: 'Logout',
            employeesList: 'Employees list',
            inputName: 'Employee\'s name',
            inputLogin: 'Your login',
            inputPassword: 'Your password',
            selectJob: 'Select a job',
            hireDate: 'Hire date',
            salary: 'Salary',
            inputSalary: 'Employee\'s salary',
            department: 'Department',
            filter: 'Filtered with',
            name: 'Name',
            hiredate: 'Hire date',
            job: 'Job',
            salary: 'Salary',
            update: 'Update',
            delete: 'Delete',
            confirm: 'Deleting confirmed ?',
            department: 'Department',
            validate: 'Validate',
            cancel: 'Cancel',
            selectJob: 'Select a job',
            selectDep: 'Select a department',
            anEmployee: ' an Employee',
            updating: 'Updating',
            adding: 'Adding',
            errorForm: 'Form with errors !',
            msgLogin: 'Strike your login here',
            msgPassword: 'Strike your password here',
            password: 'Password',
            signInError: 'Wrong login or wrong password !'
        });
        $translateProvider.translations('fr', { // en français
            title: 'Employés',
            homeTitle:'Bonjour !',
            homeText:'Ceci un exemple de programmation avec AngularJs...',
            home: 'Accueil',
            list: 'Lister',
            add: 'Ajouter',
            language: 'Langue',
            french: 'Français',
            english: 'Anglais',
            connection: 'Connexion',
            login: 'Se connecter',
            logout: 'Se déconnecter',
            employeesList: 'Liste des employés',
            inputName:'nom de l\'employé',
            inputLogin: 'Votre login',
            inputPassword: 'Votre mot de passe',
            selectJob: 'Sélectionner une fonction',
            hireDate: 'Date d\'embauche',
                        salary: 'Salaire',
            inputSalary: 'salaire de l\'employé',
            department: 'Service',
            filter: 'Filtré avec',
            name: 'Nom',
            hiredate: 'Date d\'embauche',
            job: 'Fonction',
            salary: 'Salaire',
            update: 'Modification',
            delete: 'Supression',
            confirm: 'Suppression confirmée ?',
            validate: 'Valider',
            cancel: 'Annuler',
            selectJob: 'Sélectionner une fonction',
            selectDep: 'Sélectionner un service',
            anEmployee: ' un Employé',
            updating: 'Mettre à jour',
            adding: 'Ajouter',
            errorForm: 'Erreurs de saisie !',
            msgLogin: 'Saisissez votre identifiant',
            msgPassword: 'Saisissez votre mot de passe',
            password: 'Mot de passe',
            signInError: 'Login ou mot de passe erroné !'
        });
               
        $translateProvider.preferredLanguage("en"); // Langue par défaut
        $translateProvider.useSanitizeValueStrategy('escape'); // Pour ne pas avoir de warning

           }
]);