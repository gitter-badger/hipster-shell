import glob from 'glob';
import log from '../util/logger.js';

export default {
    /**
     * Parses arguments to return single destination path from first argument
     */
    singleDestDir: function(args) {
        if (args.length === 0) {
            return process.env.HOME || '.';
        } else {
            return args[0];
        }
    },

    /**
     * Replaces environment variables with their actual content
     * TODO is there any way to make this in a single mapping function?
     */
    replaceEnvVariables: function(args) {
        return new Promise(function(resolve) {
            let newArgs = [];
            args.forEach(function(arg) {
                if (arg.match(/^\$.*/g)) {
                    arg = process.env[arg.substring(1)];
                    if (arg) {
                        newArgs.push(arg);
                    }
                } else {
                    newArgs.push(arg);
                }
            });
            resolve(newArgs);
        });
    },

    replaceWildcards: function(args) {
        return new Promise(function(resolve, reject) {
            let newArgs = [];
            args.forEach(function(arg) {
                if (glob.hasMagic(arg)) {
                    arg = glob.sync(arg);
                    if (arg.length === 0) {
                        reject('no matches found: ' + arg);
                    } else {
                        newArgs.push(...arg);
                    }
                } else {
                    newArgs.push(arg);
                }
            });
            resolve(newArgs);
        });
    }
};