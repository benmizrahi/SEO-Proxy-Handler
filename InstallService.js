var Service = require('node-windows').Service;
var pjson = require('./package.json');

var svc = new Service({
  name:pjson.wservicename,
  description: 'Windows Service Handle the PhantomJS Proxy',
  script: __dirname +  '\\WService.js'
});

svc.on('install',function(){
  console.log('Install Windows Service Complete!')  
  svc.start();
  console.log('The Windows Service Started Successfully!')  
});

svc.install();