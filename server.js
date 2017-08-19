var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var logger = require('./logger');
var User = require('./models/model_employee.js');


mongoose.connect(config.MONGO.CONNECT_URL,function(err){
    if(err)
        console.log(err);
    else{
        var loggerInfo = logger.getLogger(); 
        loggerInfo.info("Conected to DB");
        console.log("connected to mongo");
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var user = require('./routes/employee.js');

app.use('/employee/v1', user);

app.listen(config.ENV.PORT,config.ENV.IP);
module.exports = app;