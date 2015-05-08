import process from 'process';

class CD {
    constructor(){
        this.previousDir = process.cdw();
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

export default CD();
