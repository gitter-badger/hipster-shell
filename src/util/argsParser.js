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
        let newArgs = args.map(function(el) {
            if (el.match(/^\$.*/g)) {
                return process.env[el.substring(1)] || '';
            } else {
                return el;
            }
        });
        
        return newArgs.filter(function(el) {
            return el.length > 0;
        });
    }
};