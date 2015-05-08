'use strict';

var readline = require('readline'),
    colors = require('colors'),
    os = require('os'),
    fs = require('fs'),
    childProcess = require('child_process'),
    rl = readline.createInterface(process.stdin, process.stdout);

//reference to a foreground child process
var child;

function prompt() {
    rl.setPrompt(os.hostname() + ' @ ' + process.cwd() + ' > '.green);
    rl.prompt();
}

console.log('Welcome to the hipster-shell.'.underline.yellow);

function runProcess(command, args) {
    child = childProcess.spawn(command, args, {
        stdio: [
            'inherit'
        ]
    });
    child.stdout.on('data', function (data) {
        console.log('' + data); //note data to string conversion
    });

    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    child.on('close', function (code) {
        console.log('child process exited with code ' + code);
        prompt();
        child = undefined;
    });
}

rl.on('line', function (input) {
    input = input.trim();
    //remove lots of spaces
    input = input.replace(/\s+/g, ' ');

    //check if it has arguments
    var args = input.split(' '); //TODO remove more than one spaces too
    var command = args[0];
    args = args.splice(1);

    //check for custom commands
    if (command === 'cd') {
        var destDir;
        if (args.length === 0) {
            destDir = process.env.HOME;
        } else if (args.length === 1) {
            if (args[0] === '-') {
                throw 'cd - not implemented yet';
            }

            destDir = args[0];
        } else {
            throw 'cd not yet full implemented';
        }
        process.chdir(destDir);
        prompt();
    } else if (input.length > 0) {
        //execute as a child process
        runProcess(command, args);
    } else {
        prompt();
    }
}).on('SIGINT', function () {
    // console.log('SIGINT! closing child process!')
    if (child) {
        child.kill('SIGINT');
    }
    prompt();
}).on('close', function () {
    console.log('Cya!');
    process.exit(0);
});

prompt();
