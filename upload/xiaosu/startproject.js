#!/usr/bin/env node


const program = require('commander')
const inquirer = require('inquirer');
const fs = require('fs')
const jsonFile = require('jsonfile')
const shell = require('shelljs')
const path = require('path')



async function ask() {

    var config = {}

    var name = await inquirer.prompt([
        {
            type: 'input',
            name: 'value',
            message: '输入项目名字',
        }
    ])
    config.name = name.value

    var port = await inquirer.prompt([
        {
            type: 'input',
            name: 'value',
            message: '输入项目默认端口',
            default:3000
        }
    ])
    config.port = port.value

    var staticRoot = await inquirer.prompt([
        {
            type: 'input',
            name: 'value',
            message: '静态文件的前缀',
            default:'static'
        }
    ])
    config.staticRoot = staticRoot.value

    var staticDir= await inquirer.prompt([
        {
            type: 'input',
            name: 'value',
            message: '输入项目静态文件目录',
            default:'static'
        }
    ])
    config.staticDir = staticDir.value


    fs.mkdirSync(config.name)
    shell.cp('-R',path.join(__dirname,'template','project/*'),config.name)
    jsonFile.writeFileSync(config.name+'/xiaosu.json',config,{spaces:4})

    





}


function main() {
    ask()
}


main()