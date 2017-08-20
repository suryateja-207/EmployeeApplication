// (function(){
//     angular.module('myApp')
//         .service('errorService', errorService);

//     function errorService() {

//         var errors = [
//             {
//                 status: 400,
//                 errorMessage: "There was a problem with the data you submitted. \nPlease enter valid form data."
//             },
//             {
//                 status: 401,
//                 errorMessage: "You need to provide proper authorization credentials to continue."
//             },
//             {
//                 status: 403,
//                 errorMessage: "You are not allowed to perform this action."
//             },
//             {
//                 status: 404,
//                 errorMessage: "The requested file or resource was not found."
//             },
//             {
//                 status: 408,
//                 errorMessage: "The connection timed out. Please try again later."
//             },
//             {
//                 status: 410,
//                 errorMessage: "The requested resource is no longer available."
//             },
//             {
//                 status: 418,
//                 errorMessage: "I'm a teapot, not a coffeepot."
//             },
//             {
//                 status: 500,
//                 errorMessage: "Internal Server Error."
//             }
//         ];

//         this.getErrorMessage = function(status, errorCode) {
//             for(var i = 0; i < errors.length; i++) {
//                 if(errors[i].status === status) {
//                     return "Error: " + errorCode + ": " + errors[i].errorMessage;
//                 }
//             }
//         };
//     }
// })();