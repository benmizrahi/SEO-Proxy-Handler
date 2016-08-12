'use strict'
exports.LoggerHandler = function(isDebugMode,logLocationFolder){
  let fs = require('fs');

  let gererateDateTime=(appendTime)=>{
        let currentdate = new Date();
        return currentdate.getDate() + "."
                    + (currentdate.getMonth() + 1) + "."
                    + currentdate.getFullYear() +
                    (appendTime ? "." + currentdate.getHours() + "-"
                    + currentdate.getMinutes() + "-"
                    + currentdate.getSeconds() : '')
    }

let logFileName =  (logLocationFolder + gererateDateTime() + '.log').trim(); 


let _checkFile = ()=>{
    if (!fs.existsSync(logLocationFolder)){
        fs.mkdirSync(logLocationFolder);
    }

    if (!fs.existsSync(logFileName)){
        fs.writeFileSync(logFileName, 'Created Log At:' + gererateDateTime() , { flag: 'wx' });
    }
    return true;
}

function _logMessage(type,message){
    if(_checkFile())
        fs.appendFile(logFileName, gererateDateTime() + ' ' + type + ':' + message + '\r\n');
}


 return {
      logError:(errorMessage)=>{
            _logMessage('ERROR',errorMessage);
      },

      logInfo:(infoMessage)=>{
            if(isDebugMode)
                _logMessage('INFO',infoMessage);
      }
  }


}