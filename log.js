/**
 * The logger
 */

(function () {
    'use strict';

    require('colors');

    var Logger = function () {};

    Logger.prototype.warn = function (msg) {
        console.log(msg.yellow);
    };

    Logger.prototype.info = function (msg) {
        console.log(msg);
    };

    Logger.prototype.debug = function (msg) {
        console.log(msg.gray);
    };

    Logger.prototype.error = function (msg) {
        console.log(msg.red);
    };

    Logger.prototype.verbose = function (msg) {
        console.log(msg.green);
    };

    //shortcuts
    Logger.prototype.w = Logger.prototype.warn;
    Logger.prototype.i = Logger.prototype.info;
    Logger.prototype.d = Logger.prototype.debug;
    Logger.prototype.e = Logger.prototype.error;
    Logger.prototype.v = Logger.prototype.verbose;

    module.exports = new Logger();
}(this));