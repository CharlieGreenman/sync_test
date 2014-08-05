var gulp        = require('gulp');
var browserSync = require('browser-sync');
var jade 		= require('gulp-jade');
var reload 		= browserSync.reload;

// Static server
/*
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});
*/

// or...
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://127.0.0.1:8000/"
    });
});

// Jade Task
gulp.task('jade', function() {
  return gulp.src('templates/*.jade')
         .pipe(jade())
         .pipe(gulp.dest('partials'));
});

// Index.html
gulp.task('entrypoint', function() {
	return gulp.src('templates/index.jade')
			   .pipe(jade())
			   .pipe(gulp.dest('./'));
});

// Default task
gulp.task('default', ['browser-sync'], function() {
	gulp.watch('templates/*.jade',['jade', browserSync.reload]);
	gulp.watch('stylesheets/*.css', browserSync.reload);
	gulp.watch('templates/index.jade',['entrypoint', browserSync.reload]);
	gulp.watch('*.html', browserSync.reload);
});