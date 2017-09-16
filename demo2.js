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

app.get('/stream.js',function (req, res) {
    fs.createReadStream(__dirname + '/node_modules/socket.io-stream/socket.io-stream.js').pipe(res);
})

app.get('/demo2',function (req, res) {
    res.render('demo2')
})


var Writable = require('stream').Writable;
var ws = Writable();

var Readable = require('stream').Readable;

app.get('/demo3',function (req, res) {

    var rs =  Readable();

    // rs.on('data',function (chunk) {
    //     console.log(chunk.toString())
    // })

    rs.push('aaa')
    rs.push('bbb')
    rs.push(null)
    rs.pipe(res)
})

function path_exist(p) {
    return fs.existsSync(path.join(__dirname,'upload',path.dirname(p)))
}

function create_folder(p) {
    shell.mkdir('-p',path.join(__dirname,'upload',path.dirname(p)))
}

var getFlowSize = function (str) {
    var unit = str.match(/[a-zA-Z]+/g)
    if(unit && unit[0]){
        unit = unit[0]
    }else {
        unit = 'MB'
    }

    var num = str.match(/\d+/g)
    if(num && num[0]){
        num = num[0]
    }else {
        num = 1
    }

    if(unit == 'GB'){
        return num*1024*1024
    }else if (unit == 'MB'){
        return num*1024
    }else {
        return num*1
    }
}



io.of('xiaoxiaosu').on('connection',function (socket,files) {
    ss(socket).on('upload', function(read_stream, data) {


        if(!path_exist(data.path)){

            create_folder(data.path)
        }

        var files = {}
        files[data.path] = 0


        var p = path.join(__dirname,'upload',data.path)

        var write_stream = fs.createWriteStream(p)
        var size = 0
        read_stream.on('data',function (chunk) {
            if(!files[data.path]){
                files[data.path]= 0
            }

            files[data.path]+=chunk.length
            if (!write_stream.write(chunk)) {
                read_stream.pause()
            }

            socket.emit('progress',{current:files[data.path],total:data.size,path:data.path})
        })
        
        write_stream.on('drain',function () {
            read_stream.resume()
        })

        read_stream.on('end',function () {
            socket.emit('progress',{current:files[data.path],total:data.size,path:data.path})
            socket.emit('end',{path:data.path})
            delete files[data.path]
            write_stream.end()
        })
        
    });
})



server.listen(7000)