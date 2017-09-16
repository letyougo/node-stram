/**
 * Created by xiaoxiaosu on 17/8/1.
 */



const express = require('express');
const jsonFile = require('jsonfile')
const config = jsonFile.readFileSync('./xiaosu.json')
const app = express()
const path = require('path')

app.use(config.staticRoot, express.static(path.join(__dirname,config.staticDir)))





app.listen(config.port)





