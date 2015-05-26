import path from 'path';
import os from 'os';

export default {
    dirs: {
        //these directories shall be consistent with the folder structure.
        //TODO tests
        commands: path.join(__dirname, 'commands/')
    },
    log: {
        file: path.join(os.tmpdir(), 'hipster-shell.log')
    }
};