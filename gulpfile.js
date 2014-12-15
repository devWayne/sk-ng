var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // Load all gulp plugins
// automatically and attach
var less = require('gulp-less');

var runSequence = require('run-sequence'); // Temporary solution until gulp 4
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('concat:js', function() {
    return gulp.src([
            'app/app.js',
            'app/deal/dealControllers.js',
            'app/deal/dealDirectives.js',
            'app/deal/dealServices.js',
	    'app/dealist/dealistControllers.js',
	    'app/dealist/dealistDirectives.js',
            'app/dealist/dealistServices.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('uglify:js', function() {
    return gulp.src([
            'app/app.js',
            'app/deal/dealControllers.js',
            'app/deal/dealDirectives.js',
            'app/deal/dealServices.js',
	    'app/dealist/dealistControllers.js',
	    'app/dealist/dealistDirectives.js',
            'app/dealist/dealistServices.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('compile:less', function() {

    var banner = '/*! template */\n\n';

    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(plugins.header(banner))
        .pipe(gulp.dest('dist/css'));

});


gulp.task('copy:deal', function() {
    return gulp.src([
        'app/deal/deal.html',
    ]).pipe(gulp.dest('dist/deal/'));
});

gulp.task('copy:dealist', function() {
    return gulp.src([
        'app/dealist/dealist.html',
    ]).pipe(gulp.dest('dist/dealist/'));
});


gulp.task('copy:css',function(){
    return gulp.src('app/css/**')
    .pipe(gulp.dest('dist/css/'));
})


gulp.task('jshint', function() {
    return gulp.src([
            'gulpfile.js',
            dirs.src + '/javascript/**/*'
        ]).pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function() {
    gulp.watch(['app/less/*'], ['compile:less']);
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------
gulp.task('clean', function(done) {
    require('del')([
        'dist/js/main.js',
    ], done);
});

gulp.task('copy', [
    'copy:deal',
    'copy:dealist',
    'copy:css'
]);

gulp.task('compile', [
    'compile:less',
    'concat:js'
]);


gulp.task('build', function(done) {
    runSequence(
        ['clean'],
        'concat:js',
        'copy',
        done);
});


gulp.task('default', ['build']);
