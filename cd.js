/**
 * Changing directory
 */

(function () {
    'use strict';

    require('colors');
    var process = require('process');


    var Cd = function () {
        this.previousDir = process.cwd();
    };

    Cd.prototype.apply = function (destDir, callback) {
        if (destDir === '-') {
            this.apply(this.previousDir, callback);
            return;
        }

        this.previousDir = process.cwd();

        try {
            process.chdir(destDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                callback(destDir + ': No such file or directory.');
            } else {
                callback(err);
            }
        }
    };

    module.exports = new Cd();
}(this));