var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var path = require('path');


var paths = {
    src: ['src/**/*.js'],
    build: 'build',
    souceRoot: path.join(__dirname, 'src')
};

gulp.task('build', function(){
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'), {
            //sourceRoot: paths.souceRoot
        })
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function(){
    gulp.watch(paths.src, ['build']);
});

gulp.task('default', ['watch']);