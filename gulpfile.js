var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // Load all gulp plugins
                                              // automatically and attach
var less = require('gulp-less');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');    // Temporary solution until gulp 4
var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});



gulp.task('concat-debug:js', function() {
  return gulp.src(dirs.src +'/javascript/**/*')
    .pipe(concat('index.js'))
    .pipe(gulp.dest(dirs.src+'/js'))
});

gulp.task('concat:js', function() {
  return gulp.src(dirs.src +'/javascript/**/*')
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.src+'/js'))
});



gulp.task('compile:less', function () {

    var banner = '/*! template v' + pkg.version +' */\n\n';

    return gulp.src(dirs.src+'/less/*.less')
               .pipe(less())
               .pipe(plugins.header(banner))
               .pipe(gulp.dest(dirs.src+'/css'));

});


gulp.task('copy:misc', function () {
    return gulp.src([
         dirs.src+'/**/*',
        // Exclude the following files
        // (other tasks will handle the copying of these files)
	'!'+dirs.src+'/javascript/**/*',
	'!'+dirs.src+'/less/*'
    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});


gulp.task('jshint', function () {
    return gulp.src([
        'gulpfile.js',
         dirs.src+'/javascript/**/*'
    ]).pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function () {
    gulp.watch([dirs.src+'/less/*'], ['compile:less']);
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------
gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ], done);
});

gulp.task('copy', [
	'copy:misc'
]);

gulp.task('compile',[
	'compile:less',
	'concat-debug:js',
	'concat:js'
]);

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean'],
	'compile:less',
	'concat:js',
	'concat-debug:js',
        'copy',
    done);
});
gulp.task('watch', function () {
    gulp.watch('javascript/**/*', ['build']);
});



gulp.task('default', ['build']);

