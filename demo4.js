
// var child_pty = require('child_pty');
// var child = child_pty.spawn('/bin/sh', []);
// child.stdin.pipe(child.stdout)
// child.stdin.write('ls\n')

var child_pty = require('child_pty');
var child = child_pty.spawn('/bin/sh', []);
child.stdin.pipe(child.stdout);

child.stdin.write('l');
child.stdin.write('s')
child.stdin.write('\n')
child.stdin.write('exit\n');



child.stdout.on('data',function (d) {
    console.log(1)
})