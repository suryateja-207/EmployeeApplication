

angular.module('EmployeeManagement', ['ngTable', 'ngMaterial', 'ngAnimate', 'ngRoute']).controller('EmployeeController', function ($scope, $route, $http, NgTableParams) {
    // $scope.formData = {};

    var self = this;
    var data = [{ name: "Moroni", mobile: 50 } /*,*/];

    // $scope.employees = [{ name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }];
    $scope.employees = [];
    self.tableParams = new NgTableParams({}, { dataset: data });
    console.log("data", $scope.employees);
    _refreshPageData();
    function _refreshPageData() {
        $scope.employees = [];
        $scope.update = false;
        $scope.text = "Add";
        console.log("inside refresh data");
        $http({
            method: 'GET',
            url: 'http://localhost:3002/employee/v1'
        }).then(function successCallback(response) {
            console.log("Inside get");
            $scope.employees = response.data.results;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }


    $scope.addEmployee = function () {
        if ($scope.update == false) {
            $http({
                url: 'http://localhost:3002/employee/v1',
                method: 'POST',
                data: {
                    'name': $scope.name,
                    'email': $scope.email,
                    'employeeId': $scope.employeeId,
                    'mobile': $scope.mobile
                }
            }).then(function (employee) {
                console.log("employee", employee);
            }, function (err) {
                console.log(err);
            });
            _clearForm();
            _refreshPageData();
        }
        else {
            $scope.editEmployee($scope.employeeId);
        }
    };


    $scope.editEmployee = function (employeeId) {
        $http({
            url: 'http://localhost:3002/employee/v1/' + employeeId,
            method: 'PUT',
            data: {
                'name': $scope.name,
                'email': $scope.email,                
                'mobile': $scope.mobile
            }
        }).then(function (employee) {
            console.log("employee", employee);
        }, function (err) {
            alert(err);
        });
        _clearForm();
        _refreshPageData();
    };

    $scope.showDetails = function (index) {

        $scope.name = $scope.employees[index].name;
        $scope.email = $scope.employees[index].email;
        $scope.mobile = $scope.employees[index].mobile;
        $scope.employeeId = $scope.employees[index].employeeId;
        $scope.update = true;
        $scope.text = "Update";
    };

    //HTTP DELETE- delete employee by Id
    $scope.removeEmployee = function (index) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3002/employee/v1/' + $scope.employees[index]._id
        }).then(function (response) {
            console.log(response.data);
            _refreshPageData();
        }, function (rejection) {
            alert(rejection.data);
        });
    };

    function _clearForm() {
        $scope.name = null;
        $scope.email = null;
        $scope.mobile = null;
        $scope.employeeId = null;
    };
});
