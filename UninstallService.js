var Service = require('node-windows').Service;
var pjson = require('./package.json');

var svc = new Service({
  name:pjson.wservicename,
  script:__dirname +  '\\wservice.js'
});


svc.on('uninstall',function(){
  console.log('Uninstall Windows Service Complete!');
  console.log('The service exists: ',svc.exists);
});

svc.uninstall();