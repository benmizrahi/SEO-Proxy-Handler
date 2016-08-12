'use strict'
 exports.SnapshootsHandler = function (location) {
    let fs = require('fs');
    
    let _checkFile = ()=>{
       if (!fs.existsSync(location)){
         fs.mkdirSync(location);
       }
       return true;
    };

    //Private Members
    var _saveSanpshootForUrl =(url,html) => {
        var fileName = location + encodeURIComponent(url) + '.html';
        if( _checkFile())
            fs.writeFile(fileName, html, { flag: 'wx' });
        return true;
    }

    var _getSanpshootForUrl = (url) => {
        var fileName = location + encodeURIComponent(url) + '.html';
         if (fs.existsSync(fileName)){
            return fs.readFileSync(fileName);
         }
         return null;
    }

    //return API
    return {
        getSnapsootHtmlOrNull:function(url){
            if(url &&  location)
                return _getSanpshootForUrl(url);
            
            return null;
        },
        saveSanpshootToUrl:function(url,html){
            if(url && html && location)
                return _saveSanpshootForUrl(url,html);
            return false;
        }
    }
}