import Command from '../command.js';
import log from '../util/logger.js';

/**
 * Implements exit behavior.
 */
class exit extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'exit';
    }

    apply(args, callback) {
        if (args.length < 2) {
            process.exit(args);
        } else {
            log.e(this.name + ': Invalid arguments');
        }
        callback();
    }
}

export default exit;