/**
 * Created by xiaoxiaosu on 17/8/30.
 */


const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')


const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ss = require('socket.io-stream')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static',express.static(path.join(__dirname,'static')))
var multiparty = require('multiparty');
var multipart=require('connect-multiparty');
var fs = require('fs')

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


app.get('/stream.js',function (req, res) {
    fs.createReadStream(__dirname + '/node_modules/socket.io-stream/socket.io-stream.js').pipe(res);
})
app.get('/upload',function (req, res) {
    res.render('upload')
})

app.post('/upload', multipart(),function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any



    var files = req.files.files
    for (var i=0;i<files.length;i++){
        var f = files[i]
        console.log(f)
        if(!path_exist(f)){
            create_folder(f)
        }
        // var p = path.join(__dirname,'upload',f.name)
        // fs.createReadStream(f.path).pipe(fs.createWriteStream(p))
    }

    console.log(req.files.files)
    res.send(req.body)
})


function path_exist(p) {
    return fs.existsSync(path.join(__dirname,'upload',path.dirname(p)))
}

function create_folder(p) {
    fs.mkdirSync(path.join(__dirname,'upload',path.dirname(p)))
}



server.listen(7000)