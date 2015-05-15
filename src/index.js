import childProcess from 'child_process';
import readline from 'readline';
import os from 'os';
import fs from 'fs';
import colors from 'colors';
import path from 'path';

import log from './util/logger.js';
import config from './config.js';

const rl = readline.createInterface(process.stdin, process.stdout);

//reference to a foreground child process
let child;
let commands = {};

function prompt() {
    rl.setPrompt(os.hostname() + ' @ ' + process.cwd() + ' > '.green);
    rl.prompt();
}

log.w('Welcome to the hipster-shell.'.underline.yellow);

function initializeCommands() {
    log.d('initializeCommands');
    fs.readdir(config.dirs.commands, (err, files) => {
        if (err) {
            log.e(err);
            return;
        }
        files.forEach((file) => {
            let modulePath = path.join(config.dirs.commands, file);
            //TODO replace with System when node supports it
            let moduleClass = require(modulePath);
            let module = new moduleClass();
            commands[module.name] = module;
            log.i('Loaded module: ' + module.constructor.name);
        });
    });
}
initializeCommands();

function runProcess(command, args) {
    child = childProcess.spawn(command, args, {
        stdio: [
            'inherit'
        ]
    }).on('error', (err) => {
        if (err.code === 'ENOENT') {
            log.i('Command not found: ' + command);
        } else {
            log.e('Unknown error: ' + err);
        }
    });

    child.stdout.on('data', (data) => {
        log.i('' + data); //note data to string conversion
    });

    child.stderr.on('data', (data) => {
        log.e('' + data);
    });

    child.on('close', (code) => {
        log.d('child process exited with code ' + code);
        prompt();
        child = undefined;
    });
}

rl.on('line', (input) => {
    input = input.trim();
    //remove lots of spaces
    input = input.replace(/\s+/g, ' ');

    //check if it has arguments
    let args = input.split(' ');
    let command = args[0];
    args = args.splice(1);

    //check for custom commands
    if (commands[command] !== undefined) {
        commands[command].apply(args, (err) => {
            if (err) {
                log.e(err);
            }
        });
        prompt();
    } else if (input.length > 0) {
        //execute as a child process
        runProcess(command, args);
    } else {
        prompt();
    }
}).on('SIGINT', () => {
    if (child) {
        child.kill('SIGINT');
    }
    prompt();
}).on('close', () => {
    log.w('Cya!');
    process.exit(0);
});

readline.clearScreenDown(process.stdout);
prompt();