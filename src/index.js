import childProcess from 'child_process';
import readline from 'readline';
import os from 'os';
import fs from 'fs';
import 'colors';

import logger from './util/logger';
import cd from'./commands/cd.js';

const rl = readline.createInterface(process.stdin, process.stdout);

//reference to a foreground child process
var child;

function prompt() {
    rl.setPrompt(os.hostname() + ' @ ' + process.cwd() + ' > '.green);
    rl.prompt();
}

logger.w('Welcome to the hipster-shell.'.underline.yellow);

function runProcess(command, args) {
    child = childProcess.spawn(command, args, {
        stdio: [
            'inherit'
        ]
    }).on('error', function (err) {
        if (err.code === 'ENOENT') {
            logger.i('Command not found: ' + command);
        } else {
            logger.e('Unknown error: ' + err);
        }
    });

    child.stdout.on('data', function (data) {
        logger.i('' + data); //note data to string conversion
    });

    child.stderr.on('data', function (data) {
        logger.e('' + data);
    });

    child.on('close', function (code) {
        logger.d('child process exited with code ' + code);
        prompt();
        child = undefined;
    });
}

rl.on('line', function (input) {
    input = input.trim();
    //remove lots of spaces
    input = input.replace(/\s+/g, ' ');

    //check if it has arguments
    var args = input.split(' ');
    var command = args[0];
    args = args.splice(1);

    //check for custom commands
    if (command === 'cd') {
        var destDir;
        if (args.length === 0) {
            destDir = process.env.HOME || '.';
        } else {
            destDir = args[0];
        }

        cd.apply(destDir);
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
    logger.w('Cya!');
    process.exit(0);
});

readline.clearScreenDown(process.stdout);
prompt();