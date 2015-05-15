import Command from '../command.js';
import log from '../util/logger.js';

/**
 * Implements echo behavior.
 */
class echo extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'echo';
    }

    apply(args, callback) {
        log.v(args.join(' '));
        callback();
    }
}

export default echo;