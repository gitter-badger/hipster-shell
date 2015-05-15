var gulp = require('gulp');
var pl = require('gulp-load-plugins')({
    lazy: false
});

var paths = {
    src: ['src/**/*.js'],
    build: 'build'
};

gulp.task('build', function() {
    return gulp.src(paths.src)
        .pipe(pl.babel())
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function() {
    gulp.watch(paths.src, ['build']);
});

gulp.task('serve', ['build'], function() {
    pl.nodemon({
        script: 'index.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        },
        tasks: ['build']
    });
});

gulp.task('default', ['build']);