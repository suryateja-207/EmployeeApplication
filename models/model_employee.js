var mongoose = require("mongoose");
var employeeSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    employeeId: {
        type: String,
        unique: true
    },
    pan: {
        type: String
    },
    DOB: Number
});
module.exports = mongoose.model("employee", employeeSchema, "employee");