var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: './logs/info.log', category: 'info' }
  ]
});

var getLogger = function(){
    return log4js.getLogger('info');
}
module.exports = {
    getLogger :getLogger
}