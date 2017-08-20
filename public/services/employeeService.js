// angular.module("employeesApp").service("employeeService", function () {

//     var employeesList = [];

//     this.getEmployees = function () {
//         // var str = localStorage.getItem("Employees");
//         // employeesList = JSON.parse(str) || employeesList;
//         // return employeesList;
//         $http({
//             method: 'GET',
//             url: '/employees/v1'
//         }).then(function successCallback(response) {
//             $scope.employees = response.data.employees;
//         }, function errorCallback(response) {
//             console.log(response.statusText);
//         });
//     };

//     this.addEmployee = function (employee) {
//         // var employeesList = this.getEmployees();
//         // employeesList.push(employee);
//         // var str = JSON.stringify(employeesList);
//         // localStorage.setItem("Employees", str);
//         $http({
//             method: "POST",
//             url: "employees",
//             data: angular.toJson($scope.form),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(_success, _error);
//     };

//     this.removeEmployee = function (employee) {
//         $http({
//             method: "DELETE",
//             url: "employees/" + employee.id
//         }).then(_success, _error);
//     };

//     this.updateEmployee = function (employee) {
//         $http({
//             method: "PUT",
//             url: "employees/" + $scope.form.id,
//             data: angular.toJson($scope.form),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(_success, _error);
//     };
// });