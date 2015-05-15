import log from './util/logger.js';

class Command {
    constructor() {

    }

    /**
     * Returns the name of the command, that will be used to trigger this command.
     */
    get name() {
        throw 'Module class \'' + this.constructor.name + '\' did not implement name()';
    }

    /**
     * Executes the command.
     * TODO document the arguments
     */
    apply(args) {
        throw 'Module class \'' + this.constructor.name + '\' did not implement apply()';
    }
}

export default Command;
