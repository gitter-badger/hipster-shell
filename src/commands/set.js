import Command from '../command.js';
import argsParser from '../util/argsParser.js';
import log from '../util/logger.js';

/**
 * Implements set behavior.
 * See http://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
 */
class set extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'set';
    }

    apply(args, callback) {
        if (args.length > 0) {
            callback('set does not yet accept arguments');
            return;
        }
        
        for (var key in process.env) {
            if (process.env.hasOwnProperty(key)) {
                log.v(key + ': ' + process.env[key]);
            }
        }
        callback();
    }
}

export default set;