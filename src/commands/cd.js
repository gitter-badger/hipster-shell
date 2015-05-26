import Command from '../command.js';
import argsParser from '../util/argsParser.js';
import {
    Readable
}
from 'stream';

/**
 * Implements change dir behavior.
 */
class cd extends Command {
    constructor() {
        super();
    }

    get name() {
        return 'cd';
    }

    apply(args) {
        let stream = new Readable();
        let destDir = argsParser.singleDestDir(args);
        if (destDir === '-') {
            let previousDir = process.env.OLDPWD || '.';
            return this.apply([previousDir]);
        }
        process.env.OLDPWD = process.cwd();

        try {
            process.chdir(destDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                stream.push(`${destDir} : No such file or directory\n`);
            } else {
                stream.emit('error', err);
            }
        }
        stream.push(null);
        return stream;
    }
}

export default cd;