import readline from 'readline';
import os from 'os';

import log from './util/logger.js';
import terminal from './terminal.js';
import commandManager from './command.js';
import argsParser from './util/argsParser.js';

const rl = readline.createInterface(process.stdin, process.stdout);

function prompt() {
    rl.setPrompt(`${os.hostname()}@${process.cwd()} > `);
    rl.prompt();
}

process.title = 'hipster-shell';

rl.on('line', (input) => {
    input = input.trim();
    //remove lots of spaces
    input = input.replace(/\s+/g, ' ');

    log.d('input ' + JSON.stringify(input));

    //check if it has arguments
    let args = input.split(' ');

    log.d('args ' + JSON.stringify(args));

    argsParser.replaceEnvVariables(args).then(function(response) {
        return argsParser.replaceWildcards(response);
    }).then(function(response) {
        args = response;
        log.d('args ' + JSON.stringify(args));

        let command = args[0];
        args = args.splice(1);

        if (command && command.length > 0) {
            try {
                let stream = commandManager.exec(command, args);
                stream.pipe(process.stdout);
                stream.on('error', (err) => {
                    log.e('stream error');
                    log.e(err.stack);
                    prompt();
                });
                stream.on('end', () => {
                    log.i('Stream end');
                    prompt();
                });
            } catch (err) {
                console.error(err.stack);
                prompt();
            }
        } else {
            prompt();
        }
    }).catch(function(err) {
        console.log(err);
        prompt();
    });
}).on('SIGINT', (err) => {
    log.e('SIGINT');
    log.e(err.stack);
    prompt();
}).on('error', (err) => {
    console.log(err.stack);
}).on('close', () => {
    log.w('Cya!');
    process.exit(0);
});

//readline.clearScreenDown(process.stdout);
prompt();