class CD {
    constructor(){
        this.previousDir = process.cwd();
    }

    apply(destDir, callback){
        if(destDir === '-'){
            this.apply(this.previousDir, callback);
        }

        this.previousDir = process.cwd();

        try {
            process.chdir(destDir);
        } catch(err){
            if(err.code === 'ENOENT'){
                callback(`${destDir} : No such file or directory`);
            } else {
                callback(err);
            }
        }
    }
}

export default new CD();
