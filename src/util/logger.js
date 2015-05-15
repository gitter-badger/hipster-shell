import 'colors';

const log = function(message, color) {
    if (!message) {
        console.log('undefined' [color]);
    } else if (message.constructor === Array ||
        message.constructor === Object) {
        console.log(JSON.stringify(message)[color]);
    } else {
        console.log(color ? message[color] : message);
    }
};

class Logger {
    warn(message) {
        log(message, 'yellow');
    }

    info(message) {
        log(message);
    }

    debug(message) {
        log(message, 'grey');
    }

    error(message) {
        log(message, 'red');
    }

    verbose(message) {
        log(message, 'green');
    }

    // shortcuts
    w(message) {
        this.warn(message);
    }

    i(message) {
        this.info(message);
    }

    d(message) {
        this.debug(message);
    }

    e(message) {
        this.error(message);
    }

    v(message) {
        this.verbose(message);
    }
}

export default new Logger();