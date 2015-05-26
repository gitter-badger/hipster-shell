import fs from 'fs';
import path from 'path';
import assert from 'assert';

import log from './util/logger.js';
import config from './config.js';
import globals from './globals.js';

/**
 * Parent class for all shell builtins.
 * TODO verify if all functions are implemented, if not, do not load command.
 */
class Command {
    constructor() {}

    /**
     * Returns the name of the command, that will be used to trigger this command.
     */
    get name() {
        throw `Module class '${this.constructor.name}' did not implement name()`;
    }

    /**
     * Executes the command.
     * TODO document the arguments
     * args: arguments passed to the command
     * callback: callback with the result stream
     * opt: additional stuff. command: command called
     * returns stream
     */
    apply(args, callback) {
        throw `Module class '${this.constructor.name}' did not implement apply()`;
    }

    static _loadAll() {
        log.d('loadAll');
        fs.readdir(config.dirs.commands, (err, files) => {
            if (err) {
                log.e(err);
                return;
            }
            //initialize global commands object
            globals.commands = {};
            files.forEach((file) => {
                let modulePath = path.join(config.dirs.commands, file);
                log.v(`Loading module path ${modulePath}`);
                //TODO replace with System when node supports it
                let ModuleClass = require(modulePath);
                let module = new ModuleClass();
                globals.commands[module.name] = module;
                log.i(`Loaded module: ${module.name}`);
            });
        });
    }

    static exec(command, args) {
        log.d('Got command ' + command);
        var commandModule = globals.commands[command];

        //if there's no built-in handler, treat it as a binary.
        if (!commandModule) {
            commandModule = globals.commands['*'];
        }
        assert(commandModule);

        log.d('Using module ' + commandModule.name);

        //reset stream
        return commandModule.apply(args, {
            command: command
        });
    }
}

//preload all commands
Command._loadAll();

export default Command;