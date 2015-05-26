import Command from '../command.js';
import log from '../util/logger.js';
import {
    Readable
}
from 'stream';
/**
 * Implements exit behavior.
 * Reference: http://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#Bourne-Shell-Builtins
 *
 * Exit the shell, returning a status of n to the shell’s parent.
 * If n is omitted, the exit status is that of the last command executed.
 * Any trap on EXIT is executed before the shell terminates.
 */
class exit extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'exit';
    }

    apply(args) {
        let stream = new Readable();
        if (args.length < 2) {
            process.exit(args);
        } else {
            stream.push(`${this.name}: Invalid arguments\n`);
        }
        stream.push(null);
        return stream;
    }
}

export default exit;