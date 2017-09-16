
var expess =require('express')
var app = expess()
var shell = require('shelljs')
var stream = require('express-stream');
var ejs = require('ejs');
var superagent = require('superagent')
app.set('views', './views');
app.set('view engine', 'ejs');

var url = 'http://api.miui.security.xiaomi.com/netassist/floworderunity/productlist?param=eyJzbG90aWQiOiIiLCJzcFR5cGUiOiJVTklDT00iLCJ6aXBDb2RlIjoiNTMxIiwicGhvbmVudW0iOiIxMzAwMDAwMDAwMCIsInhpYW9taUlkIjpudWxsLCJzcmMiOiIiLCJ2ZXJzaW9uQ29kZSI6IjQwODI1Iiwic3BOYW1lIjoi6IGU6YCaIiwiemlwTmFtZSI6Iua1juWNlyIsImlzT3BlcmFTdXBwb3J0ZWQiOiJmYWxzZSIsInNwVHlwZU9wZXJhIjoiQ01DQyJ9'
app.get('/',stream.pipe(),function (req, res) {
    res.stream({aaa:111}); //Stream the landing page
    setTimeout(function () {
        res.stream({bbb:222})
    },3000)
    // superagent
    //     .get(url)
    //     .end(function (err, response){
    //             res.stream('landing-data', response.body.data); //Stream data to populate the landing page
    //             res.close();
    //         }
    //     );
})

app.get('/c',function (req,res) {
    res.send('hello world')
})




app.listen(3000)