import Command from '../command.js';
import log from '../util/logger.js';
import {
    Readable
}
from 'stream';

/**
 * Implements echo behavior.
 */
export default class extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'echo';
    }

    apply(args) {
        let stream = new Readable();
        stream.push(args.join(' '));
        stream.push('\n');
        stream.push(null);
        return stream;
    }
}