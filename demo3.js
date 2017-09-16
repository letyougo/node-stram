/**
 * Created by xiaoxiaosu on 17/9/15.
 */


const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')

const fs = require('fs')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ss = require('socket.io-stream')
const shell = require('shelljs')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static',express.static(path.join(__dirname,'static')))


app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');



var process = require('process')
var child_process = require('child_process')

app.get('/stream.js',function (req, res) {
    fs.createReadStream(__dirname + '/node_modules/socket.io-stream/socket.io-stream.js').pipe(res);
})
app.get('/',function (req, res) {
    res.render('demo3')
})
var child_pty = require('child_pty');
var child = child_pty.spawn('/bin/sh', []);
io.of('xiaoxiaosu').on('connection',function (socket,files) {





    ss(socket).on('new', function(stream) {
        var pty = child_pty.spawn('/bin/sh', []);

        pty.stdout.on('data',function (data) {
            console.log('output',data.toString())
            stream.write(data)
        })

        stream.on('data',function (data) {
            console.log('input',data.toString())
            pty.stdin.write(data)
        })
    })


})

server.listen(7000)