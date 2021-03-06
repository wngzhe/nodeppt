var express=require('express');
var http=require('http');
var path= require('path');
var bodyParser = require('body-parser');
var fs=require('fs')
// var mongoose=require('./mongodb_setting');
var md_parser=require('../lib/md_parser');



var app=express()
app.set('views','../views');
// app.use(express.static(path.join(__dirname, '../views')));
// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../assets')));
app.use('/im',express.static(path.join(__dirname, '../img')));
app.use('/ppts',express.static(path.join(__dirname, '../ppts')));
app.use('/bower',express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser());

app.get('/',function(req,res){
    let login=true;
    if(login){
        throw new Error('测试报错')
    }else{
        res.send('home page')
    }

})
app.get('/a',function(req,res){
    let login=true;
    if(login){
        throw new Error('/a测试报错')
    }else{
        res.send('home page')
    }

})

app.post('/aj',function(req,res){
    console.log(req.query)
    console.log('body='+req.body)
    console.log('req type='+req.type)
    // console.dir(req)
    res.type('json')
    res.send({a:'2323',b:'wewe ',c:'汉子'})

})
app.get('/b',function(req,res){
    // res.type('.html');
    let url =path.join(__dirname, '../views/index.html')
    res.sendfile(url);


})

var argvObj={
    commands: [],
    options:
        [ {
            flags: '-d, --dir [dir]',
            required: 0,
            optional: -11,
            bool: true,
            short: '-d',
            long: '--dir',
            description: 'set slide path' },
            {
            flags: '-p, --port [port]',
            required: 0,
            optional: -12,
            bool: true,
            short: '-p',
            long: '--port',
            description: 'set server port ' },
            {
            flags: '-c, --controller [socket]',
            required: 0,
            optional: -18,
            bool: true,
            short: '-c',
            long: '--controller',
            description: 'support websocket mutil screen controller' },
            {
            flags: '-H, --host [host]',
            required: 0,
            optional: -12,
            bool: true,
            short: '-H',
            long: '--host',
            description: 'set host address' },
            {
            flags: '-w, --watch',
            required: 0,
            optional: 0,
            bool: true,
            short: '-w',
            long: '--watch',
            description: 'livereload' } ],
    _execs: {},
    _allowUnknownOption: false,
    _args: [],
    _name: 'start',
    _noHelp: false,
};
var queryObj={};
app.get('/test',function(req,res){
    var distURl=path.join(__dirname, '../ppts/demo.md')
    var content = fs.readFileSync(distURl, 'utf-8').toString();
    try {
        var html = md_parser(content, function() {}, argvObj, queryObj);

        res.send(html);
        // res.end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send(e.toString())
    }


})
app.get('/listen',function(req,res){
    // res.type('.html');
    let url =path.join(__dirname, '../views/listen.html')
    res.sendfile(url);


})
app.use('/',function(err,req,res,next){
    console.log('get err')
    next(err)
})
app.use('/a',function(err,req,res,next){
    console.log('/a get err')
    next(err)
})
app.use(function(err,req,res,next){
    console.log(err);
    res.status(500)
    res.send('500 err'+err)
})
app.use(function(req,res,next){
    res.status(404)
    res.send('404 page not found')
})
app.listen(3000)
// app.set('port',process.env.PORT)
//------https---
// var options={
//     key:fs.readFileSync(path.join(__dirname,'../ssl/meadowlark.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'../ssl/meadowlark.crt')),
// };
// http.createServer(options,app).listen(3000,function(){
//     console.log('http started in 3000')
// })