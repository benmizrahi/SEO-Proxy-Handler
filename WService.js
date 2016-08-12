'use strict'

//Modules Imports
const Browser = require('zombie');
const pjson = require('./package.json');
const http = require('http');
const url = require('url');
//////////////////


/*Parameters For Hosting,Snapshoots And Logger*/
let port = parseInt(pjson.phantomPort);
let isDebugMode = pjson.debugMode == "true";
let createSnapshoots =  pjson.createSnapshoots == "true";
let sanpshootFolder = pjson.sanpshootFolder;
let logLocationFolder = pjson.logLocationFolder || __dirname + '\\logs\\';
let snapshootsHandler = require('./SnapshootsHandler.js').SnapshootsHandler(sanpshootFolder);
let loggerHandler = require('./LoggerHandler.js').LoggerHandler(isDebugMode,logLocationFolder);

////////////////////////////////////////////////


//Private Memebers
let getFixedUrl = (fullUrl) => {
    fullUrl = fullUrl.replace('?escaped_fragment_=', '');
    return fullUrl;
}
let renderHtml = (url, callback) => {
    try{
    Browser.visit(url, function(e,browser) {
        callback(browser.html());
    });
    }
    catch(ex){
        loggerHandler.logError(ex.message);
        throw ex;
    }
}
/////////////////////


//The web server listen to the port
http.createServer(function (req, res) {
    try{
        loggerHandler.logInfo('New Request Arrive ' + req.url);
        var queryData = url.parse(req.url, true).query;
            if(queryData && queryData.url){
                loggerHandler.logInfo('Request Format is OK');
                if(createSnapshoots && snapshootsHandler.getSnapsootHtmlOrNull(queryData.url)){
                    loggerHandler.logInfo('Loding response from sanpshoots!');
                    res.writeHead(200,{"Content-type":"text/html"});
                    res.end(snapshootsHandler.getSnapsootHtmlOrNull(queryData.url));
                    loggerHandler.logInfo('Return Sanpshoot HTML !');        
                }
                else {
                    loggerHandler.logInfo('Loading HTML from zombie browser');
                    renderHtml(getFixedUrl(queryData.url), function (html) {
                        loggerHandler.logInfo('Callback recived from zombie');
                        if(createSnapshoots){
                            loggerHandler.logInfo('Creatring a snapshoot for url:' + queryData.url);
                            snapshootsHandler.saveSanpshootToUrl(queryData.url,html);
                            loggerHandler.logInfo('Snapshoot created successfully');
                        }
                        res.writeHead(200,{"Content-type":"text/html"});
                        res.end(html);
                        loggerHandler.logInfo('Return zombie HTML OK !');
                    });
                }
            }
            else{
                loggerHandler.logError('An error occurred processing the request url' + req.url)
                res.end("No Match");
            }
    }
    catch(ex){
        loggerHandler.logError(ex);
        res.end("An error occurred!");
    }
}).listen(port);
/////////////////////


