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
    }
};