/**
 * Created by xiaoxiaosu on 17/9/14.
 */
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')
const multipart=require('connect-multiparty');




app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

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