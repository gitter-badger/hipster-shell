import log from './util/logger.js';

/**
 * Parent class for all shell builtins.
 * TODO verify if all functions are implemented, if not, do not load command.
 */
class Command {
    constructor() {

    }

    /**
     * Returns the name of the command, that will be used to trigger this command.
     */
    get name() {
        throw `Module class '${this.constructor.name}' did not implement name()`;
    }

    /**
     * Executes the command.
     * TODO document the arguments
     */
    apply(args) {
        throw `Module class '${this.constructor.name}' did not implement apply()`;
    }
}

export default Command;