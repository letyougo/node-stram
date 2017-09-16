/**
 * Created by xiaoxiaosu on 17/9/14.
 */
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multipart=require('connect-multiparty');
const shell = require('shelljs');



app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/',function (req, res) {
    res.render('demo1')
})

app.post('/upload', multipart(),function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any


    var files = req.files.files
    for (var i=0;i<files.length;i++){
        var f = files[i]
        console.log(f)
        if(!path_exist(f.name)){
            create_folder(f.name)
        }
        var p = path.join(__dirname,'upload',f.name)
        fs.createReadStream(f.path).pipe(fs.createWriteStream(p))
    }

    res.send(req.body)
})

function path_exist(p) {

    return fs.existsSync(path.join(__dirname,'upload',path.dirname(p)))
}

function create_folder(p) {
    shell.mkdir('-p',path.join(__dirname,'upload',path.dirname(p)))
}
app.listen(3000)