var gulp = require('gulp');
var babel = require('gulp-babel');

var path = require('path');


var paths = {
    src: ['src/**/*.js'],
    build: 'build',
    sourceRoot: path.join(__dirname, 'src')
};

gulp.task('build', function(){
    return gulp.src(paths.src)
        .pipe(babel())
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function(){
    gulp.watch(paths.src, ['build']);
});

gulp.task('default', ['watch']);