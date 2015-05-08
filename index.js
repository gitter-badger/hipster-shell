'use strict';

var readline = require('readline'),
    os = require('os'),
    fs = require('fs'),
    log = require('./log.js'),
    childProcess = require('child_process'),
    rl = readline.createInterface(process.stdin, process.stdout);

require('colors');

//reference to a foreground child process
var child;

function prompt() {
    rl.setPrompt(os.hostname() + ' @ ' + process.cwd() + ' > '.green);
    rl.prompt();
}

log.w('Welcome to the hipster-shell.'.underline.yellow);

function runProcess(command, args) {
    child = childProcess.spawn(command, args, {
        stdio: [
            'inherit'
        ]
    }).on('error', function (err) {
        if (err.code === 'ENOENT') {
            log.i('Command not found: ' + command);
        } else {
            log.e('Unknown error: ' + err);
        }
    });

    child.stdout.on('data', function (data) {
        log.i('' + data); //note data to string conversion
    });

    child.stderr.on('data', function (data) {
        log.e('stderr: ' + data);
    });

    child.on('close', function (code) {
        log.d('child process exited with code ' + code);
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
    if (child) {
        child.kill('SIGINT');
    }
    prompt();
}).on('close', function () {
    log.w('Cya!');
    process.exit(0);
});

prompt();