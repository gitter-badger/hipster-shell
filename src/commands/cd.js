import Command from '../command.js';
import argsParser from '../util/argsParser.js';

/**
 * Implements change dir behavior.
 */
class cd extends Command {
    constructor() {
        super();
        this.previousDir = process.cwd();
    }

    get name() {
        return 'cd';
    }

    apply(args, callback) {
        let destDir = argsParser.singleDestDir(args);
        if (destDir === '-') {
            this.apply(this.previousDir, callback);
            return;
        }

        this.previousDir = process.cwd();

        try {
            process.chdir(destDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                callback(`${destDir} : No such file or directory`);
            } else {
                callback(err);
            }
        }
    }
}

export default cd;