import Command from '../command.js';
import argsParser from '../util/argsParser.js';
import log from '../util/logger.js';
import {
    Readable
}
from 'stream';

/**
 * Implements set behavior.
 * See http://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
 */
export default class extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'set';
    }

    apply(args) {
        let stream = new Readable();
        if (args.length > 0) {
            stream.push('set does not yet accept arguments\n');
        } else {
            for (var key in process.env) {
                if (process.env.hasOwnProperty(key)) {
                    stream.push(`${key}: ${process.env[key]}`);
                    stream.push('\n');
                }
            }
        }
        stream.push(null);
        return stream;
    }
}