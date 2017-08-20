var router = require('express').Router();
var Employee = require('../models/model_employee.js');
var sanitize = require('mongo-sanitize');
module.exports = (function () {
    'use strict';
    var router = require('express').Router();
    router.post('/', function (req, res) {
        var data = req.body;
        var employeeInstance = new Employee(data);
        employeeInstance.save(function (err, doc) {
            if (err) {
                res.status(500).json({
                    Message: err.errmsg
                });
            } else {
                res.status(200).send(doc);
            }
        });
    });

    router.get('/', function (req, res) {        
        if (req.query.name) {            
            Employee.find({ name: new RegExp(req.query.name, "i") }, function (err, results) {
                if (err) {
                    console.log("err", err);
                    res.status(500).json({
                        "Message": err.errmsg
                    });
                }
                else {
                    res.status(200).json({
                        results: results
                    });
                }
            });
        }
        else {
            Employee.find().exec(function (err, results) {
                res.status(200).json({
                    results: results
                });
            });
        }

    });

    router.get('/:employeeId', function (req, res) {
        Employee.findOne({ "_id": sanitize(req.params.employeeId) }).exec(function (err, employeeInstance) {
            if (!employeeInstance) {
                res.status(404).json({
                    "Message": "Employee Not Found.",
                    "status": 'notFound'
                });
            }
            else {
                res.status(200).json(employeeInstance);
            }
        });
    });

    router.delete('/:employeeId', function (req, res) {
        Employee.remove({ "_id": sanitize(req.params.employeeId) }, function (err, doc) {
            if (err) {
                 res.status(500).json({
                        "Message": err.errmsg
                    });
            } else if (doc.result.n == 0) {
                res.status(404).json({
                    "Message": "Employee with employee id " + req.params.employeeId + " not found.",
                    "status": 'notFound'
                });
            } else {
                res.status(200).json({
                    "Message": "Employee with employee id " + req.params.employeeId + " deleted successfully.",
                    "status": 'success'
                });
            }
        });
    });

    //This function updates the eciper template having id as passed in request params.
    router.put('/:employeeId', function (req, res) {
        var employee = req.body;
        if (req.params.employeeId) {
            Employee.findOneAndUpdate({ employeeId: sanitize(req.params.employeeId) }, employee, { upsert: true }, function (err, doc) {
                if (err) {
                     res.status(500).json({
                        "Message": err.errmsg
                    });
                }
                else if (!doc) {
                    res.status(404).json({
                        "Message": "Cannot update non-existent record.Employee with id " + req.params.employeeId + " not found.",
                        "status": 'notFound'
                    });
                }
                else {
                    res.status(200).json({
                        "Message": "Employee with id " + req.params.employeeId + " updated successfully.",
                        "status": 'success'
                    });
                }
            });
        }
        else {
            res.status(400).json({
                "Message": "Employee Id cannot be empty.",
                "status": 'badRequest'
            });
        }
    });
    return router;
})();