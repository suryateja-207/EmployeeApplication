

var app = angular.module('EmployeeManagement', ['ngTable', 'ngMaterial', 'ngAnimate', 'ngRoute'])
app.controller('EmployeeController', function ($scope, $route, $http, NgTableParams) {

    var self = this;
    var data = [{ name: "Moroni", mobile: 50 } /*,*/];

    // $scope.employees = [{ name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 },
    // { name: "Moroni", email: "aaaa", mobile: 50 }, { name: "Moroni", email: "aaaa", mobile: 50 }];
    $scope.employees = [];
    $scope.searchName = null;
    self.tableParams = new NgTableParams({}, { dataset: data });
    console.log("data", $scope.employees);
    _refreshPageData();


    $scope.addEmployee = function () {
        if (_nullValidation())
            return;
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
                _clearForm();
                _refreshPageData();
            }, function (err) {
                console.log(err);
                alert(err);
            });
        }
        else {
            $scope.editEmployee($scope.employeeId);
        }
    };


    $scope.editEmployee = function (employeeId) {
        if (_nullValidation())
            return;
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
            _clearForm();
            _refreshPageData();
        }, function (err) {
            alert(err);
        });
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
            console.log(response.data)
            _refreshPageData();
        }, function (rejection) {
            alert(rejection.data);
        });
    };

    $scope.searchEmployee = function () {
        $scope.employees = [];
        $http({
            method: 'GET',
            url: 'http://localhost:3002/employee/v1?name=' + $scope.searchName
        }).then(function (response) {
            console.log(response.data);
            $scope.employees = response.data.results;
            $scope.searchName = null;
        }, function (rejection) {
            alert(rejection.data);
        });
        $scope.searchName = null;
    };

    function _clearForm() {
        $scope.name = null;
        $scope.email = null;
        $scope.mobile = null;
        $scope.employeeId = null;
    };

    function _nullValidation() {
        if ($scope.name == null ||
            $scope.email == null ||
            $scope.mobile == null ||
            $scope.employeeId == null) {
            alert("Fields Cannot be null");
            return true;
        }
    };

    function _refreshPageData() {
        $scope.employees = [];
        $scope.update = false;
        $scope.seachName = null;
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
});


app.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);